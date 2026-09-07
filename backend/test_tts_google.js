/* ============================================================
   JanSahay AI - Google Cloud Text-to-Speech Test Script
   Verifies English (en-IN), Hindi (hi-IN), and Gujarati (gu-IN)
   speech synthesis via the official Google Cloud TTS API.
   Outputs test-output-en.mp3, test-output-hi.mp3, test-output-gu.mp3.
   Run manually: node backend/test_tts_google.js
   ============================================================ */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const googleTtsService = require('./services/googleTtsService');

const TEST_CASES = [
    {
        lang: 'en',
        locale: 'en-IN',
        filename: 'test-output-en.mp3',
        description: 'English (Indian Locale)',
        text: 'Welcome to JanSahay AI. You can discover verified central and state government schemes for farmers, students, healthcare, and business loans.'
    },
    {
        lang: 'hi',
        locale: 'hi-IN',
        filename: 'test-output-hi.mp3',
        description: 'Hindi (Devanagari Script)',
        text: 'जनसहाय एआई में आपका स्वागत है। मैं आपको किसानों, छात्रों और व्यवसाय ऋण के लिए सरकारी योजनाओं की जानकारी दे सकता हूँ।'
    },
    {
        lang: 'gu',
        locale: 'gu-IN',
        filename: 'test-output-gu.mp3',
        description: 'Gujarati (Gujarati Script)',
        text: 'જનસહાય એઆઈમાં આપનું સ્વાગત છે. હું તમને ખેડૂતો, વિદ્યાર્થીઓ અને સરકારી યોજનાઓ વિશે સાચી માહિતી આપવામાં મદદ કરી શકું છું.'
    }
];

async function runTests() {
    console.log('\n============================================================');
    console.log('   JanSahay AI - Official Google Cloud TTS Test Suite');
    console.log('============================================================\n');

    // 1. Check health and credentials
    const health = googleTtsService.checkHealth();
    console.log('📋 Configuration & Health Status:');
    console.log(`  - Provider               : ${health.provider}`);
    console.log(`  - Enabled                : ${health.enabled}`);
    console.log(`  - Credentials Configured : ${health.credentialsConfigured ? '✅ YES' : '❌ NO'}`);
    console.log(`  - Credential Source      : ${health.credentialsSource}`);
    console.log(`  - English Voice          : ${health.voices.english}`);
    console.log(`  - Hindi Voice            : ${health.voices.hindi}`);
    console.log(`  - Gujarati Voice         : ${health.voices.gujarati}`);
    console.log('');

    if (!health.credentialsConfigured) {
        console.warn('⚠️  Google Cloud credentials are NOT currently configured.');
        console.warn('   To configure credentials, set GOOGLE_APPLICATION_CREDENTIALS in backend/.env:');
        console.warn('   GOOGLE_APPLICATION_CREDENTIALS=C:\\path\\to\\service-account.json');
        console.warn('   Or run: gcloud auth application-default login\n');
        console.warn('   See backend/GOOGLE_TTS_SETUP.md for full setup instructions.\n');
    }

    // 2. Synthesize each language
    let passedCount = 0;

    for (const tc of TEST_CASES) {
        console.log(`🔊 Testing [${tc.lang.toUpperCase()}] ${tc.description}...`);
        console.log(`   Input Text: "${tc.text.substring(0, 60)}..."`);

        try {
            const startTime = Date.now();
            const result = await googleTtsService.synthesizeSpeech(tc.text, tc.lang);
            const duration = Date.now() - startTime;

            const outputPath = path.join(__dirname, tc.filename);
            fs.writeFileSync(outputPath, result.audioBuffer);

            console.log(`   ✅ Success (${duration}ms)`);
            console.log(`      - Output file  : ${outputPath}`);
            console.log(`      - Audio size   : ${result.audioBuffer.length} bytes`);
            console.log(`      - Voice used   : ${result.voiceUsed}`);
            console.log(`      - Locale code  : ${result.languageCode}`);
            console.log(`      - Chunks       : ${result.chunks}`);
            console.log('');
            passedCount++;
        } catch (err) {
            console.error(`   ❌ Failed: ${err.message}`);
            if (err.code) console.error(`      Error Code: ${err.code}`);
            console.log('');
        }
    }

    console.log('============================================================');
    console.log(`Results: ${passedCount}/${TEST_CASES.length} synthesized successfully.`);
    console.log('============================================================\n');

    if (passedCount === TEST_CASES.length) {
        console.log('🎉 All language tests passed! Google Cloud TTS is ready for production.\n');
    } else if (passedCount === 0 && !health.credentialsConfigured) {
        console.log('ℹ️  Tests could not run because Google Cloud credentials have not yet been provided.');
        console.log('   Once you add your service account key file, run this test again.\n');
    }
}

// Execute tests
runTests().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
});
