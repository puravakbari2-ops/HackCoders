/* ============================================================
   RAG Service: Retriever
   Hybrid retrieval: Semantic (vector) + Keyword (BM25-style)
   + Exact Name Matching + Canonical Metadata Filtering
   Diversity-Aware: groups chunks by schemeId to guarantee
   diverse candidates across the entire knowledge base
   ============================================================ */

const vectorStore = require('./vectorStore');
const { embedQuery } = require('./embeddings');
const {
    normalizeCategory,
    normalizeOccupation,
    normalizeState,
    CANONICAL_STATES,
    CANONICAL_CATEGORIES,
    CANONICAL_OCCUPATIONS,
    containsAlias
} = require('./normalization');

const TOP_K_RETRIEVAL = parseInt(process.env.TOP_K_RETRIEVAL) || 20;
const SIMILARITY_THRESHOLD = parseFloat(process.env.SIMILARITY_THRESHOLD) || 0.30;

let cachedSchemes = null;

/**
 * Load schemes.json for direct fallback search
 */
function getSchemesData() {
    if (!cachedSchemes) {
        try {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(__dirname, '..', '..', 'data', 'schemes.json');
            if (fs.existsSync(filePath)) {
                cachedSchemes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }
        } catch (e) {
            cachedSchemes = [];
        }
    }
    return cachedSchemes || [];
}

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Compute keyword match score
 */
function keywordScore(text, keywords) {
    if (!text || !keywords || keywords.length === 0) return 0;

    const lowerText = text.toLowerCase();
    let matches = 0;

    for (const kw of keywords) {
        const lowerKw = kw.toLowerCase();
        if (lowerText.includes(lowerKw)) {
            matches += 1.0;
            const regex = new RegExp(`(^|[^a-zA-Z0-9])${escapeRegex(lowerKw)}([^a-zA-Z0-9]|$)`, 'i');
            if (regex.test(text)) {
                matches += 0.5;
            }
        }
    }

    return Math.min(1.0, matches / keywords.length);
}

/**
 * Check if text contains an exact scheme name match
 */
function schemeNameMatch(title, queryName) {
    if (!title || !queryName) return 0;
    const lowerTitle = title.toLowerCase();
    const lowerQuery = queryName.toLowerCase();

    // Exact title match
    if (lowerTitle.includes(lowerQuery)) return 1.0;

    // Normalizing hyphens and spaces (e.g., "PM-KISAN" vs "PM KISAN" vs "pmkisan")
    const cleanTitle = lowerTitle.replace(/[-\s_()]/g, '');
    const cleanQuery = lowerQuery.replace(/[-\s_()]/g, '');
    if (cleanTitle.includes(cleanQuery)) return 0.95;

    // Acronyms or key tokens
    const tokens = lowerQuery.split(/[\s-]+/).filter(t => t.length > 2);
    if (tokens.length > 0 && tokens.every(t => lowerTitle.includes(t))) {
        return 0.85;
    }

    return 0;
}

/**
 * Canonical filter check
 */
