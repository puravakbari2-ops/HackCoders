/* ============================================================
   RAG Service: Re-ranker
   Weighted multi-factor scoring to re-rank retrieval candidates
   ============================================================ */

/**
 * Re-ranking weights
 */
const WEIGHTS = {
    semanticScore: 0.35,     // Original vector similarity
    schemeNameBoost: 0.20,   // Exact scheme name match
    stateMatch: 0.10,        // State alignment with user profile
    categoryMatch: 0.10,     // Category alignment with query
    occupationMatch: 0.08,   // Occupation alignment
    sectionRelevance: 0.07,  // Section type alignment with intent
    sourceBoost: 0.05,       // Verified source bonus
    recency: 0.05            // Verification recency bonus
};

/**
 * Intent-to-section mapping
 */
const INTENT_SECTION_MAP = {
    SCHEME_DETAILS: ['overview', 'benefits'],
    CHECK_ELIGIBILITY: ['eligibility'],
    DOCUMENTS: ['documents'],
    APPLICATION_PROCESS: ['application'],
    BENEFIT_SEARCH: ['benefits'],
    FIND_SCHEMES: ['overview', 'eligibility'],
    CATEGORY_SEARCH: ['overview'],
    STATE_SEARCH: ['overview'],
    COMPARE_SCHEMES: ['overview', 'benefits', 'eligibility']
};

/**
 * Re-rank retrieval candidates
 * @param {Object[]} candidates - Results from retriever
 * @param {Object} query - Structured query with intent, filters, etc.
 * @param {Object} [userProfile] - User profile for personalization
 * @param {number} [topK] - Number of results to return
 * @returns {Object[]} - Re-ranked results
 */
function rerank(candidates, query, userProfile = null, topK = 5) {
    if (!candidates || candidates.length === 0) return [];

    const scoredCandidates = candidates.map(candidate => {
        let totalScore = 0;
        const factors = {};

        // ── 1. Semantic Score ────────────────────────────────────
        const semScore = Math.max(0, Math.min(1, candidate.score || 0));
        factors.semantic = semScore;
        totalScore += semScore * WEIGHTS.semanticScore;

        // ── 2. Scheme Name Boost ────────────────────────────────
        if (query.schemeName) {
            const title = (candidate.metadata?.title || '').toLowerCase();
            const queryName = query.schemeName.toLowerCase();
            const normalizedTitle = title.replace(/[-\s()]/g, '');
            const normalizedQuery = queryName.replace(/[-\s()]/g, '');

            let nameScore = 0;
            if (normalizedTitle.includes(normalizedQuery) || normalizedQuery.includes(normalizedTitle)) {
                nameScore = 1.0;
            } else if (title.includes(queryName.split(' ')[0])) {
                nameScore = 0.5;
            }

            factors.nameMatch = nameScore;
            totalScore += nameScore * WEIGHTS.schemeNameBoost;
        }

        // ── 3. State Match ──────────────────────────────────────
        if (query.filters?.state || userProfile?.state) {
            const targetState = (query.filters?.state || userProfile?.state || '').toLowerCase();
            const schemeState = (candidate.metadata?.state || '').toLowerCase();

            let stateScore = 0;
            if (schemeState === 'all india' || schemeState === '') {
                stateScore = 0.7;  // Central schemes partially match any state
            } else if (schemeState === targetState) {
                stateScore = 1.0;
            }

            factors.stateMatch = stateScore;
            totalScore += stateScore * WEIGHTS.stateMatch;
        } else {
            totalScore += 0.5 * WEIGHTS.stateMatch; // Neutral if no state info
        }

        // ── 4. Category Match ───────────────────────────────────
        if (query.filters?.category) {
            const schemeCat = (candidate.metadata?.category || '').toLowerCase();
            const queryCat = query.filters.category.toLowerCase();

            let catScore = 0;
            if (schemeCat.includes(queryCat) || queryCat.includes(schemeCat)) {
                catScore = 1.0;
            } else {
                // Partial match on keywords
                const catWords = queryCat.split(/[\s,&]+/);
                const matched = catWords.filter(w => schemeCat.includes(w));
                catScore = matched.length / catWords.length;
            }

            factors.categoryMatch = catScore;
            totalScore += catScore * WEIGHTS.categoryMatch;
        } else {
            totalScore += 0.5 * WEIGHTS.categoryMatch;
        }

        // ── 5. Occupation Match ─────────────────────────────────
        if (userProfile?.occupation) {
            const tags = (candidate.metadata?.tags || []).map(t => t.toLowerCase());
            const title = (candidate.metadata?.title || '').toLowerCase();
            const occ = userProfile.occupation.toLowerCase();

            let occScore = 0;
            if (tags.some(t => t.includes(occ)) || title.includes(occ)) {
                occScore = 1.0;
            }

            factors.occupationMatch = occScore;
            totalScore += occScore * WEIGHTS.occupationMatch;
        } else {
            totalScore += 0.5 * WEIGHTS.occupationMatch;
        }

        // ── 6. Section Relevance ────────────────────────────────
        if (query.intent) {
            const relevantSections = INTENT_SECTION_MAP[query.intent] || ['overview'];
            const candidateSection = candidate.section || 'overview';

            const sectionScore = relevantSections.includes(candidateSection) ? 1.0 : 0.3;
            factors.sectionRelevance = sectionScore;
            totalScore += sectionScore * WEIGHTS.sectionRelevance;
        } else {
            totalScore += 0.5 * WEIGHTS.sectionRelevance;
        }

        // ── 7. Source Verification Boost ────────────────────────
        const verified = candidate.metadata?.myschemeVerified || false;
        factors.verified = verified ? 1.0 : 0.5;
        totalScore += factors.verified * WEIGHTS.sourceBoost;

        // ── 8. Recency ──────────────────────────────────────────
        // All schemes treated equally for now (no lastVerified dates in current data)
        totalScore += 0.5 * WEIGHTS.recency;

        return {
            ...candidate,
            rerankScore: totalScore,
            rerankFactors: factors
        };
    });

    // Sort by re-rank score (descending)
    scoredCandidates.sort((a, b) => b.rerankScore - a.rerankScore);

    // Deduplicate by scheme ID (keep highest-scoring chunk per scheme for broad or multiple-scheme queries)
    const shouldDeduplicate = query.intent === 'FIND_SCHEMES' ||
        query.intent === 'CATEGORY_SEARCH' ||
        query.intent === 'STATE_SEARCH' ||
        query.multipleResults ||
        !query.schemeName;

    if (shouldDeduplicate) {
        const seenSchemes = new Set();
        const deduplicated = [];

        for (const c of scoredCandidates) {
            const schemeId = c.metadata?.schemeId || c.metadata?.title;
            if (!schemeId || !seenSchemes.has(schemeId)) {
                seenSchemes.add(schemeId);
                deduplicated.push(c);
            }
            if (deduplicated.length >= topK) break;
        }

        return deduplicated;
    }

    return scoredCandidates.slice(0, topK);
}

module.exports = { rerank };
