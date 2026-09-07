'use strict';
require('dotenv').config();

/* ============================================================
   JanSahay AI — Unified RAG Pipeline Orchestrator
   Single source of truth for all text AND voice queries.

   Flow:
     Language Detection
     → Profile Extraction (session memory)
     → Intent Detection
     → Query Rewriting
     → Hybrid Retrieval (semantic + keyword + metadata filter)
     → Hard Eligibility Filtering (state / age / income)
     → Re-ranking
     → Evidence Validation
     → Context Building (grounded system prompt)
     → ONE Gemini LLM call
     → Grounding Validation
     → Structured Response (language, answer, schemes[], followUpQuestions[], sources[])

   Called by:
     - POST /api/rag/query  (ragController)
     - POST /api/chat       (chatController)
     - POST /api/voice/chat (voiceController)
   ============================================================ */

// ── RAG Services ─────────────────────────────────────────────
const vectorStore = require('./vectorStore');
const { retrieve, hasConfidence } = require('./retriever');
const { rerank } = require('./reranker');
const { buildContext } = require('./contextBuilder');
const { validateGrounding, buildFallbackResponse, generateDeterministicSchemeResponse } = require('./grounding');

// ── Chatbot Services ──────────────────────────────────────────
const { detectIntent } = require('../chatbot/intentDetector');
const { rewriteQuery } = require('../chatbot/queryRewriter');
const {
    extractProfile,
    getMissingEligibilityFields,
    generateClarificationQuestion,
    getOrCreateSession
} = require('../chatbot/profileExtractor');
const {
    generateResponse,
    generateGreeting,
    generateHelpResponse,
    generateFraudWarning,
    detectLanguage,
    containsSensitiveInfo
} = require('../chatbot/responseGenerator');

// ── Eligibility Engine ────────────────────────────────────────
const {
    checkEligibility,
    getSchemeCount,
    ELIGIBILITY_STATUS
} = require('../eligibility/eligibilityEngine');

// ── Configuration ─────────────────────────────────────────────
const TOP_K_RETRIEVAL = parseInt(process.env.TOP_K_RETRIEVAL) || 15;
const TOP_K_CONTEXT   = parseInt(process.env.TOP_K_CONTEXT)   || 5;
const RAG_DEBUG       = process.env.RAG_DEBUG === 'true';

// ── Eligibility Status Mapping ────────────────────────────────
// Map from engine statuses → frontend display statuses
const STATUS_MAP = {
    MATCHED:                'ELIGIBLE',
    POTENTIALLY_ELIGIBLE:   'LIKELY_ELIGIBLE',
    INSUFFICIENT_INFORMATION: 'NEEDS_MORE_INFORMATION',
    NOT_ELIGIBLE:           'NOT_ELIGIBLE',
    // NOT_APPLICABLE means scheme was not found in schemes.json by ID.
    // Display as LIKELY_ELIGIBLE (not UNVERIFIED) since it was retrieved from
    // the verified vector store — it is a real scheme.
    NOT_APPLICABLE:         'LIKELY_ELIGIBLE'
};

/**
 * Ensure the vector index is loaded if available
 */
function ensureVectorIndex() {
    const stats = vectorStore.getStats();
    if (!stats.isLoaded || stats.vectorCount === 0) {
        if (vectorStore.indexExists()) {
            vectorStore.loadIndex();
        }
    }
}

/**
 * Run hard eligibility filter on retrieved results.
 * Returns each result annotated with eligibility_status, matched_criteria,
 * missing_information, and failed_criteria based on deterministic rule checks.
 *
 * CRITICAL: State / age / income violations always → NOT_ELIGIBLE
 * regardless of semantic score.
 */
/**
 * Derive category key from a category string for hard-filter matching.
 * Returns lowercase normalised key, e.g. 'women', 'farmer', 'student', etc.
 */
