#!/usr/bin/env node
/* ============================================================
   Script: Ingest Knowledge Base
   CLI script to run the full RAG ingestion pipeline
   Usage: npm run ingest
   ============================================================ */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function main() {
    const args = process.argv.slice(2);
    const force = args.includes('--force') || args.includes('-f');

    if (!process.env.GEMINI_API_KEY) {
        console.error('\n❌ GEMINI_API_KEY is not set!');
        console.error('   1. Go to https://aistudio.google.com/apikey');
        console.error('   2. Create an API key');
        console.error('   3. Add it to backend/.env:');
        console.error('      GEMINI_API_KEY=your_key_here');
        console.error('   4. Run this script again: npm run ingest\n');
        process.exit(1);
    }

    try {
        const { ingest } = require('../services/rag/ingestion');

        const results = await ingest({ force });

        console.log('\n📊 Ingestion Summary:');
        console.log(JSON.stringify(results, null, 2));
        console.log('\n✅ Knowledge base is ready! Start the server with: npm run dev\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Ingestion failed:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
}

main();