function passesFilters(meta, filters) {
    if (!filters) return true;

    // 1. State filtering
    if (filters.canonicalState || filters.state) {
        const reqState = filters.canonicalState || normalizeState(filters.state)?.canonical;
        if (reqState && reqState !== CANONICAL_STATES.ALL_INDIA) {
            const schemeStateNorm = normalizeState(meta.state);
            // Allow if scheme is All India or matches requested state
            if (schemeStateNorm && schemeStateNorm.canonical !== CANONICAL_STATES.ALL_INDIA && schemeStateNorm.canonical !== reqState) {
                return false;
            }
        }
    }

    // 2. Category filtering
    if (filters.canonicalCategory || filters.category) {
        const reqCat = filters.canonicalCategory || normalizeCategory(filters.category);
        const schemeCatNorm = normalizeCategory(meta.category);

        if (reqCat && schemeCatNorm) {
            // Strict exclusion only if scheme category is definitely different and neither tags nor title match
            if (schemeCatNorm !== reqCat) {
                const combined = `${meta.title || ''} ${(meta.tags || []).join(' ')}`.toLowerCase();
                // Check if title or tags match any alias of requested category
                const catAliases = getCategoryAliases(reqCat);
                const hasAliasMatch = catAliases.some(a => containsAlias(combined, a));
                if (!hasAliasMatch) {
                    return false;
                }
            }
        }
    }

    // 3. Occupation filtering
    if (filters.canonicalOccupation || filters.occupation) {
        const reqOcc = filters.canonicalOccupation || normalizeOccupation(filters.occupation);
        if (reqOcc) {
            const schemeCatNorm = normalizeCategory(meta.category);
            // Hard exclusions: if asking for Farmer schemes, exclude obvious non-farmer schemes
            if (reqOcc === CANONICAL_OCCUPATIONS.FARMER) {
                if (schemeCatNorm && !['AGRICULTURE', 'RURAL_DEVELOPMENT', 'UTILITY_SANITATION', 'FINANCE'].includes(schemeCatNorm)) {
                    const combined = `${meta.title || ''} ${(meta.tags || []).join(' ')}`.toLowerCase();
                    if (!containsAlias(combined, 'farmer') && !containsAlias(combined, 'kisan') && !containsAlias(combined, 'khedut')) {
                        return false;
                    }
                }
            }
            if (reqOcc === CANONICAL_OCCUPATIONS.STUDENT) {
                if (schemeCatNorm && !['EDUCATION', 'SCIENCE_IT', 'SKILLS_EMPLOYMENT'].includes(schemeCatNorm)) {
                    const combined = `${meta.title || ''} ${(meta.tags || []).join(' ')}`.toLowerCase();
                    if (!containsAlias(combined, 'student') && !containsAlias(combined, 'scholarship') && !containsAlias(combined, 'vidhyarthi')) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function getCategoryAliases(canonicalCategory) {
    const { CATEGORY_MAP } = require('./normalization');
    const found = CATEGORY_MAP ? CATEGORY_MAP.find(c => c.canonical === canonicalCategory) : null;
    return found ? found.aliases : [];
}

/**
 * Get metadata at a specific vector index
 */
function getMetaAtIndex(index) {
    const meta = vectorStore.getMetaByIndex(index);
    if (meta) return meta;
    return {};
}

/**
 * Perform hybrid retrieval with diversity grouping
 * @param {Object} query - Structured query
 * @param {number} topK - Number of candidates to return
 * @returns {Promise<Object[]>}
 */
async function retrieve(query, topK = TOP_K_RETRIEVAL) {
    const allStats = vectorStore.getStats();
    const isVectorLoaded = allStats.isLoaded && allStats.vectorCount > 0;

    // ── 1. Semantic (Vector) Search ────────────────────────────
    let semanticResults = [];
    if (isVectorLoaded) {
        try {
            const queryEmbedding = await embedQuery(query.text);
            semanticResults = vectorStore.search(queryEmbedding, topK * 3, query.filters || null);
        } catch (err) {
            console.error(`[Retriever] Semantic search error: ${err.message}`);
        }
    }

    // ── 2. Scheme & Chunk Scoring Across Knowledge Base ─────────
    // Map schemeId -> array of chunks / best score
    const schemeCandidates = new Map();

    const addOrUpdateCandidate = (schemeId, item) => {
        if (!schemeCandidates.has(schemeId)) {
            schemeCandidates.set(schemeId, {
                schemeId,
                title: item.metadata?.title || item.title,
                bestScore: item.score || 0,
                bestChunk: item,
                chunks: [item]
            });
        } else {
            const existing = schemeCandidates.get(schemeId);
            existing.chunks.push(item);
            if ((item.score || 0) > existing.bestScore) {
                existing.bestScore = item.score;
                existing.bestChunk = item;
            }
        }
    };

    // Integrate Semantic Results
    for (const sem of semanticResults) {
        const schemeId = sem.metadata?.schemeId || sem.metadata?.title;
        if (!schemeId) continue;
        if (query.filters && !passesFilters(sem.metadata, query.filters)) continue;

        addOrUpdateCandidate(schemeId, {
            score: sem.score,
            text: sem.metadata?.text || sem.text || '',
            metadata: sem.metadata,
            section: sem.metadata?.section || 'overview',
            source: 'semantic',
            confidence: sem.score >= SIMILARITY_THRESHOLD ? 'medium' : 'low'
        });
    }

    // Keyword & Rule Search (across vectorStore metadata or schemes.json fallback)
    const schemes = getSchemesData();
    const reqCat = query.filters?.canonicalCategory || (query.filters?.category ? normalizeCategory(query.filters.category) : null);
    const reqOcc = query.filters?.canonicalOccupation || (query.filters?.occupation ? normalizeOccupation(query.filters.occupation) : null);
    const reqState = query.filters?.canonicalState || (query.filters?.state ? normalizeState(query.filters.state)?.canonical : null);

    for (let i = 0; i < schemes.length; i++) {
        const s = schemes[i];
        const schemeId = s.id ? String(s.id) : String(i);

        const meta = {
            schemeId: schemeId,
            title: s.title,
            category: s.category,
            state: s.state || 'All India',
            ministry: s.ministry || '',
            tags: s.tags || [],
            applyLink: s.references?.[0]?.url || s.application_link || s.applyLink || s.url || '',
            myschemeVerified: s.myschemeVerified !== false,
            overview: s.overview || s.details || '',
            benefits: Array.isArray(s.benefits) ? s.benefits.join('. ') : (typeof s.benefits === 'object' ? JSON.stringify(s.benefits) : (s.benefits || '')),
            eligibility: s.eligibility_summary || (typeof s.eligibility === 'string' ? s.eligibility : JSON.stringify(s.eligibility || '')),
            documents: Array.isArray(s.documents) ? s.documents : [],
            application: s.application_process || s.applicationProcess || ''
        };

        if (query.filters && !passesFilters(meta, query.filters)) {
            continue;
        }

        let matchScore = 0;
        let matchedSource = 'catalog';

        // A. Exact scheme name match
        if (query.schemeName) {
            const nScore = schemeNameMatch(meta.title, query.schemeName);
            if (nScore > 0) {
                matchScore += nScore * 1.5;
                matchedSource = 'name_match';
            }
        }

        // B. Category match
        const schemeCatNorm = normalizeCategory(meta.category);
        if (reqCat && schemeCatNorm === reqCat) {
            matchScore += 0.55;
        }

        // C. Occupation match
        if (reqOcc) {
            const combinedText = `${meta.title} ${(meta.tags || []).join(' ')} ${meta.eligibility}`.toLowerCase();
            if (reqOcc === CANONICAL_OCCUPATIONS.FARMER) {
                if (schemeCatNorm === 'AGRICULTURE' || containsAlias(combinedText, 'farmer') || containsAlias(combinedText, 'kisan') || containsAlias(combinedText, 'khedut')) {
                    matchScore += 0.50;
                }
            } else if (reqOcc === CANONICAL_OCCUPATIONS.STUDENT) {
                if (schemeCatNorm === 'EDUCATION' || containsAlias(combinedText, 'student') || containsAlias(combinedText, 'scholarship') || containsAlias(combinedText, 'vidhyarthi')) {
                    matchScore += 0.50;
                }
            }
        }

        // D. Keywords match
        if (query.keywords && query.keywords.length > 0) {
            const fullText = `${meta.title}\n${meta.overview}\n${meta.benefits}\n${meta.eligibility}`;
            const kw = keywordScore(fullText, query.keywords);
            if (kw > 0) {
                matchScore += kw * 0.40;
            }
        }

        // E. State match bonus
        if (reqState && reqState !== CANONICAL_STATES.ALL_INDIA) {
            const sNorm = normalizeState(meta.state);
            if (sNorm && sNorm.canonical === reqState) {
                matchScore += 0.25; // Local state scheme priority
            }
        }

        if (matchScore > 0) {
            const textContent = `Scheme: ${meta.title}\nCategory: ${meta.category}\nState: ${meta.state}\n\n${meta.overview}\n\nBenefits:\n${meta.benefits}\n\nEligibility:\n${meta.eligibility}`;
            addOrUpdateCandidate(schemeId, {
                score: matchScore,
                text: textContent,
                metadata: meta,
                section: 'overview',
                source: matchedSource,
                confidence: matchScore >= 0.4 ? 'high' : 'medium'
            });
        }
    }

    // ── 3. Sort Unique Schemes by Combined Score ────────────────
    const sortedUniqueSchemes = Array.from(schemeCandidates.values())
        .sort((a, b) => b.bestScore - a.bestScore);

    // ── 4. Build Balanced Candidates (Multiple Schemes) ─────────
    const results = [];
    const maxSchemes = topK;

    for (let i = 0; i < Math.min(sortedUniqueSchemes.length, maxSchemes); i++) {
        const item = sortedUniqueSchemes[i];
        results.push({
            score: item.bestScore,
            text: item.bestChunk.text,
            metadata: item.bestChunk.metadata,
            section: item.bestChunk.section || 'overview',
            source: item.bestChunk.source,
            confidence: item.bestChunk.confidence
        });
    }

    return results;
}

/**
 * Check if retrieval results have sufficient confidence
 */
function hasConfidence(results) {
    if (!results || results.length === 0) return false;
    return results[0].score >= SIMILARITY_THRESHOLD;
}

module.exports = {
    retrieve,
    hasConfidence,
    passesFilters,
    SIMILARITY_THRESHOLD
};
