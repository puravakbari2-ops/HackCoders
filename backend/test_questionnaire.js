// JanSahay AI Questionnaire & Anti-Repetition Test Suite
const http = require('http');

function post(urlPath, data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: urlPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function runTests() {
    console.log('====================================================');
    console.log('🧪 JANSAHAY AI QUESTIONNAIRE & ANTI-REPETITION TESTS');
    console.log('====================================================\n');

    let passed = 0;
    let failed = 0;

    const assert = (condition, name, detail) => {
        if (condition) {
            console.log(`  ✅ PASS: ${name}`);
            passed++;
        } else {
            console.error(`  ❌ FAIL: ${name} — ${detail}`);
            failed++;
        }
    };

    // ──────────────────────────────────────────────────────────
    // TEST 1: Progressive Multi-Turn Conversational Questionnaire
    // ──────────────────────────────────────────────────────────
    console.log('Test 1: Progressive Multi-Turn Questionnaire (Sequential, No Stuck Loops)');
    const sid1 = 'test_session_multi_' + Date.now();

    // Turn 1: General inquiry
    const res1_1 = await post('/api/voice/chat', { message: 'I need government schemes', sessionId: sid1 });
    assert(res1_1.data.state === 'asking' && (res1_1.data.reply.includes('occupation') || res1_1.data.reply.includes('category')), 'Turn 1 asks for occupation/category', res1_1.data.reply);

    // Turn 2: Provide occupation
    const res1_2 = await post('/api/voice/chat', { message: 'I am a farmer', sessionId: sid1 });
    assert(res1_2.data.profile.occupation === 'farmer' && res1_2.data.state === 'asking' && (res1_2.data.reply.includes('state') || res1_2.data.reply.includes('city')), 'Turn 2 extracts farmer and asks for state/city', res1_2.data.reply);

    // Turn 3: Provide City ("Ahmedabad" -> maps to Gujarat)
    const res1_3 = await post('/api/voice/chat', { message: 'I live in Ahmedabad', sessionId: sid1 });
    assert(res1_3.data.profile.state === 'Gujarat' && res1_3.data.state === 'asking' && res1_3.data.reply.includes('income'), 'Turn 3 extracts Ahmedabad -> Gujarat and asks for income', res1_3.data.reply);

    // Turn 4: Provide numeric income ("60000" -> below-1l)
    const res1_4 = await post('/api/voice/chat', { message: 'My annual income is around 60000', sessionId: sid1 });
    assert(res1_4.data.profile.income === 'below-1l' && res1_4.data.state === 'matched' && res1_4.data.schemes.length > 0, 'Turn 4 extracts 60000 -> below-1l and returns matched schemes', JSON.stringify(res1_4.data.profile));

    // ──────────────────────────────────────────────────────────
    // TEST 2: Contextual Scheme Follow-Up Memory (No Fallback Loop!)
    // ──────────────────────────────────────────────────────────
    console.log('\nTest 2: Contextual Scheme Follow-Up Memory');
    // Turn 5: "How do I apply?"
    const res2_1 = await post('/api/voice/chat', { message: 'How do I apply for this?', sessionId: sid1 });
    assert(res2_1.data.state === 'info' && (res2_1.data.reply.includes('How to Apply') || res2_1.data.reply.includes('Apply')), 'Follow-up "How do I apply" gives application steps for active scheme', res2_1.data.reply);

    // Turn 6: "What documents are needed?"
    const res2_2 = await post('/api/voice/chat', { message: 'What documents are required?', sessionId: sid1 });
    assert(res2_2.data.state === 'info' && res2_2.data.reply.includes('Required Documents'), 'Follow-up "documents" gives required documents for active scheme', res2_2.data.reply);

    // Turn 7: "Show more schemes"
    const res2_3 = await post('/api/voice/chat', { message: 'Can you show me more schemes?', sessionId: sid1 });
    assert(res2_3.data.state === 'matched' && res2_3.data.schemes.length > 0, 'Follow-up "more schemes" returns additional schemes', res2_3.data.reply);

    // Turn 8: Gratitude acknowledgment
    const res2_4 = await post('/api/voice/chat', { message: 'Thank you very much', sessionId: sid1 });
    assert(res2_4.data.reply.toLowerCase().includes('welcome'), 'Gratitude recognized warmly without repeating questionnaire', res2_4.data.reply);

    // ──────────────────────────────────────────────────────────
    // TEST 3: Single-Shot Multi-Entity Extraction (Skips redundant questions)
    // ──────────────────────────────────────────────────────────
    console.log('\nTest 3: Single-Shot Multi-Entity Extraction');
    const sid3 = 'test_session_single_' + Date.now();
    const res3 = await post('/api/voice/chat', {
        message: 'I am a student from Surat with 1.5 lakh income looking for scholarship',
        sessionId: sid3
    });
    assert(
        res3.data.profile.occupation === 'student' &&
        res3.data.profile.state === 'Gujarat' &&
        res3.data.profile.income === '1l-2.5l' &&
        res3.data.state === 'matched' &&
        res3.data.schemes.length > 0,
        'Extracts occupation, Surat->Gujarat, 1.5L and matches immediately without asking',
        JSON.stringify(res3.data.profile)
    );

    // ──────────────────────────────────────────────────────────
    // TEST 4: Multilingual Gujarati Questionnaire & Follow-Up
    // ──────────────────────────────────────────────────────────
    console.log('\nTest 4: Gujarati Questionnaire & Follow-Up');
    const sid4 = 'test_session_gu_' + Date.now();

    // Gujarati Turn 1: Farmer in Rajkot
    const res4_1 = await post('/api/voice/chat', {
        message: 'હું ખેડૂત છું અને રાજકોટમાં રહું છું',
        sessionId: sid4
    });
    assert(
        res4_1.data.language === 'gu' &&
        res4_1.data.profile.occupation === 'farmer' &&
        res4_1.data.profile.state === 'Gujarat' &&
        res4_1.data.reply.includes('આવક'),
        'Gujarati Turn 1 identifies farmer + Rajkot->Gujarat and asks for income in Gujarati',
        res4_1.data.reply
    );

    // Gujarati Turn 2: Income 50 thousand
    const res4_2 = await post('/api/voice/chat', {
        message: 'મારી વાર્ષિક આવક 50 હજાર છે',
        sessionId: sid4
    });
    assert(
        res4_2.data.language === 'gu' &&
        res4_2.data.profile.income === 'below-1l' &&
        res4_2.data.state === 'matched' &&
        res4_2.data.schemes.length > 0,
        'Gujarati Turn 2 matches schemes and speaks Gujarati',
        res4_2.data.spokenText
    );

    // Gujarati Turn 3: Follow-up on application
    const res4_3 = await post('/api/voice/chat', {
        message: 'અરજી કેવી રીતે કરવી?',
        sessionId: sid4
    });
    assert(
        res4_3.data.language === 'gu' &&
        res4_3.data.reply.includes('અરજી કેવી રીતે કરવી'),
        'Gujarati Turn 3 gives application steps for active scheme in Gujarati',
        res4_3.data.reply
    );

    // ──────────────────────────────────────────────────────────
    // TEST 5: Chat Endpoint (/api/chat) Session Continuity
    // ──────────────────────────────────────────────────────────
    console.log('\nTest 5: /api/chat Session Continuity');
    const sid5 = 'test_session_chat_' + Date.now();
    const res5_1 = await post('/api/chat', { message: 'I need farmer schemes in Rajasthan', sessionId: sid5 });
    const res5_2 = await post('/api/chat', { message: 'under 1 lakh income', sessionId: sid5 });

    assert(
        res5_2.data.sessionId === sid5 &&
        res5_2.data.profile &&
        res5_2.data.profile.state === 'Rajasthan' &&
        res5_2.data.profile.income === 'below-1l' &&
        res5_2.data.schemes && res5_2.data.schemes.length > 0,
        '/api/chat maintains session continuity across turns with scheme matches',
        JSON.stringify(res5_2.data)
    );

    console.log('\n====================================================');
    console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');
}

runTests().catch(console.error);
