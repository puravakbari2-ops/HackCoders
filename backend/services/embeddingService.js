/* ============================================================
   JanSahay AI — TF-IDF Embedding Service
   Lightweight in-memory vector embeddings for scheme retrieval
   No external APIs — runs 100% locally using `natural` npm package
   ============================================================ */

const natural = require('natural');
const TfIdf   = natural.TfIdf;

class EmbeddingService {
    constructor() {
        this.tfidf       = new TfIdf();
        this.chunks      = [];      // Array of { schemeId, sectionType, text, metadata }
        this.isReady     = false;
        this.tokenizer   = new natural.WordTokenizer();
        this.stemmer     = natural.PorterStemmer;
    }

    /* ── Build Index from Schemes Array ────────────────────── */
    buildIndex(schemes) {
        const startTime = Date.now();
        this.chunks = [];
        this.tfidf  = new TfIdf();

        for (const scheme of schemes) {
            const baseMetadata = {
                schemeId:    String(scheme.id),
                title:       scheme.title,
                type:        scheme.type,
                category:    scheme.category,
                state:       scheme.state || 'All India',
                ministry:    scheme.ministry,
                tags:        scheme.tags || [],
                source:      'schemes.json'
            };

            // ── Chunk 1: Overview ──────────────────────────
            const overviewText = [
                scheme.title,
                scheme.category,
                scheme.ministry,
                scheme.benefits || '',
                scheme.eligibility_summary || '',
                (scheme.tags || []).join(' ')
            ].filter(Boolean).join('. ');

            this._addChunk(overviewText, 'overview', baseMetadata);

            // ── Chunk 2: Details (if available) ─────────────
            if (scheme.details) {
                this._addChunk(scheme.details, 'details', baseMetadata);
            }

            // ── Chunk 3: Benefits Detailed ──────────────────
            if (scheme.benefits_detailed) {
                this._addChunk(scheme.benefits_detailed, 'benefits', baseMetadata);
            }

            // ── Chunk 4: Eligibility Detailed ───────────────
            if (scheme.eligibility_detailed) {
                this._addChunk(scheme.eligibility_detailed, 'eligibility', baseMetadata);
            }

            // ── Chunk 5: Application Process ────────────────
            if (scheme.application_process) {
                const processText = this._flattenApplicationProcess(scheme.application_process);
                if (processText) {
                    this._addChunk(processText, 'application', baseMetadata);
                }
            }

            // ── Chunk 6: Documents Required ─────────────────
            if (scheme.documents_required && Array.isArray(scheme.documents_required)) {
                const docsText = scheme.documents_required
                    .map(d => typeof d === 'string' ? d : (d.name || d.document || JSON.stringify(d)))
                    .join('. ');
                if (docsText) {
                    this._addChunk(docsText, 'documents', baseMetadata);
                }
            } else if (scheme.documents && Array.isArray(scheme.documents)) {
                const docsText = scheme.documents.join('. ');
                if (docsText) {
                    this._addChunk(docsText, 'documents', baseMetadata);
                }
            }

            // ── Chunk 7: FAQs ───────────────────────────────
            if (scheme.faqs && Array.isArray(scheme.faqs)) {
                const faqText = scheme.faqs
                    .map(f => `Q: ${f.question || f.q || ''} A: ${f.answer || f.a || ''}`)
                    .join(' ');
                if (faqText.trim()) {
                    this._addChunk(faqText, 'faqs', baseMetadata);
                }
            }
        }

        this.isReady = true;
        const elapsed = Date.now() - startTime;
        console.log(`   📊 Indexed ${this.chunks.length} chunks from ${schemes.length} schemes in ${elapsed}ms`);
        return this.chunks.length;
    }

    /* ── Add a chunk to the TF-IDF index ─────────────────── */
    _addChunk(text, sectionType, metadata) {
        const cleanText = this._cleanText(text);
        if (!cleanText || cleanText.length < 10) return;

        const idx = this.chunks.length;
        this.chunks.push({
            index:       idx,
            text:        cleanText,
            sectionType,
            metadata
        });
        this.tfidf.addDocument(cleanText);
    }

