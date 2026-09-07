const http = require('http');

function postChat(payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(payload);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/voice/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(new Error(`Failed to parse: ${body}`));
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log('=== JANSAHAY AI AUTO-LANGUAGE & DUPLICATION VERIFICATION ===\n');
    const sessionId = 'test_auto_session_' + Date.now();
    let passed = 0;
    let total = 0;

    function assert(condition, message) {
        total++;
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
        }
    }

    // Turn 1: User speaks Hindi in Auto mode (language: undefined)
    console.log('--- Turn 1: Hindi query in Auto mode ---');
    const t1 = await postChat({
        sessionId,
        message: 'मुझे किसान सम्मान निधि योजना के बारे में बताएं'
        // language: undefined (Auto mode)
    });
    console.log(`Detected Lang: ${t1.language}`);
    console.log(`Reply snippet: ${t1.reply.substring(0, 150)}...`);
    assert(t1.language === 'hi', 'Turn 1 detected language is Hindi');
    
    // Check for duplicate benefits text in Hindi response
    const benefitsMatches = (t1.reply.match(/मुख्य लाभ/g) || []).length;
    const aboutMatches = (t1.reply.match(/योजना के बारे में/g) || []).length;
    assert(benefitsMatches <= 1, 'Hindi reply does not repeat "मुख्य लाभ" header multiple times');
    assert(aboutMatches <= 1, 'Hindi reply does not repeat "योजना के बारे में" header multiple times');
    
    // Check that the same benefit sentence is not duplicated consecutively
    const lines = t1.reply.split('\n').map(l => l.trim()).filter(Boolean);
    let hasConsecutiveDuplicate = false;
    for (let i = 0; i < lines.length - 1; i++) {
        if (lines[i] === lines[i+1] && lines[i].length > 15) {
            hasConsecutiveDuplicate = true;
            console.error(`Duplicate lines detected: "${lines[i]}"`);
        }
    }
    assert(!hasConsecutiveDuplicate, 'Hindi reply has no consecutive duplicate sentences');

    // Turn 2: In the same ongoing session, user switches to English in Auto mode
    console.log('\n--- Turn 2: English query in same session (Auto mode) ---');
    const t2 = await postChat({
        sessionId,
        message: 'Show me education scholarships for college students'
    });
    console.log(`Detected Lang: ${t2.language}`);
    console.log(`Reply snippet: ${t2.reply.substring(0, 150)}...`);
    assert(t2.language === 'en', 'Turn 2 automatically detects switch to English');

    // Turn 3: In the same session, user switches to Gujarati in Auto mode
    console.log('\n--- Turn 3: Gujarati query in same session (Auto mode) ---');
    const t3 = await postChat({
        sessionId,
        message: 'મને ડિજિટલ ગુજરાત સ્કોલરશિપ વિશે જણાવો'
    });
    console.log(`Detected Lang: ${t3.language}`);
    console.log(`Reply snippet: ${t3.reply.substring(0, 150)}...`);
    assert(t3.language === 'gu', 'Turn 3 automatically detects switch to Gujarati');

    // Turn 4: User switches back to Hindi in Romanized / Hinglish script in Auto mode
    console.log('\n--- Turn 4: Hinglish / Hindi in same session (Auto mode) ---');
    const t4 = await postChat({
        sessionId,
        message: 'aur iske liye documents kya chahiye batao'
    });
    console.log(`Detected Lang: ${t4.language}`);
    console.log(`Reply snippet: ${t4.reply.substring(0, 150)}...`);
    assert(t4.language === 'hi', 'Turn 4 automatically detects switch back to Hindi (Hinglish)');

    console.log(`\n================================`);
    console.log(`RESULTS: ${passed}/${total} assertions passed`);
    if (passed === total) {
        console.log('🎉 ALL AUTO-LANGUAGE & DUPLICATION TESTS PASSED!');
        process.exit(0);
    } else {
        console.error('⚠️ SOME TESTS FAILED');
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
});