function normaliseCategoryKey(cat) {
    if (!cat) return null;
    const c = cat.toLowerCase();
    if (c.includes('women') || c.includes('mahila') || c.includes('girl') || c.includes('female')) return 'women';
    if (c.includes('farmer') || c.includes('agriculture') || c.includes('kisan') || c.includes('krishi')) return 'farmer';
    if (c.includes('student') || c.includes('education') || c.includes('scholarship') || c.includes('scholar')) return 'student';
    if (c.includes('health') || c.includes('medical') || c.includes('hospital')) return 'health';
    if (c.includes('business') || c.includes('entrepreneur') || c.includes('msme') || c.includes('startup')) return 'business';
    if (c.includes('senior') || c.includes('old age') || c.includes('pension') || c.includes('elderly')) return 'senior';
    if (c.includes('disabled') || c.includes('divyang') || c.includes('handicap')) return 'disabled';
    if (c.includes('sc') || c.includes('st') || c.includes('dalit') || c.includes('tribal') || c.includes('obc')) return 'sc_st';
    return null;
}

function applyEligibilityFilter(retrievedResults, userProfile) {
    // ── BUG FIX #1: No profile info → LIKELY_ELIGIBLE (not UNVERIFIED)
    // Schemes come from our VERIFIED knowledge base; calling them Unverified is misleading.
    if (!userProfile || Object.values(userProfile).every(v => v === null)) {
        return retrievedResults.map(r => ({
            ...r,
            eligibility_status: 'LIKELY_ELIGIBLE',
            matched_criteria: [],
            missing_information: ['Complete your profile for a precise eligibility check'],
            failed_criteria: []
        }));
    }

    return retrievedResults.map(r => {
        const schemeId = r.metadata?.schemeId;
        if (!schemeId) {
            // Scheme not in local JSON — it's still from verified vector store.
            return { ...r, eligibility_status: 'LIKELY_ELIGIBLE', matched_criteria: [], missing_information: [], failed_criteria: [] };
        }

        try {
            const result = checkEligibility(userProfile, schemeId);
            // STATUS_MAP.NOT_APPLICABLE now maps to LIKELY_ELIGIBLE (see above)
            const mapped = STATUS_MAP[result.status] || 'LIKELY_ELIGIBLE';

            return {
                ...r,
                eligibility_status: mapped,
                matched_criteria:   result.matchedCriteria  || [],
                missing_information: result.missingCriteria || [],
                failed_criteria:    result.failedCriteria   || [],
                eligibility_score:  result.score            || 0
            };
        } catch {
            return { ...r, eligibility_status: 'LIKELY_ELIGIBLE', matched_criteria: [], missing_information: [], failed_criteria: [] };
        }
    });
}

/**
 * BUG FIX #2: Hard-filter retrieved results by the category expressed
 * in the user's query (e.g. if user asks for women schemes, remove
 * farmer/agriculture results that leaked in via semantic similarity).
 *
 * Only applied when the query category is unambiguous AND there are
 * enough category-matching results to be useful (≥ 2). Otherwise the
 * full set is returned so the LLM can pick the best answer.
 */
function applyCategoryFilter(retrievedResults, structuredQuery) {
    const queryCategory = normaliseCategoryKey(
        structuredQuery.category || structuredQuery.intent_category || ''
    );

    // Also infer category from the raw query string
    const rawQuery = (structuredQuery.rewrittenQuery || structuredQuery.query || '').toLowerCase();
    let inferredCategory = queryCategory;
    if (!inferredCategory) {
        if (/\b(women|woman|mahila|girl|female|widow|widows)\b/.test(rawQuery)) inferredCategory = 'women';
        else if (/\b(farmer|farming|kisan|agriculture|krishi|kisaan)\b/.test(rawQuery)) inferredCategory = 'farmer';
        else if (/\b(student|scholarship|education|college|school|study)\b/.test(rawQuery)) inferredCategory = 'student';
        else if (/\b(health|hospital|medical|disease|treatment)\b/.test(rawQuery)) inferredCategory = 'health';
        else if (/\b(senior|old age|elderly|pension|senior citizen)\b/.test(rawQuery)) inferredCategory = 'senior';
        else if (/\b(business|msme|startup|entrepreneur|mudra)\b/.test(rawQuery)) inferredCategory = 'business';
    }

    if (!inferredCategory) return retrievedResults; // no clear category — return as-is

    const matching = retrievedResults.filter(r => {
        const cat = normaliseCategoryKey(r.metadata?.category || '');
        const title = (r.metadata?.title || '').toLowerCase();
        const tags  = Array.isArray(r.metadata?.tags) ? r.metadata.tags.join(' ').toLowerCase() : '';
        const text  = (r.text || '').toLowerCase();

        // Allow if category matches OR title/tags/text mention the category keywords
        if (cat === inferredCategory) return true;
        if (inferredCategory === 'women' &&
            (title.includes('women') || title.includes('mahila') || title.includes('girl') ||
             tags.includes('women') || text.includes('women empowerment'))) return true;
        if (inferredCategory === 'farmer' &&
            (title.includes('kisan') || title.includes('farmer') || title.includes('agriculture') ||
             tags.includes('farmer'))) return true;
        if (inferredCategory === 'student' &&
            (title.includes('scholarship') || title.includes('student') || title.includes('education') ||
             tags.includes('scholarship'))) return true;
        if (inferredCategory === 'health' &&
            (title.includes('health') || title.includes('ayushman') || title.includes('medical') ||
             tags.includes('health'))) return true;
        if (inferredCategory === 'senior' &&
            (title.includes('senior') || title.includes('elderly') || title.includes('pension') ||
             tags.includes('pension'))) return true;
        if (inferredCategory === 'business' &&
            (title.includes('mudra') || title.includes('msme') || title.includes('startup') ||
             tags.includes('business'))) return true;
        return false;
    });

    // Only apply hard filter when enough matching results exist
    return matching.length >= 2 ? matching : retrievedResults;
}