    /* ── Clean & normalize text ──────────────────────────── */
    _cleanText(text) {
        if (!text) return '';
        return String(text)
            .replace(/<[^>]+>/g, ' ')          // Strip HTML
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, ' ')
            .trim();
    }

    /* ── Flatten nested application_process structure ───── */
    _flattenApplicationProcess(appProcess) {
        if (!appProcess) return '';
        if (typeof appProcess === 'string') return appProcess;

        const parts = [];

        const extract = (obj) => {
            if (!obj) return;
            if (typeof obj === 'string') { parts.push(obj); return; }
            if (Array.isArray(obj)) { obj.forEach(extract); return; }
            if (typeof obj === 'object') {
                if (obj.text) parts.push(obj.text);
                if (obj.mode) parts.push(`Mode: ${obj.mode}`);
                if (obj.process) extract(obj.process);
                if (obj.children) extract(obj.children);
                // Recurse all keys
                for (const key of Object.keys(obj)) {
                    if (!['text', 'mode', 'process', 'children', 'type', 'bold', 'italic', 'align'].includes(key)) {
                        if (typeof obj[key] === 'object') extract(obj[key]);
                    }
                }
            }
        };

        extract(appProcess);
        return parts.filter(Boolean).join('. ');
    }

    /* ── Semantic Search (TF-IDF cosine similarity) ─────── */
    search(query, topK = 20, filters = {}) {
        if (!this.isReady || this.chunks.length === 0) return [];

        const cleanQuery = this._cleanText(query);
        if (!cleanQuery) return [];

        // Get TF-IDF similarity scores for all chunks
        const scores = [];
        this.tfidf.tfidfs(cleanQuery, (i, measure) => {
            scores.push({ index: i, tfidfScore: measure });
        });

        // Apply metadata filters
        let filtered = scores.filter(s => {
            const chunk = this.chunks[s.index];
            if (!chunk) return false;

            // Filter by scheme type
            if (filters.type && chunk.metadata.type !== filters.type) return false;

            // Filter by state
            if (filters.state) {
                const chunkState = (chunk.metadata.state || '').toLowerCase();
                const filterState = filters.state.toLowerCase();
                if (chunkState !== 'all india' && chunkState !== filterState) return false;
            }

            // Filter by category
            if (filters.category) {
                const chunkCat = (chunk.metadata.category || '').toLowerCase();
                if (!chunkCat.includes(filters.category.toLowerCase())) return false;
            }

            // Filter by scheme IDs (for pre-filtered results from rule engine)
            if (filters.schemeIds && Array.isArray(filters.schemeIds)) {
                if (!filters.schemeIds.includes(chunk.metadata.schemeId)) return false;
            }

            return true;
        });

        // Sort by TF-IDF score descending
        filtered.sort((a, b) => b.tfidfScore - a.tfidfScore);

        // Take top K
        const topResults = filtered.slice(0, topK);

        // Enrich with chunk data
        return topResults.map(r => ({
            chunk:      this.chunks[r.index],
            score:      r.tfidfScore,
            schemeId:   this.chunks[r.index].metadata.schemeId,
            section:    this.chunks[r.index].sectionType
        }));
    }

    /* ── BM25 Keyword Search ────────────────────────────── */
    bm25Search(query, topK = 20, filters = {}) {
        if (!this.isReady || this.chunks.length === 0) return [];

        const queryTokens = this.tokenizer.tokenize(query.toLowerCase());
        if (!queryTokens.length) return [];

        const results = [];

        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i];

            // Apply metadata filters
            if (filters.schemeIds && !filters.schemeIds.includes(chunk.metadata.schemeId)) continue;
            if (filters.type && chunk.metadata.type !== filters.type) continue;

            const docTokens = this.tokenizer.tokenize(chunk.text.toLowerCase());
            let matchCount  = 0;
            let exactHits   = 0;

            for (const qt of queryTokens) {
                const stemmedQt = this.stemmer.stem(qt);
                for (const dt of docTokens) {
                    if (dt === qt) { exactHits++; matchCount++; }
                    else if (this.stemmer.stem(dt) === stemmedQt) { matchCount++; }
                }
            }

            if (matchCount > 0) {
                // BM25-inspired scoring
                const tf  = matchCount / docTokens.length;
                const idf = Math.log((this.chunks.length - matchCount + 0.5) / (matchCount + 0.5) + 1);
                const k1  = 1.5;
                const b   = 0.75;
                const avgLen = 200;
                const bm25 = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (docTokens.length / avgLen))) * idf;

                results.push({
                    chunk,
                    score:     bm25 + (exactHits * 0.5), // Bonus for exact matches
                    schemeId:  chunk.metadata.schemeId,
                    section:   chunk.sectionType
                });
            }
        }

        results.sort((a, b) => b.score - a.score);
        return results.slice(0, topK);
    }

    /* ── Hybrid Search (TF-IDF + BM25 combined) ─────────── */
    hybridSearch(query, topK = 20, filters = {}) {
        const tfidfResults = this.search(query, topK * 2, filters);
        const bm25Results  = this.bm25Search(query, topK * 2, filters);

        // Merge scores by chunk index
        const mergedMap = new Map();

        for (const r of tfidfResults) {
            const key = `${r.schemeId}:${r.section}`;
            mergedMap.set(key, {
                ...r,
                combinedScore: (r.score || 0) * 0.6   // TF-IDF weight: 60%
            });
        }

        for (const r of bm25Results) {
            const key = `${r.schemeId}:${r.section}`;
            if (mergedMap.has(key)) {
                mergedMap.get(key).combinedScore += (r.score || 0) * 0.4; // BM25 weight: 40%
            } else {
                mergedMap.set(key, {
                    ...r,
                    combinedScore: (r.score || 0) * 0.4
                });
            }
        }

        const merged = Array.from(mergedMap.values());
        merged.sort((a, b) => b.combinedScore - a.combinedScore);
        return merged.slice(0, topK);
    }

    /* ── Get stats ──────────────────────────────────────── */
    getStats() {
        return {
            totalChunks:  this.chunks.length,
            isReady:      this.isReady,
            sectionCounts: this.chunks.reduce((acc, c) => {
                acc[c.sectionType] = (acc[c.sectionType] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

module.exports = new EmbeddingService();
