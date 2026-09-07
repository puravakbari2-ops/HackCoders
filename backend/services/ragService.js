/* ============================================================
   JanSahay AI — RAG Service (Pipeline Orchestrator)
   3-Layer Pipeline: Rule Engine → RAG Retrieval → LLM Reasoning
   ============================================================ */

const path             = require('path');
const embeddingService = require('./embeddingService');
const llmService       = require('./llmService');

// Load schemes and rule engine
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

let RuleEngine;
try {
    const ruleEngineModule = require(path.join(__dirname, '..', '..', 'rule-engine.js'));
    RuleEngine = ruleEngineModule.RuleEngine || ruleEngineModule;
} catch (e) {
    console.warn('RAG Service: RuleEngine not found, will skip Layer 1:', e.message);
}

class RAGService {
    constructor() {
        this.schemesMap  = {};     // id → scheme object for quick lookup
        this.isReady     = false;
        this.initTime    = null;
    }

    /* ── Initialize the RAG Pipeline ─────────────────────── */
    async initialize(geminiApiKey) {
        const startTime = Date.now();
        console.log('\n🧠 Initializing RAG Pipeline...');

        // 1. Build scheme lookup map
        for (const scheme of schemes) {
            this.schemesMap[String(scheme.id)] = scheme;
        }
        console.log(`   📚 Loaded ${schemes.length} schemes into lookup map`);

        // 2. Build embedding index
        const chunkCount = embeddingService.buildIndex(schemes);
        console.log(`   ✅ Embedding index ready (${chunkCount} chunks)`);

        // 3. Initialize LLM service
        llmService.initialize(geminiApiKey || '');

        this.isReady  = true;
        this.initTime = Date.now() - startTime;
        console.log(`   🚀 RAG Pipeline ready in ${this.initTime}ms\n`);
    }

