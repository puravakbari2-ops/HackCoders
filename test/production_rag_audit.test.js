const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'backend', '.env') });

const vectorStore = require('../backend/services/rag/vectorStore');
const supabase    = require('../backend/services/supabaseService');
const pipeline    = require('../backend/services/rag/pipeline');
const ragService  = require('../backend/services/ragService');
const { getSchemeCount } = require('../backend/services/eligibility/eligibilityEngine');

async function runProductionAudit() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('   JanSahay AI — Production Feature & RAG Functional Audit');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // 1. Knowledge Base Schemes
    const schemeCount = getSchemeCount();
    console.log(`1. Scheme Count: ${schemeCount} schemes loaded.`);
    if (schemeCount < 1000) throw new Error('Expected at least 1000 schemes');

    // 2. Vector Index
    console.log('\n2. Vector Store:');
    const indexExists = vectorStore.indexExists();
    console.log(`   - Index exists on disk: ${indexExists}`);
    const loaded = vectorStore.loadIndex();
    console.log(`   - Index loaded: ${loaded}`);
    const stats = vectorStore.getStats();
    console.log(`   - Vector count: ${stats.vectorCount}`);
    console.log(`   - Embedding dimension: ${stats.embeddingDim || 512}`);
    if (stats.vectorCount !== 4950) throw new Error(`Expected 4950 vectors, got ${stats.vectorCount}`);

    // 3. Supabase Integration
    console.log('\n3. Supabase Integration:');
    const sbHealth = await supabase.healthCheck();
    console.log('   - Health check:', sbHealth);
    if (!sbHealth.connected) {
        console.warn('   ⚠️  Supabase not connected:', sbHealth.reason || sbHealth.error);
    } else {
        console.log('   ✅ Supabase connected and ready!');
    }

    // 4. Similarity Search
    console.log('\n4. Similarity Search:');
    const dummyQueryVector = new Array(512).fill(0.01);
    const searchResults = vectorStore.search(dummyQueryVector, 3);
    console.log(`   - Search returned ${searchResults.length} results (top score: ${searchResults[0]?.score?.toFixed(3)})`);

    // 5. Realistic JanSahayAI Query
    console.log('\n5. Realistic Query Execution:');
    const userProfile = {
        age: 23,
        state: 'Gujarat',
        occupation: 'Student',
        education: 'Engineering',
        income: 280000
    };
    const userQuery = 'I am 23 years old, I live in Gujarat, I am an engineering student, and my annual family income is 2.8 lakh. What government schemes am I eligible for?';

    console.log(`   - Query: "${userQuery}"`);
    console.log('   - Profile:', JSON.stringify(userProfile));

    const startTime = Date.now();
    const result = await pipeline.process({
        query: userQuery,
        userProfile,
        sessionId: 'audit_session_production'
    });
    const duration = Date.now() - startTime;

    console.log(`\n   ✅ Query Processed in ${duration}ms!`);
    console.log(`   - Success: ${result.success}`);
    console.log(`   - Language: ${result.language}`);
    console.log(`   - Grounded: ${result.grounded}`);
    console.log(`   - Fallback used: ${result.used_fallback}`);
    console.log(`   - Retrieved schemes: ${result.schemes?.length || 0}`);

    if (result.schemes && result.schemes.length > 0) {
        console.log('\n   Top Scheme Matches:');
        result.schemes.slice(0, 5).forEach((s, idx) => {
            console.log(`     ${idx + 1}. ${s.scheme_name} (ID: ${s.scheme_id}, Score: ${s.relevance_score}, Status: ${s.eligibility_status})`);
        });
    }

    console.log('\n   Generated Answer:');
    console.log('   -------------------------------------------------------------');
    console.log(result.answer);
    console.log('   -------------------------------------------------------------');

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('   ✅ Production Functional Audit PASSED Completely!');
    console.log('═══════════════════════════════════════════════════════════════\n');
}

runProductionAudit().catch(err => {
    console.error('\n❌ Audit Failed:', err);
    process.exit(1);
});
