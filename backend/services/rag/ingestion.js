/* ============================================================
   RAG Service: Ingestion Pipeline
   Loads schemes, chunks, embeds, and stores in vector index
   Supports incremental indexing via content hashing
   ============================================================ */

require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { chunkAllSchemes } = require('./chunker');
const { embedBatch } = require('./embeddings');
const vectorStore = require('./vectorStore');

const SCHEMES_PATH = path.join(__dirname, '..', '..', 'data', 'schemes.json');
const HASH_CACHE_PATH = path.join(__dirname, '..', '..', 'data', 'vector_index', 'hash_cache.json');

/**
 * Load hash cache for incremental indexing
 */
function loadHashCache() {
    if (fs.existsSync(HASH_CACHE_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(HASH_CACHE_PATH, 'utf-8'));
        } catch (e) {
            return {};
        }
    }
    return {};
}

/**
 * Save hash cache
 */
function saveHashCache(cache) {
    const dir = path.dirname(HASH_CACHE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(HASH_CACHE_PATH, JSON.stringify(cache));
}

/**
 * Run the full ingestion pipeline
 * @param {Object} options - Configuration options
 * @param {boolean} [options.force] - Force full re-index (ignore cache)
 * @param {string} [options.schemesPath] - Custom path to schemes.json
 * @returns {Promise<Object>} - Ingestion results
 */
async function ingest(options = {}) {
    const startTime = Date.now();
    const schemesPath = options.schemesPath || SCHEMES_PATH;

    console.log('\n══════════════════════════════════════════════════');
    console.log('   JanSahay AI — Knowledge Base Ingestion Pipeline');
    console.log('══════════════════════════════════════════════════\n');

    // ── Step 1: Load Schemes ────────────────────────────────────
    console.log('[1/6] Loading schemes...');
    if (!fs.existsSync(schemesPath)) {
        throw new Error(`Schemes file not found: ${schemesPath}`);
    }

    const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf-8'));
    console.log(`  ✓ Loaded ${schemes.length} schemes`);

    // ── Step 2: Validate ────────────────────────────────────────
    console.log('[2/6] Validating schemes...');
    const validation = validateSchemes(schemes);
    console.log(`  ✓ Valid: ${validation.valid}, Warnings: ${validation.warnings.length}`);

    if (validation.warnings.length > 0) {
        for (const w of validation.warnings.slice(0, 10)) {
            console.log(`  ⚠ ${w}`);
        }
        if (validation.warnings.length > 10) {
            console.log(`  ... and ${validation.warnings.length - 10} more warnings`);
        }
    }

    // ── Step 3: Chunk ───────────────────────────────────────────
    console.log('[3/6] Chunking schemes into sections...');
    const chunks = chunkAllSchemes(schemes);
    console.log(`  ✓ Created ${chunks.length} chunks`);

    // ── Step 4: Check for incremental updates ───────────────────
    const hashCache = options.force ? {} : loadHashCache();
    let chunksToEmbed = chunks;
    let cachedEmbeddings = [];

    if (!options.force && Object.keys(hashCache).length > 0) {
        console.log('[4/6] Checking for incremental updates...');
        const newChunks = [];
        const reusableIndices = [];

        for (let i = 0; i < chunks.length; i++) {
            if (hashCache[chunks[i].hash]) {
                cachedEmbeddings.push({ index: i, embedding: hashCache[chunks[i].hash] });
                reusableIndices.push(i);
            } else {
                newChunks.push({ index: i, chunk: chunks[i] });
            }
        }

        console.log(`  ✓ Reusing ${reusableIndices.length} cached embeddings`);
        console.log(`  ✓ Need to embed ${newChunks.length} new/changed chunks`);

        chunksToEmbed = newChunks.map(c => c.chunk);
    } else {
        console.log('[4/6] Full indexing (no cache)...');
    }

    // ── Step 5: Generate Embeddings ─────────────────────────────
    console.log(`[5/6] Generating embeddings for ${chunksToEmbed.length} chunks...`);

    let embeddings;
    if (chunksToEmbed.length > 0) {
        const texts = chunksToEmbed.map(c => c.text);
        embeddings = await embedBatch(texts);
        console.log(`  ✓ Generated ${embeddings.length} embeddings`);
    } else {
        embeddings = [];
        console.log('  ✓ No new embeddings needed');
    }

    // ── Step 6: Build & Save Vector Index ───────────────────────
    console.log('[6/6] Building vector index...');

    // Combine cached and new embeddings
    const allEmbeddings = new Array(chunks.length);
    const newHashCache = {};

    // Place cached embeddings
    for (const cached of cachedEmbeddings) {
        allEmbeddings[cached.index] = cached.embedding;
    }

    // Place new embeddings
    let newEmbIdx = 0;
    for (let i = 0; i < chunks.length; i++) {
        if (!allEmbeddings[i]) {
            allEmbeddings[i] = embeddings[newEmbIdx++];
        }
        // Update hash cache
        newHashCache[chunks[i].hash] = allEmbeddings[i];
    }

    // Build metadata for each chunk (store text alongside metadata for retrieval)
    const metadataArray = chunks.map(c => ({
        ...c.metadata,
        text: c.text,
        section: c.section,
        chunkId: c.chunkId,
        hash: c.hash
    }));

    // Build and save the index
    vectorStore.buildIndex(allEmbeddings, metadataArray);
    vectorStore.saveIndex();
    saveHashCache(newHashCache);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    const results = {
        schemesProcessed: schemes.length,
        chunksCreated: chunks.length,
        embeddingsGenerated: embeddings.length,
        cachedReused: cachedEmbeddings.length,
        indexSize: allEmbeddings.length,
        validationWarnings: validation.warnings.length,
        elapsedSeconds: parseFloat(elapsed),
        version: process.env.KB_VERSION || '1.0.0',
        timestamp: new Date().toISOString()
    };

    console.log('\n══════════════════════════════════════════════════');
    console.log('   ✅ Ingestion Complete!');
    console.log(`   Schemes: ${results.schemesProcessed}`);
    console.log(`   Chunks: ${results.chunksCreated}`);
    console.log(`   Embeddings: ${results.embeddingsGenerated} new, ${results.cachedReused} cached`);
    console.log(`   Time: ${elapsed}s`);
    console.log('══════════════════════════════════════════════════\n');

    return results;
}

/**
 * Validate schemes before ingestion
 */
function validateSchemes(schemes) {
    const warnings = [];
    const ids = new Set();
    let valid = 0;

    for (let i = 0; i < schemes.length; i++) {
        const s = schemes[i];

        if (!s.id) {
            warnings.push(`Scheme at index ${i}: missing ID`);
            continue;
        }

        if (ids.has(String(s.id))) {
            warnings.push(`Duplicate scheme ID: ${s.id}`);
        }
        ids.add(String(s.id));

        if (!s.title) {
            warnings.push(`Scheme ${s.id}: missing title`);
        }

        if (!s.benefits && !s.benefits_detailed) {
            warnings.push(`Scheme ${s.id} (${s.title}): missing benefits`);
        }

        if (!s.eligibility_summary && !s.eligibility_detailed && !s.eligibility) {
            warnings.push(`Scheme ${s.id} (${s.title}): missing eligibility`);
        }

        valid++;
    }

    return { valid, warnings };
}

module.exports = { ingest, validateSchemes };