    /* ── Main Query: Profile-based Scheme Recommendation ─── */
    async query(profile, options = {}) {
        if (!this.isReady) {
            throw new Error('RAG Service not initialized. Call initialize() first.');
        }

        const startTime = Date.now();
        const topK              = options.topK || 10;
        const includeExplanations = options.includeExplanations !== false;

        const stats = {
            totalSchemes:    schemes.length,
            afterRuleEngine: 0,
            afterRagRanking: 0,
            processingTimeMs: 0,
            pipelineLayers:  []
        };

        // ═══════════════════════════════════════════════════════
        // LAYER 1: Rule Engine — Hard Eligibility Gates
        // ═══════════════════════════════════════════════════════
        let filteredSchemes = schemes;
        let ruleEngineResults = null;

        if (RuleEngine && typeof RuleEngine.matchSchemes === 'function') {
            ruleEngineResults = RuleEngine.matchSchemes(profile, schemes, {
                minScore: 65,
                maxResults: null
            });
            filteredSchemes = ruleEngineResults;
            stats.afterRuleEngine = filteredSchemes.length;
            stats.pipelineLayers.push('rule-engine');
        } else {
            stats.afterRuleEngine = schemes.length;
            stats.pipelineLayers.push('rule-engine-skipped');
        }

        // Get IDs of schemes that passed rule engine
        const eligibleIds = filteredSchemes.map(s => String(s.id));

        // ═══════════════════════════════════════════════════════
        // LAYER 2: RAG Retrieval — Semantic + Keyword Ranking
        // ═══════════════════════════════════════════════════════

        // Build a search query from user profile
        const searchQuery = this._buildSearchQuery(profile);

        // Hybrid search within rule-engine-filtered schemes only
        const retrievedChunks = embeddingService.hybridSearch(searchQuery, topK * 5, {
            schemeIds: eligibleIds,
            state:     profile.state
        });

        // Deduplicate by schemeId, keeping highest-scoring chunk per scheme
        const schemeScores = new Map();
        for (const chunk of retrievedChunks) {
            const existing = schemeScores.get(chunk.schemeId);
            if (!existing || chunk.combinedScore > existing.combinedScore) {
                schemeScores.set(chunk.schemeId, chunk);
            }
        }

        // Merge RAG scores with rule-engine scores
        const rankedSchemes = [];
        for (const [schemeId, ragResult] of schemeScores) {
            const scheme = this.schemesMap[schemeId];
            if (!scheme) continue;

            // Get rule engine score if available
            const reMatch = ruleEngineResults
                ? ruleEngineResults.find(s => String(s.id) === schemeId)
                : null;
            const reScore = reMatch ? (reMatch.matchScore || 70) : 70;

            // Combine: 60% rule-engine score + 40% RAG retrieval score
            const ragNormalized = Math.min(ragResult.combinedScore * 10, 40);
            const combinedScore = Math.round(reScore * 0.6 + ragNormalized + 36); // shift up
            const clampedScore  = Math.min(Math.max(combinedScore, 60), 99);

            rankedSchemes.push({
                ...scheme,
                matchScore:   clampedScore,
                matchQuality: clampedScore >= 90 ? 'Excellent Match'
                            : clampedScore >= 80 ? 'Great Match'
                            : clampedScore >= 70 ? 'Good Match'
                            : 'Eligible Match',
                ragScore:     ragResult.combinedScore,
                ruleScore:    reScore
            });
        }

        // Sort by combined score descending
        rankedSchemes.sort((a, b) => b.matchScore - a.matchScore);
        const topResults = rankedSchemes.slice(0, topK);

        stats.afterRagRanking = topResults.length;
        stats.pipelineLayers.push('rag-retrieval');

        // ═══════════════════════════════════════════════════════
        // LAYER 3: LLM Reasoning — Evidence-Based Explanations
        // ═══════════════════════════════════════════════════════
        let llmResponse = null;

        if (includeExplanations && topResults.length > 0) {
            // Get relevant chunks for top results only
            const topIds = topResults.map(s => String(s.id));
            const contextChunks = retrievedChunks.filter(c => topIds.includes(c.schemeId));

            llmResponse = await llmService.generateRecommendations(
                profile,
                contextChunks,
                this.schemesMap
            );
            stats.pipelineLayers.push(llmResponse.source || 'llm-reasoning');
        }

        // ═══════════════════════════════════════════════════════
        // Merge LLM explanations into ranked results
        // ═══════════════════════════════════════════════════════
        const finalResults = topResults.map(scheme => {
            const llmRec = llmResponse?.recommendations?.find(
                r => String(r.schemeId) === String(scheme.id)
            );

            const fallbackReason = scheme.eligibility_summary
                ? `Qualifies under ${scheme.type === 'state' ? (scheme.state || 'state') : 'central'} eligibility criteria. ${scheme.eligibility_summary}`
                : `Applicable scheme for your demographic and category profile (${scheme.category}).`;

            const fallbackBenefits = scheme.benefits ? [scheme.benefits] : [];

            const finalScore = llmRec?.relevanceScore ? Number(llmRec.relevanceScore) : scheme.matchScore;

            return {
                id:                  scheme.id,
                title:               scheme.title,
                ministry:            scheme.ministry,
                type:                scheme.type,
                category:            scheme.category,
                state:               scheme.state,
                tags:                scheme.tags,
                benefits:            scheme.benefits,
                benefits_detailed:   scheme.benefits_detailed,
                eligibility_detailed: scheme.eligibility_detailed,
                eligibility_summary: scheme.eligibility_summary,
                documents:           scheme.documents,
                applyLink:           scheme.applyLink,
                matchScore:          finalScore,
                matchQuality:        finalScore >= 90 ? 'Excellent Match'
                                    : finalScore >= 80 ? 'Great Match'
                                    : finalScore >= 70 ? 'Good Match'
                                    : 'Eligible Match',
                // AI-enhanced fields
                matchReason:         llmRec?.matchReason || fallbackReason,
                keyBenefits:         (llmRec?.keyBenefits && llmRec.keyBenefits.length > 0) ? llmRec.keyBenefits : fallbackBenefits,
                eligibilityNotes:    llmRec?.eligibilityNotes || scheme.eligibility_summary || 'Eligible based on criteria verification.',
                evidenceSections:    llmRec?.evidenceSections || ['overview', 'eligibility'],
                aiEnhanced:          !!llmRec
            };
        });

        // Prioritize AI-enhanced items first, then sort by matchScore descending
        finalResults.sort((a, b) => {
            if (a.aiEnhanced && !b.aiEnhanced) return -1;
            if (!a.aiEnhanced && b.aiEnhanced) return 1;
            return b.matchScore - a.matchScore;
        });

        stats.processingTimeMs = Date.now() - startTime;

        return {
            success: true,
            pipeline: stats.pipelineLayers.join(' → '),
            stats,
            recommendations: finalResults,
            summary:        llmResponse?.summary || `Found ${finalResults.length} relevant schemes for your profile.`,
            disclaimer:     llmResponse?.disclaimer || 'Verify eligibility at official portals or myScheme.gov.in.',
            profile
        };
    }