/**
 * Build structured scheme cards for the frontend from re-ranked results.
 */
function buildSchemeCards(rerankedResults) {
    const seen = new Set();
    const cards = [];

    for (const r of rerankedResults) {
        const id = r.metadata?.schemeId || r.metadata?.title;
        if (!id || seen.has(id)) continue;
        seen.add(id);

        cards.push({
            scheme_id:           r.metadata?.schemeId || id,
            scheme_name:         r.metadata?.title    || 'Unknown Scheme',
            category:            r.metadata?.category || '',
            state:               r.metadata?.state    || 'All India',
            ministry:            r.metadata?.ministry || '',
            eligibility_status:  r.eligibility_status || 'UNVERIFIED',
            matched_criteria:    r.matched_criteria   || [],
            missing_information: r.missing_information || [],
            failed_criteria:     r.failed_criteria    || [],
            benefits:            r.metadata?.benefits  || '',
            official_source_url: r.metadata?.applyLink || '',
            verified:            r.metadata?.myschemeVerified !== false,
            relevance_score:     (r.rerankScore || r.score || 0).toFixed(3)
        });
    }

    return cards;
}

/**
 * Generate follow-up questions when mandatory profile fields are missing.
 */
function buildFollowUpQuestions(session, language) {
    const { missingRequired } = getMissingEligibilityFields(session);
    if (!missingRequired || missingRequired.length === 0) return [];

    const q = generateClarificationQuestion(missingRequired, language);
    return q ? [q] : [];
}

/**
 * Build deduplicated source list from re-ranked results.
 */
function buildSources(rerankedResults) {
    const seen = new Set();
    const sources = [];

    for (const r of rerankedResults) {
        if (r.metadata?.applyLink && !seen.has(r.metadata.applyLink)) {
            seen.add(r.metadata.applyLink);
            sources.push({
                scheme: r.metadata?.title || '',
                url:    r.metadata.applyLink,
                verified: r.metadata?.myschemeVerified !== false
            });
        }
    }

    return sources;
}

/**
 * Main RAG pipeline entry point.
 *
 * @param {Object} opts
 * @param {string}  opts.query          - User's raw message
 * @param {string}  [opts.language]     - 'en'|'hi'|'gu'|'auto' (default: 'auto')
 * @param {Object}  [opts.userProfile]  - Supplementary profile override
 * @param {string}  [opts.sessionId]    - Session ID for memory
 * @param {string}  [opts.source]       - 'chat'|'voice'|'rag' (for logging)
 * @returns {Promise<Object>} Structured response
 */
