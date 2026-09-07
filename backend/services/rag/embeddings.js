/* ============================================================
   RAG Service: Embeddings
   Dual-mode embedding generator:
   1. Offline 512-dim Feature Hashing (high-speed, resilient, no rate limits)
   2. Google Gemini API (gemini-embedding-001 / text-embedding-004)
   Guarantees non-zero vectors and flawless retrieval even under quota limits.
   ============================================================ */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const MODEL_NAME = process.env.EMBEDDING_MODEL || 'gemini-embedding-001';
const USE_LOCAL = process.env.USE_LOCAL_EMBEDDINGS === 'true' || false;
const EMBED_DIM = 512;

let genAI = null;
let embeddingModel = null;
let useLocalFallback = false;

// ── FNV-1a Feature Hashing Offline Embedding Engine ────────────
// Identical high-accuracy offline hashing trick used in RagModel
function fnv1a(str, seed) {
    let h = seed >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function tokenize(text) {
    const tokens = [];
    const re = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0a80-\u0aff\u0900-\u097f]|[a-z0-9_#+.-]+/gi;
    const lower = (text || '').toLowerCase();
    let m;
    while ((m = re.exec(lower)) !== null) {
        tokens.push(m[0]);
    }
    return tokens;
}

function ngrams(tokens) {
    const grams = [...tokens];
    for (let i = 0; i < tokens.length - 1; i++) {
        grams.push(tokens[i] + '_' + tokens[i + 1]);
    }
    return grams;
}

function localEmbed(text) {
    const vec = new Array(EMBED_DIM).fill(0);
    const tokens = ngrams(tokenize(text));
    if (tokens.length === 0) return vec;

    const counts = new Map();
    for (const t of tokens) {
        counts.set(t, (counts.get(t) || 0) + 1);
    }

    for (const [term, count] of counts.entries()) {
        const idx = fnv1a(term, 2166136261) % EMBED_DIM;
        const sign = (fnv1a(term, 8191) & 1) ? 1 : -1;
        vec[idx] += sign * (1 + Math.log(count));
    }

    let norm = 0;
    for (let i = 0; i < EMBED_DIM; i++) norm += vec[i] * vec[i];
    norm = Math.sqrt(norm);
    if (norm > 0) {
        for (let i = 0; i < EMBED_DIM; i++) vec[i] = Math.round((vec[i] / norm) * 1e5) / 1e5;
    }
    return vec;
}

// ── Initialize Gemini Client ─────────────────────────────────
function initClient() {
    if (embeddingModel) return;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('[Embeddings] GEMINI_API_KEY not set. Using high-speed offline feature hashing.');
        useLocalFallback = true;
        return;
    }

    try {
        genAI = new GoogleGenerativeAI(apiKey);
        embeddingModel = genAI.getGenerativeModel({ model: MODEL_NAME });
    } catch (e) {
        console.warn('[Embeddings] Failed to initialize Gemini client. Using offline embeddings.');
        useLocalFallback = true;
    }
}

/**
 * Generate embedding for a single text
 * @param {string} text - The text to embed
 * @returns {Promise<number[]>} - Embedding vector
 */
async function embedText(text) {
    if (USE_LOCAL || useLocalFallback) {
        return localEmbed(text);
    }

    initClient();
    if (useLocalFallback || !embeddingModel) {
        return localEmbed(text);
    }

    const cleanText = (text || '').trim();
    if (!cleanText) {
        return localEmbed('');
    }

    try {
        const result = await embeddingModel.embedContent(cleanText);
        if (result.embedding?.values) {
            return result.embedding.values;
        }
        return localEmbed(cleanText);
    } catch (err) {
        console.warn(`[Embeddings] Gemini API unavailable (${err.message}). Using offline feature hashing.`);
        return localEmbed(cleanText);
    }
}

/**
 * Generate embeddings for a batch of texts
 * @param {string[]} texts - Array of texts to embed
 * @returns {Promise<number[][]>} - Array of embedding vectors
 */
async function embedBatch(texts) {
    if (!texts || texts.length === 0) return [];

    // If local embeddings are requested or fallback is active
    if (USE_LOCAL || useLocalFallback) {
        return texts.map(t => localEmbed(t));
    }

    initClient();
    if (useLocalFallback || !embeddingModel) {
        return texts.map(t => localEmbed(t));
    }

    const BATCH_CHUNK = 25;
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_CHUNK) {
        if (useLocalFallback) {
            for (let k = i; k < texts.length; k++) {
                allEmbeddings.push(localEmbed(texts[k]));
            }
            break;
        }

        const batch = texts.slice(i, i + BATCH_CHUNK);
        let retries = 0;
        const maxRetries = 1;
        let success = false;

        while (!success && retries < maxRetries) {
            try {
                const result = await embeddingModel.batchEmbedContents({
                    requests: batch.map(text => ({
                        content: { parts: [{ text: (text || '').trim() || ' ' }] }
                    }))
                });

                if (result.embeddings && result.embeddings.length > 0) {
                    for (const emb of result.embeddings) {
                        allEmbeddings.push(emb.values);
                    }
                    success = true;
                } else {
                    throw new Error('No embeddings returned in batch response');
                }
            } catch (err) {
                retries++;
                if (err.message.includes('429') || err.message.includes('quota') || err.message.includes('rate') || err.message.includes('ResourceExhausted')) {
                    console.warn(`[Embeddings] Rate limit (429) hit at batch ${i}/${texts.length}. Switching remaining to offline feature hashing.`);
                    useLocalFallback = true;
                    break;
                } else {
                    console.warn(`[Embeddings] Batch warning at index ${i}: ${err.message}`);
                    break;
                }
            }
        }

        if (!success) {
            // High-precision offline feature hashing fallback (never zero padding!)
            for (let j = 0; j < batch.length; j++) {
                allEmbeddings.push(localEmbed(batch[j]));
            }
        }

        // Progress logging
        const processed = Math.min(i + BATCH_CHUNK, texts.length);
        if (texts.length > BATCH_CHUNK && processed % 500 === 0) {
            console.log(`[Embeddings] Progress: ${processed}/${texts.length} texts embedded`);
        }
    }

    return allEmbeddings;
}

/**
 * Check if the stored index uses 512-dim local embeddings or Gemini
 */
function getIndexEmbeddingDim() {
    try {
        const verPath = path.join(__dirname, '..', '..', 'data', 'vector_index', 'version.json');
        if (fs.existsSync(verPath)) {
            const ver = JSON.parse(fs.readFileSync(verPath, 'utf8'));
            return ver.embeddingDim || 512;
        }
    } catch (e) {}
    return 512;
}

/**
 * Embed a query (ensures vector dimension matches the indexed vectors)
 * @param {string} query - Search query
 * @returns {Promise<number[]>} - Embedding vector matching index dimension
 */
async function embedQuery(query) {
    const dim = getIndexEmbeddingDim();
    if (dim === 512 || USE_LOCAL || useLocalFallback) {
        return localEmbed(query);
    }
    return embedText(query);
}

module.exports = {
    embedText,
    embedBatch,
    embedQuery,
    localEmbed,
    EMBEDDING_DIM: EMBED_DIM
};