    /* ── Chat Query (Natural Language) ────────────────────── */
    async chatQuery(message, profile = null) {
        if (!this.isReady) {
            throw new Error('RAG Service not initialized.');
        }

        // Retrieve relevant chunks using the message as search query
        const searchQuery = profile
            ? `${message} ${this._buildSearchQuery(profile)}`
            : message;

        const retrievedChunks = embeddingService.hybridSearch(searchQuery, 30);

        // Get LLM response
        const response = await llmService.chatQuery(
            message,
            profile,
            retrievedChunks,
            this.schemesMap
        );

        return response;
    }

    /* ── Build search query from profile ─────────────────── */
    _buildSearchQuery(profile) {
        const parts = [];

        // Occupation-based keywords
        const occupationKeywords = {
            'student':       'scholarship education stipend fellowship tuition fee',
            'farmer':        'kisan agriculture farming crop subsidy soil fertilizer irrigation',
            'self-employed': 'mudra startup business enterprise loan entrepreneur MSME',
            'salaried':      'employee EPF ESI provident fund pension gratuity',
            'unemployed':    'employment skill training placement job MGNREGA',
            'homemaker':     'women empowerment self-help group mahila welfare',
            'retired':       'pension senior citizen old age vridha retirement',
            'daily-wage':    'labour worker unorganized sector construction BOCW'
        };
        if (profile.occupation && occupationKeywords[profile.occupation]) {
            parts.push(occupationKeywords[profile.occupation]);
        }

        // Marital/widow-specific
        if (profile.maritalStatus === 'widowed') {
            parts.push('widow pension destitute women financial assistance bereaved');
        }

        // Gender-specific
        if (profile.gender === 'female') {
            parts.push('women girl mahila sukanya beti bachao');
        }

        // Disability-specific
        if (profile.disability === 'yes') {
            parts.push('disability divyangjan handicapped ADIP assistive device');
        }

        // Category-specific
        if (profile.category) {
            const catMap = {
                'sc': 'scheduled caste SC dalit reservation post-matric',
                'st': 'scheduled tribe ST tribal adivasi eklavya',
                'obc': 'OBC other backward classes creamy layer',
                'ews': 'EWS economically weaker section low income BPL'
            };
            if (catMap[profile.category]) parts.push(catMap[profile.category]);
        }

        // Income-specific
        if (profile.income) {
            if (['below-1l', '1l-2.5l'].includes(profile.income)) {
                parts.push('BPL below poverty line low income subsidy free ration');
            } else if (['2.5l-5l', '5l-8l'].includes(profile.income)) {
                parts.push('middle income affordable housing loan interest subsidy');
            }
        }

        // State-specific
        if (profile.state) {
            parts.push(profile.state);
        }

        // Age-specific
        const age = parseInt(profile.age);
        if (age) {
            if (age < 25) parts.push('youth young student skill development');
            else if (age >= 60) parts.push('senior citizen elderly old age pension vridha');
        }

        // Minority
        if (profile.minority === 'yes') {
            parts.push('minority community scholarship educational');
        }

        return parts.join(' ');
    }

    /* ── Health / Status ──────────────────────────────────── */
    getStatus() {
        return {
            ragReady:   this.isReady,
            initTimeMs: this.initTime,
            embedding:  embeddingService.getStats(),
            llm:        llmService.getStatus(),
            schemes:    {
                total:    schemes.length,
                enriched: schemes.filter(s => s.details).length
            }
        };
    }
}

module.exports = new RAGService();
