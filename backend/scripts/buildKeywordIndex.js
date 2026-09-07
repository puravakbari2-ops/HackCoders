#!/usr/bin/env node
/* ============================================================
   Script: Build Keyword Index (Zero-API Fallback Index)
   Builds the vector store index using scheme chunks and metadata
   without requiring Gemini API embedding calls.
   Allows RAG keyword retrieval to work immediately even if
   embedding quota is exhausted.
   Usage: node scripts/buildKeywordIndex.js
   ============================================================ */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { chunkAllSchemes } = require('../services/rag/chunker');
const vectorStore = require('../services/rag/vectorStore');

const SCHEMES_PATH = path.join(__dirname, '..', 'data', 'schemes.json');

async function buildKeywordIndex() {
    console.log('\n══════════════════════════════════════════════════');
    console.log('   JanSahay AI — Build Keyword & Metadata Index');
    console.log('══════════════════════════════════════════════════\n');

    if (!fs.existsSync(SCHEMES_PATH)) {
        console.error(`❌ Schemes file not found at: ${SCHEMES_PATH}`);
        process.exit(1);
    }

    console.log('[1/4] Reading schemes from data/schemes.json...');
    const rawData = fs.readFileSync(SCHEMES_PATH, 'utf-8');
    const schemes = JSON.parse(rawData);
    console.log(`✅ Loaded ${schemes.length} schemes.`);

    console.log('[2/4] Generating chunks from all schemes...');
    const chunks = chunkAllSchemes(schemes);
    console.log(`✅ Generated ${chunks.length} total chunks.`);

    console.log('[3/4] Preparing index vectors and metadata...');
    // We create a lightweight 1-D vector placeholder for each chunk
    // Real embeddings can be populated incrementally via npm run ingest
    const vectors = [];
    const metadataList = [];

    for (const chunk of chunks) {
        vectors.push([0]); // 1-dimensional placeholder
        metadataList.push({
            chunkId: chunk.chunkId,
            schemeId: String(chunk.metadata?.schemeId || ''),
            title: chunk.metadata?.title || '',
            category: chunk.metadata?.category || '',
            state: chunk.metadata?.state || 'All India',
            type: chunk.metadata?.type || 'central',
            ministry: chunk.metadata?.ministry || '',
            tags: chunk.metadata?.tags || [],
            applyLink: chunk.metadata?.applyLink || '',
            myschemeVerified: chunk.metadata?.myschemeVerified !== false,
            section: chunk.section || 'overview',
            text: chunk.text || '',
            hash: chunk.hash || ''
        });
    }

    console.log('[4/4] Saving index to data/vector_index/...');
    vectorStore.buildIndex(vectors, metadataList);
    vectorStore.saveIndex();

    console.log('\n✅ Keyword & Metadata Index successfully created!');
    console.log(`📊 Indexed ${schemes.length} schemes across ${chunks.length} chunks.`);
    console.log('🚀 RAG pipeline is now fully active with hybrid keyword + rule retrieval!\n');
}

buildKeywordIndex().catch(err => {
    console.error('❌ Failed to build keyword index:', err);
    process.exit(1);
});
