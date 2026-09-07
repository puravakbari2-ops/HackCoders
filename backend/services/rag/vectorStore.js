/* ============================================================
   RAG Service: Vector Store
   Pure-JS cosine similarity vector store with disk persistence
   Drop-in replaceable with FAISS/Pinecone/Qdrant later
   ============================================================ */

const fs = require('fs');
const path = require('path');

const INDEX_DIR = path.join(__dirname, '..', '..', 'data', 'vector_index');
const VECTORS_FILE = path.join(INDEX_DIR, 'vectors.json');
const META_FILE = path.join(INDEX_DIR, 'metadata.json');
const VERSION_FILE = path.join(INDEX_DIR, 'version.json');

/**
 * In-memory store
 */
let vectors = [];      // Array of Float64Array-compatible number arrays
let metadataStore = []; // Parallel array of metadata objects
let isLoaded = false;

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(a, b) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (normA * normB);
}

/**
 * Ensure the index directory exists
 */
function ensureDir() {
    if (!fs.existsSync(INDEX_DIR)) {
        fs.mkdirSync(INDEX_DIR, { recursive: true });
    }
}

/**
 * Add vectors and metadata to the store (replaces existing index)
 * @param {number[][]} newVectors - Array of embedding vectors
 * @param {Object[]} newMetadata - Parallel array of metadata objects
 */
function buildIndex(newVectors, newMetadata) {
    if (newVectors.length !== newMetadata.length) {
        throw new Error('Vectors and metadata arrays must have the same length');
    }

    vectors = newVectors;
    metadataStore = newMetadata;
    isLoaded = true;

    console.log(`[VectorStore] Index built with ${vectors.length} vectors`);
}

/**
 * Search for the top-K most similar vectors
 * @param {number[]} queryVector - The query embedding
 * @param {number} topK - Number of results to return
 * @param {Object} [filters] - Optional metadata filters
 * @returns {Object[]} - Array of { score, metadata, index }
 */
function search(queryVector, topK = 10, filters = null) {
    if (!isLoaded || vectors.length === 0) {
        console.warn('[VectorStore] Index is empty or not loaded');
        return [];
    }

    const results = [];

    for (let i = 0; i < vectors.length; i++) {
        // Apply metadata filters before computing similarity (optimization)
        if (filters) {
            const meta = metadataStore[i];
            if (!matchesFilters(meta, filters)) continue;
        }

        const score = cosineSimilarity(queryVector, vectors[i]);
        results.push({ score, metadata: metadataStore[i], index: i });
    }

    // Sort by similarity (descending)
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, topK);
}

/**
 * Check if metadata matches the given filters
 */
function matchesFilters(meta, filters) {
    if (!meta || !filters) return true;

    // State filter
    if (filters.state) {
        const metaState = (meta.state || '').toLowerCase();
        const filterState = filters.state.toLowerCase();
        if (metaState !== 'all india' && metaState !== filterState && metaState !== '') {
            return false;
        }
    }

    // Category filter
    if (filters.category) {
        const metaCat = (meta.category || '').toLowerCase();
        const filterCat = filters.category.toLowerCase();
        if (metaCat && !metaCat.includes(filterCat)) {
            return false;
        }
    }

    // Section filter (e.g., only search "eligibility" sections)
    if (filters.section) {
        if (meta.section !== filters.section) {
            return false;
        }
    }

    // Scheme type filter (central/state)
    if (filters.type) {
        if (meta.type && meta.type.toLowerCase() !== filters.type.toLowerCase()) {
            return false;
        }
    }

    return true;
}

/**
 * Save the index to disk
 */
function saveIndex() {
    ensureDir();

    // Save vectors as a flat JSON array (compact)
    fs.writeFileSync(VECTORS_FILE, JSON.stringify(vectors));

    // Save metadata
    fs.writeFileSync(META_FILE, JSON.stringify(metadataStore, null, 0));

    // Save version info
    const versionInfo = {
        version: process.env.KB_VERSION || '1.0.0',
        vectorCount: vectors.length,
        lastIndexed: new Date().toISOString(),
        embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-004',
        embeddingDim: vectors.length > 0 ? vectors[0].length : 0
    };
    fs.writeFileSync(VERSION_FILE, JSON.stringify(versionInfo, null, 2));

    console.log(`[VectorStore] Index saved: ${vectors.length} vectors to ${INDEX_DIR}`);
}

/**
 * Load the index from disk
 * @returns {boolean} - true if loaded successfully
 */
function loadIndex() {
    if (!fs.existsSync(VECTORS_FILE) || !fs.existsSync(META_FILE)) {
        console.warn('[VectorStore] No saved index found. Run ingestion first: npm run ingest');
        return false;
    }

    try {
        const rawVectors = fs.readFileSync(VECTORS_FILE, 'utf-8');
        vectors = JSON.parse(rawVectors);

        const rawMeta = fs.readFileSync(META_FILE, 'utf-8');
        metadataStore = JSON.parse(rawMeta);

        isLoaded = true;

        // Log version info
        if (fs.existsSync(VERSION_FILE)) {
            const version = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf-8'));
            console.log(`[VectorStore] Index loaded: ${vectors.length} vectors (v${version.version}, indexed: ${version.lastIndexed})`);
        } else {
            console.log(`[VectorStore] Index loaded: ${vectors.length} vectors`);
        }

        return true;
    } catch (err) {
        console.error(`[VectorStore] Failed to load index: ${err.message}`);
        return false;
    }
}

/**
 * Get index stats
 */
function getStats() {
    let versionInfo = {};
    if (fs.existsSync(VERSION_FILE)) {
        versionInfo = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf-8'));
    }

    return {
        isLoaded,
        vectorCount: vectors.length,
        metadataCount: metadataStore.length,
        ...versionInfo
    };
}

/**
 * Get the text content for a given vector index
 */
function getTextByIndex(index) {
    if (index >= 0 && index < metadataStore.length) {
        return metadataStore[index].text || '';
    }
    return '';
}

/**
 * Get the full metadata object for a given vector index
 */
function getMetaByIndex(index) {
    if (index >= 0 && index < metadataStore.length) {
        return metadataStore[index];
    }
    return null;
}

/**
 * Check if index exists on disk
 */
function indexExists() {
    return fs.existsSync(VECTORS_FILE) && fs.existsSync(META_FILE);
}

module.exports = {
    buildIndex,
    search,
    saveIndex,
    loadIndex,
    getStats,
    getTextByIndex,
    getMetaByIndex,
    indexExists,
    cosineSimilarity
};