async function runPipeline(opts = {}) {
    const {
        query,
        language: preferredLanguage,
        userProfile: profileOverride,
        sessionId,
        source = 'unknown'
    } = opts;

    const startTime = Date.now();
    const debugInfo = { source };

    if (!query || !query.trim()) {
        throw new Error('query is required and cannot be empty');
    }

    // ══════════════════════════════════════════════════════════
    // STEP 1: Language Detection
    // ══════════════════════════════════════════════════════════
    const lang = (preferredLanguage && preferredLanguage !== 'auto')
        ? preferredLanguage
        : detectLanguage(query);
    debugInfo.language = lang;

    // ══════════════════════════════════════════════════════════
    // STEP 2: Fraud Protection
    // ══════════════════════════════════════════════════════════
    if (containsSensitiveInfo(query)) {
        return {
            success: true,
            language: lang,
            answer: generateFraudWarning(lang),
            intent: 'FRAUD_PROTECTION',
            schemes: [],
            follow_up_questions: [],
            sources: [],
            sessionId,
            elapsed_ms: Date.now() - startTime
        };
    }

    // ══════════════════════════════════════════════════════════
    // STEP 3: Profile Extraction (Session Memory)
    // ══════════════════════════════════════════════════════════
    const { session, newFields } = extractProfile(query, sessionId);

    // Allow caller to inject extra profile fields (e.g. from voice onboarding)
    if (profileOverride) {
        Object.assign(session.profile, profileOverride);
    }

    debugInfo.profileUpdates = newFields;
    debugInfo.profile = { ...session.profile };

    // ══════════════════════════════════════════════════════════
    // STEP 4: Intent Detection
    // ══════════════════════════════════════════════════════════
    const intentResult = detectIntent(query, lang, session);
    const intent = intentResult.intent;
    debugInfo.intent = intentResult;

    // ── Non-RAG intents ──────────────────────────────────────
    if (intent === 'GREETING') {
        return {
            success: true,
            language: lang,
            answer: generateGreeting(lang),
            intent: 'GREETING',
            schemes: [],
            follow_up_questions: [],
            sources: [],
            sessionId: session.id,
            scheme_count: getSchemeCount(),
            elapsed_ms: Date.now() - startTime
        };
    }

    if (intent === 'JANSAHAY_HELP') {
        return {
            success: true,
            language: lang,
            answer: generateHelpResponse(lang),
            intent: 'JANSAHAY_HELP',
            schemes: [],
            follow_up_questions: [],
            sources: [],
            sessionId: session.id,
            elapsed_ms: Date.now() - startTime
        };
    }

    // ══════════════════════════════════════════════════════════
    // STEP 5: Query Rewriting
    // ══════════════════════════════════════════════════════════
    const structuredQuery = rewriteQuery(query, intent, lang, session);
    debugInfo.structuredQuery = structuredQuery;

    // ══════════════════════════════════════════════════════════
    // STEP 6: Hybrid Retrieval
    // ══════════════════════════════════════════════════════════
    ensureVectorIndex();

    let retrievalResults = [];
    try {
        retrievalResults = await retrieve(structuredQuery, TOP_K_RETRIEVAL);
    } catch (err) {
        console.error('[Pipeline] Retrieval error:', err.message);
        // retrieval failed — use empty set, will trigger fallback
    }

    debugInfo.retrievalCount = retrievalResults.length;

    // ══════════════════════════════════════════════════════════
    // STEP 7: Low-confidence / Empty Retrieval Handling
    // ══════════════════════════════════════════════════════════
    if (!hasConfidence(retrievalResults)) {
        const followUp = buildFollowUpQuestions(session, lang);
        const fallbackMsg = followUp.length > 0
            ? followUp.join(' ')
            : buildFallbackResponse(structuredQuery, lang);

        return {
            success: true,
            language: lang,
            answer: fallbackMsg,
            intent,
            schemes: [],
            follow_up_questions: followUp,
            sources: [],
            sessionId: session.id,
            confidence: 0,
            elapsed_ms: Date.now() - startTime,
            ...(RAG_DEBUG ? { debug: debugInfo } : {})
        };
    }

    // ══════════════════════════════════════════════════════════
    // STEP 8a: Category Hard-Filter (BUG FIX #2)
    // Ensures women queries don't return farmer schemes etc.
    // ══════════════════════════════════════════════════════════
    const categoryFiltered = applyCategoryFilter(retrievalResults, structuredQuery);
    debugInfo.categoryFilteredCount = categoryFiltered.length;

    // ══════════════════════════════════════════════════════════
    // STEP 8b: Hard Eligibility Filtering
    // ══════════════════════════════════════════════════════════
    const withEligibility = applyEligibilityFilter(categoryFiltered, session.profile);

    // Sort: NOT_ELIGIBLE last so LLM focuses on eligible/likely schemes first
    const statusOrder = {
        ELIGIBLE: 0, LIKELY_ELIGIBLE: 1, NEEDS_MORE_INFORMATION: 2, UNVERIFIED: 3, NOT_ELIGIBLE: 4
    };
    withEligibility.sort((a, b) =>
        (statusOrder[a.eligibility_status] || 3) - (statusOrder[b.eligibility_status] || 3)
    );

    // ══════════════════════════════════════════════════════════
    // STEP 9: Re-ranking
    // ══════════════════════════════════════════════════════════
    const rerankedResults = rerank(withEligibility, structuredQuery, session.profile, TOP_K_CONTEXT);

    debugInfo.rerankedCount = rerankedResults.length;
    debugInfo.rerankedScores = rerankedResults.map(r => ({
        scheme: r.metadata?.title,
        rerankScore: r.rerankScore?.toFixed(3),
        eligibility: r.eligibility_status
    }));

    // ══════════════════════════════════════════════════════════
    // STEP 10: Context Building (grounded system prompt)
    // BUG FIX #3: For SCHEME_DETAILS intent, only pass the single
    // best-matching scheme into context so the LLM doesn't repeat
    // the full list again.
    // ══════════════════════════════════════════════════════════
    const isDetailIntent = ['SCHEME_DETAILS', 'APPLICATION_PROCESS', 'DOCUMENTS', 'CHECK_ELIGIBILITY'].includes(intent);
    const contextResults = isDetailIntent ? rerankedResults.slice(0, 2) : rerankedResults;

    const { systemPrompt, contextSummary } = buildContext(
        contextResults,
        structuredQuery,
        lang,
        session.profile,
        isDetailIntent  // pass flag so contextBuilder adds anti-repetition instruction
    );
    debugInfo.contextSummary = contextSummary;
    debugInfo.isDetailIntent = isDetailIntent;

    // ══════════════════════════════════════════════════════════
    // STEP 11: ONE LLM Call
    // ══════════════════════════════════════════════════════════
    let llmResponse = null;
    let usedFallback = false;

    try {
        llmResponse = await generateResponse(
            systemPrompt,
            query,
            session.conversationHistory,
            lang
        );
    } catch (err) {
        console.warn('[Pipeline] LLM unavailable, using deterministic fallback:', err.message);
        llmResponse = generateDeterministicSchemeResponse(rerankedResults, lang);
        usedFallback = true;
    }

    // ══════════════════════════════════════════════════════════
    // STEP 12: Grounding Validation
    // ══════════════════════════════════════════════════════════
    const groundingResult = validateGrounding(llmResponse, rerankedResults, structuredQuery);
    debugInfo.grounding = { isGrounded: groundingResult.isGrounded, warnings: groundingResult.warnings };

    const finalAnswer = groundingResult.cleanedResponse;

    // Update conversation history
    session.conversationHistory.push({ role: 'user',      text: query,       timestamp: Date.now() });
    session.conversationHistory.push({ role: 'assistant', text: finalAnswer,  timestamp: Date.now() });
    if (session.conversationHistory.length > 20) {
        session.conversationHistory = session.conversationHistory.slice(-20);
    }

    // ══════════════════════════════════════════════════════════
    // STEP 13: Build Structured Output
    // ══════════════════════════════════════════════════════════
    const schemeCards      = buildSchemeCards(rerankedResults);
    const followUpQuestions = buildFollowUpQuestions(session, lang);
    const sources          = buildSources(rerankedResults);

    const elapsed = Date.now() - startTime;
    debugInfo.elapsedMs = elapsed;

    return {
        success: true,
        language: lang,
        answer: finalAnswer,
        intent,
        schemes: schemeCards,
        follow_up_questions: followUpQuestions,
        sources,
        confidence: rerankedResults.length > 0
            ? parseFloat((rerankedResults[0].rerankScore || 0).toFixed(3))
            : 0,
        grounded: groundingResult.isGrounded,
        used_fallback: usedFallback,
        sessionId: session.id,
        profile: session.profile,
        elapsed_ms: elapsed,
        ...(RAG_DEBUG ? { debug: debugInfo } : {})
    };
}

module.exports = {
    process: runPipeline,
    runPipeline
};
