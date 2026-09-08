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
            console.log('🔄 RAG Service not ready yet, auto-initializing...');
            await this.initialize(process.env.GEMINI_API_KEY || '');
        }

        const startTime = Date.now();
        const topK              = options.topK || 10;
        const includeExplanations = options.includeExplanations !== false;
        // Pre-filtered IDs from the filter controller (deterministic pre-filter before RAG)
        const preFilteredIds    = options.preFilteredIds || null;

        const stats = {
            totalSchemes:    schemes.length,
            afterRuleEngine: 0,
            afterRagRanking: 0,
            processingTimeMs: 0,
            pipelineLayers:  []
        };

        // ═══════════════════════════════════════════════════════
        // LAYER 1: Rule Engine — Hard Eligibility Gates
        // (Skipped / restricted if preFilteredIds were supplied by the filter controller)
        // ═══════════════════════════════════════════════════════
        let filteredSchemes = schemes;
        let ruleEngineResults = null;

        if (preFilteredIds) {
            // Pre-filter already applied by filterService — restrict to those IDs only
            filteredSchemes = schemes.filter(s => preFilteredIds.includes(String(s.id)));
            stats.afterRuleEngine = filteredSchemes.length;
            stats.pipelineLayers.push('deterministic-filter');

            // If pre-filtering produced 0 matches, immediately return clean empty state
            if (filteredSchemes.length === 0) {
                stats.processingTimeMs = Date.now() - startTime;
                return {
                    success: true,
                    pipeline: 'deterministic-filter (0 matches)',
                    recommendations: [],
                    totalMatches: 0,
                    stats: {
                        totalSchemes: schemes.length,
                        afterPreFilter: 0,
                        afterRuleEngine: 0,
                        afterRagRanking: 0,
                        pipelineLayers: stats.pipelineLayers,
                        processingTimeMs: stats.processingTimeMs
                    },
                    summary: 'No government schemes match all your selected filters. Try removing one or more filters.'
                };
            }
        } else if (RuleEngine && typeof RuleEngine.matchSchemes === 'function') {
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

        // Get IDs of schemes that passed pre-filtering / rule engine
        const eligibleIds = filteredSchemes.map(s => String(s.id));

        // ═══════════════════════════════════════════════════════
        // LAYER 2: RAG Retrieval — Semantic + Keyword Ranking
        // ═══════════════════════════════════════════════════════

        // Build a search query from user profile and active filters
        const searchQuery = this._buildSearchQuery(profile, options.filters);

        // Hybrid search within rule-engine-filtered schemes only
        // Scale chunk retrieval: retrieve enough chunks to cover every eligible scheme
        // (at least 5 per scheme up to a sensible cap of 1500), not just topK * 5.
        const chunkRetrievalCount = Math.min(Math.max(eligibleIds.length * 5, topK * 5), 1500);
        const retrievedChunks = embeddingService.hybridSearch(searchQuery, chunkRetrievalCount, {
            schemeIds: eligibleIds,
            state:     preFilteredIds ? undefined : profile.state
        });

        // Deduplicate by schemeId, keeping highest-scoring chunk per scheme
        const schemeScores = new Map();
        for (const chunk of retrievedChunks) {
            const existing = schemeScores.get(chunk.schemeId);
            if (!existing || chunk.combinedScore > existing.combinedScore) {
                schemeScores.set(chunk.schemeId, chunk);
            }
        }

        // Merge RAG scores with rule-engine scores for all eligible schemes
        const rankedSchemes = [];
        for (const scheme of filteredSchemes) {
            const schemeId = String(scheme.id);
            const ragResult = schemeScores.get(schemeId);

            // Get rule engine score if available
            const reMatch = ruleEngineResults
                ? ruleEngineResults.find(s => String(s.id) === schemeId)
                : null;
            const reScore = reMatch ? (reMatch.matchScore || 70) : 70;

            let combinedScore = 70;
            let ragScore = 0;
            if (ragResult) {
                const ragNormalized = Math.min(ragResult.combinedScore * 10, 40);
                combinedScore = Math.round(reScore * 0.6 + ragNormalized + 36);
                ragScore = ragResult.combinedScore;
            } else {
                combinedScore = Math.round(reScore * 0.8 + 15);
            }
            const clampedScore = Math.min(Math.max(combinedScore, 60), 99);

            rankedSchemes.push({
                ...scheme,
                matchScore:   clampedScore,
                matchQuality: clampedScore >= 90 ? 'Excellent Match'
                            : clampedScore >= 80 ? 'Great Match'
                            : clampedScore >= 70 ? 'Good Match'
                            : 'Eligible Match',
                ragScore,
                ruleScore:    reScore
            });
        }

        // Sort by combined score descending
        rankedSchemes.sort((a, b) => b.matchScore - a.matchScore);

        // ═══════════════════════════════════════════════════════
        // When filters are active: return ALL ranked schemes.
        // Without filters: return topK for speed.
        // ═══════════════════════════════════════════════════════
        const returnAll = preFilteredIds !== null;  // Always return all when filters applied
        const displayResults = returnAll ? rankedSchemes : rankedSchemes.slice(0, topK);

        stats.afterRagRanking = displayResults.length;
        stats.pipelineLayers.push('rag-retrieval');

        // ═══════════════════════════════════════════════════════
        // LAYER 3: LLM Reasoning — Evidence-Based Explanations
        // Only applied to the top LLM_EXPLAIN_LIMIT schemes.
        // The rest receive rich template-based reasons from data.
        // ═══════════════════════════════════════════════════════
        const LLM_EXPLAIN_LIMIT = 12;
        let llmResponse = null;

        if (includeExplanations && displayResults.length > 0) {
            // LLM only processes the top-scoring schemes
            const llmCandidates = displayResults.slice(0, LLM_EXPLAIN_LIMIT);
            const llmIds = llmCandidates.map(s => String(s.id));
            const contextChunks = retrievedChunks.filter(c => llmIds.includes(c.schemeId));

            llmResponse = await llmService.generateRecommendations(
                profile,
                contextChunks,
                this.schemesMap,
                options.filters || null
            );
            stats.pipelineLayers.push(llmResponse.source || 'llm-reasoning');
        }

        // ═══════════════════════════════════════════════════════
        // Merge LLM explanations into ALL ranked results.
        // Top LLM_EXPLAIN_LIMIT get AI reasoning; rest get smart
        // template reasons built from their structured data.
        // ═══════════════════════════════════════════════════════
        const finalResults = displayResults.map((scheme, idx) => {
            const llmRec = llmResponse?.recommendations?.find(
                r => String(r.schemeId) === String(scheme.id)
            );

            // Build a rich template reason from structured eligibility data
            const e = scheme.eligibility || {};
            const ageRange   = (e.minAge !== undefined && e.maxAge !== undefined) ? ` ages ${e.minAge}–${e.maxAge}` : '';
            const genderStr  = Array.isArray(e.gender) && !e.gender.includes('transgender') ? ` (${e.gender.join('/')})` : '';
            const incomeStr  = Array.isArray(e.income) && e.income.length < 6 ? ` with income ${e.income.join(' or ')}` : '';
            const schemeScope = scheme.type === 'state' ? (scheme.state || 'state') : 'central government';
            const templateReason = scheme.eligibility_summary
                ? `${schemeScope.charAt(0).toUpperCase() + schemeScope.slice(1)} scheme — ${scheme.eligibility_summary}`
                : `${schemeScope.charAt(0).toUpperCase() + schemeScope.slice(1)} scheme for${ageRange}${genderStr} beneficiaries${incomeStr}. Matches your active filter criteria.`;

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
                // AI-enhanced for top 12, template-based for the rest
                matchReason:         llmRec?.matchReason || templateReason,
                keyBenefits:         (llmRec?.keyBenefits && llmRec.keyBenefits.length > 0) ? llmRec.keyBenefits : fallbackBenefits,
                eligibilityNotes:    llmRec?.eligibilityNotes || scheme.eligibility_summary || 'Eligible based on filter criteria.',
                evidenceSections:    llmRec?.evidenceSections || ['overview', 'eligibility'],
                aiEnhanced:          !!llmRec
            };
        });

        // AI-enhanced items bubble to top within their score tier
        finalResults.sort((a, b) => {
            const scoreDiff = b.matchScore - a.matchScore;
            if (Math.abs(scoreDiff) > 5) return scoreDiff;  // meaningful score gap takes priority
            if (a.aiEnhanced && !b.aiEnhanced) return -1;
            if (!a.aiEnhanced && b.aiEnhanced) return 1;
            return scoreDiff;
        });

        stats.processingTimeMs = Date.now() - startTime;

        const formattedPipeline = stats.pipelineLayers.map(l => {
            if (l === 'deterministic-filter' || l === 'rule-engine') return 'rule-engine';
            if (l === 'rag-retrieval') return 'rag-retrieval';
            if (l === 'gemini-llm' || l === 'llm-reasoning') return 'gemini-llm';
            return l;
        }).join(' → ');

        const occ = profile.occupation ? `${profile.occupation} ` : '';
        const res = profile.area || profile.residence || 'resident';
        const st = profile.state || 'India';
        const defaultSummary = `Out of ${finalResults.length} analyzed schemes, ${Math.min(finalResults.length, 3)} strongly align with your profile as a ${occ}${res} in ${st}.`;

        return {
            success: true,
            pipeline: formattedPipeline || 'rule-engine → rag-retrieval → gemini-llm',
            stats,
            recommendations: finalResults,
            summary:        llmResponse?.summary || defaultSummary,
            disclaimer:     llmResponse?.disclaimer || 'Verify eligibility at official portals or myScheme.gov.in.',
            profile
        };
    }

    /* ── Chat Query (Natural Language) ────────────────────── */
    async chatQuery(message, profile = null) {
        if (!this.isReady) {
            console.log('🔄 RAG Service not ready yet, auto-initializing...');
            await this.initialize(process.env.GEMINI_API_KEY || '');
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

    /* ── Build search query from profile and active filters ─ */
    _buildSearchQuery(profile = {}, filters = null) {
        const parts = [];
        profile = profile || {};

        // Occupation-based keywords
        const occupation = profile.occupation || filters?.occupation;
        const occupationKeywords = {
            'student':           'scholarship education stipend fellowship tuition fee',
            'farmer':            'kisan agriculture farming crop subsidy soil fertilizer irrigation',
            'self-employed':     'mudra startup business enterprise loan entrepreneur MSME',
            'salaried':          'employee EPF ESI provident fund pension gratuity',
            'unemployed':        'employment skill training placement job MGNREGA',
            'homemaker':         'women empowerment self-help group mahila welfare',
            'retired':           'pension senior citizen old age vridha retirement',
            'daily-wage':        'labour worker unorganized sector construction BOCW',
            'daily-wage-worker': 'labour worker unorganized sector construction BOCW'
        };
        if (occupation && occupationKeywords[occupation]) {
            parts.push(occupationKeywords[occupation]);
        }

        // Marital/widow-specific
        if (profile.maritalStatus === 'widowed') {
            parts.push('widow pension destitute women financial assistance bereaved');
        }

        // Gender-specific
        const gender = profile.gender || filters?.gender;
        if (gender === 'female') {
            parts.push('women girl mahila sukanya beti bachao');
        }

        // Disability-specific
        if (profile.disability === 'yes') {
            parts.push('disability divyangjan handicapped ADIP assistive device');
        }

        // Category-specific
        const category = profile.category || (Array.isArray(filters?.category) ? filters.category[0] : filters?.category);
        if (category) {
            const catMap = {
                'sc': 'scheduled caste SC dalit reservation post-matric',
                'st': 'scheduled tribe ST tribal adivasi eklavya',
                'obc': 'OBC other backward classes creamy layer',
                'ews': 'EWS economically weaker section low income BPL'
            };
            if (catMap[String(category).toLowerCase()]) parts.push(catMap[String(category).toLowerCase()]);
        }

        // Income-specific
        const income = profile.income || filters?.income;
        if (income) {
            if (['below-1l', '1l-2.5l', 'below-3l'].includes(income)) {
                parts.push('BPL below poverty line low income subsidy free ration');
            } else if (['2.5l-5l', '5l-8l'].includes(income)) {
                parts.push('middle income affordable housing loan interest subsidy');
            }
        }

        // State-specific
        const state = profile.state || filters?.state;
        if (state && state.toLowerCase() !== 'all india') {
            parts.push(state);
        }

        // Scheme Category from filter
        if (filters?.schemeCategory) {
            parts.push(filters.schemeCategory);
        }

        // Age-specific
        const age = parseInt(profile.age || filters?.age || filters?.ageMin);
        if (age) {
            if (age < 25) parts.push('youth young student skill development');
            else if (age >= 60) parts.push('senior citizen elderly old age pension vridha');
        }

        // Minority
        if (profile.minority === 'yes') {
            parts.push('minority community scholarship educational');
        }

        // Fallback default keywords if no specific profile/filter tokens
        if (parts.length === 0) {
            parts.push('government welfare benefits scheme subsidy financial assistance eligibility');
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
