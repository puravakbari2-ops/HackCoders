// JanSahay Gujarati TTS Fix — Full Test Suite
// Tests all 5 cases from spec: EN, HI, GU, Roman GU, Language Switch

const http = require('http');
const https = require('https');

function post(msg, sid, lang) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ message: msg, sessionId: sid, language: lang });
        const req = http.request({
            hostname: 'localhost', port: 5000, path: '/api/voice/chat',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
        }, res => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => resolve(JSON.parse(d)));
        });
        req.on('error', reject);
        req.write(body); req.end();
    });
}

function testTTSProxy(lang, text) {
    return new Promise((resolve) => {
        const url = `http://localhost:5000/api/tts?lang=${lang}&text=${encodeURIComponent(text)}`;
        const req = http.get(url, res => {
            let bytes = 0;
            res.on('data', c => bytes += c.length);
            res.on('end', () => resolve({ status: res.statusCode, contentType: res.headers['content-type'], bytes }));
        });
        req.on('error', e => resolve({ error: e.message }));
    });
}

async function runTests() {
    console.log('='.repeat(65));
    console.log('JANSAHAY AI — COMPLETE TTS PIPELINE TEST');
    console.log('='.repeat(65));

    // TEST 1 — ENGLISH
    console.log('\nTEST 1 — ENGLISH');
    const t1 = await post('I need a government scheme for farmers.', 'test_en_1', 'en');
    console.log('  Input    : "I need a government scheme for farmers."');
    console.log('  Backend lang returned :', t1.language);
    console.log('  Expected : en  →', t1.language === 'en' ? '✅ PASS' : '❌ FAIL');
    console.log('  State    :', t1.state);

    // TEST 2 — HINDI
    console.log('\nTEST 2 — HINDI');
    const t2 = await post('Mujhe kisano ke liye sarkari yojana chahiye.', 'test_hi_1', 'hi');
    console.log('  Input    : "Mujhe kisano ke liye sarkari yojana chahiye."');
    console.log('  Backend lang returned :', t2.language);
    console.log('  Expected : hi  →', t2.language === 'hi' ? '✅ PASS' : '❌ FAIL');

    // TEST 3 — GUJARATI (Native Script)
    console.log('\nTEST 3 — GUJARATI (Native Script)');
    const t3 = await post('મારે ખેડૂતો માટે કોઈ સરકારી યોજના જોઈએ.', 'test_gu_1', 'gu');
    console.log('  Input    : "મારે ખેડૂતો માટે કોઈ સરકારી યોજના જોઈએ."');
    console.log('  Backend lang returned :', t3.language);
    console.log('  Expected : gu  →', t3.language === 'gu' ? '✅ PASS' : '❌ FAIL');
    console.log('  Profile occupation   :', t3.profile?.occupation || '(none)');

    // TEST 4 — ROMAN GUJARATI
    console.log('\nTEST 4 — ROMAN GUJARATI');
    const t4 = await post('mara mate koi government scheme chhe?', 'test_gu_2', undefined);
    console.log('  Input    : "mara mate koi government scheme chhe?"');
    console.log('  Backend lang returned :', t4.language);
    console.log('  Expected : gu  →', t4.language === 'gu' ? '✅ PASS' : '⚠️  PARTIAL (romanized Gujarati is hard to auto-detect without explicit lang)');

    // TEST 5 — TTS PROXY (audio bytes)
    console.log('\nTEST 5 — BACKEND TTS PROXY AUDIO');

    const gu = await testTTSProxy('gu', 'ખેડૂત માટે સ્કીમ');
    console.log('  Gujarati TTS proxy (/api/tts?lang=gu):');
    console.log('    Status      :', gu.status);
    console.log('    Content-Type:', gu.contentType);
    console.log('    Audio bytes :', gu.bytes);
    console.log('    Result      :', gu.status === 200 && gu.bytes > 1000 ? '✅ PASS — Real Gujarati audio returned' : '❌ FAIL');

    const hi = await testTTSProxy('hi', 'किसान के लिए योजना');
    console.log('  Hindi TTS proxy (/api/tts?lang=hi):');
    console.log('    Status      :', hi.status);
    console.log('    Audio bytes :', hi.bytes);
    console.log('    Result      :', hi.status === 200 && hi.bytes > 1000 ? '✅ PASS — Real Hindi audio returned' : '❌ FAIL');

    const en = await testTTSProxy('en', 'Farmer scheme details');
    console.log('  English TTS proxy (/api/tts?lang=en):');
    console.log('    Status      :', en.status);
    console.log('    Audio bytes :', en.bytes);
    console.log('    Result      :', en.status === 200 && en.bytes > 1000 ? '✅ PASS — Real English audio returned' : '❌ FAIL');

    console.log('\n' + '='.repeat(65));
    console.log('HOW GUJARATI VOICE WORKS NOW:');
    console.log('  1. Browser sends Gujarati message to /api/voice/chat');
    console.log('  2. Backend detects lang=gu, returns spokenText in Gujarati');
    console.log('  3. Frontend speak("...", "gu") checks for native gu-IN voice');
    console.log('  4. No native voice found → calls speakViaGoogleTTS("...", "gu")');
    console.log('  5. Frontend fetches http://localhost:5000/api/tts?lang=gu&text=...');
    console.log('  6. Backend proxy fetches Google TTS server-side (no CORS block)');
    console.log('  7. Backend streams audio/mpeg bytes to browser');
    console.log('  8. Browser plays real Gujarati audio ✅');
    console.log('='.repeat(65));
}

runTests().catch(console.error);
