const http = require('http');

function post(data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/voice/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function testFlow() {
    console.log('=== MULTI-TURN CATEGORY ACCURACY BENCHMARK ===');

    // Test 1: Direct "kisan yojana" -> "education schemes"
    const sid1 = 'test_en_kisan_edu_' + Date.now();
    console.log('\n--- Test 1: "kisan yojana" then "education schemes" ---');
    const r1_1 = await post({ message: 'kisan yojana', sessionId: sid1 });
    console.log('T1 Schemes:', (r1_1.schemes || []).map(s => s.title));
    const r1_2 = await post({ message: 'education schemes', sessionId: sid1 });
    console.log('T2 Schemes:', (r1_2.schemes || []).map(s => s.title));
    const t2HasKisan = (r1_2.schemes || []).some(s => /kisan|farmer|fasal/i.test(s.title));
    const t2HasEdu = (r1_2.schemes || []).every(s => /scholarship|education|student|saksham|inspire|mysy/i.test(s.title + ' ' + (s.category || '')));
    console.log(`Test 1 Result: No Kisan: ${!t2HasKisan}, All Education: ${t2HasEdu}`);

    // Test 2: "kisan yojana" -> "what about education schemes?"
    const sid2 = 'test_en_what_about_' + Date.now();
    console.log('\n--- Test 2: "kisan yojana" then "what about education schemes?" ---');
    await post({ message: 'kisan yojana', sessionId: sid2 });
    const r2_2 = await post({ message: 'what about education schemes?', sessionId: sid2 });
    console.log('T2 Schemes:', (r2_2.schemes || []).map(s => s.title));
    const t2_2HasKisan = (r2_2.schemes || []).some(s => /kisan|farmer|fasal/i.test(s.title));
    console.log(`Test 2 Result: No Kisan: ${!t2_2HasKisan}`);

    // Test 3: "kisan yojana" -> "ask for education schemes"
    const sid3 = 'test_en_ask_for_' + Date.now();
    console.log('\n--- Test 3: "kisan yojana" then "ask for education schemes" ---');
    await post({ message: 'kisan yojana', sessionId: sid3 });
    const r3_2 = await post({ message: 'ask for education schemes', sessionId: sid3 });
    console.log('T3 Schemes:', (r3_2.schemes || []).map(s => s.title));
    const t3_2HasKisan = (r3_2.schemes || []).some(s => /kisan|farmer|fasal/i.test(s.title));
    console.log(`Test 3 Result: No Kisan: ${!t3_2HasKisan}`);

    // Test 4: Gujarati: "ખેડૂત સહાય" -> "હવે શિક્ષણ યોજના બતાવો"
    const sid4 = 'test_gu_' + Date.now();
    console.log('\n--- Test 4: Gujarati "ખેડૂત સહાય યોજના" then "હવે શિક્ષણ યોજના બતાવો" ---');
    const r4_1 = await post({ message: 'ખેડૂત સહાય યોજના', sessionId: sid4 });
    console.log('GU T1 Schemes:', (r4_1.schemes || []).map(s => s.title));
    const r4_2 = await post({ message: 'હવે શિક્ષણ યોજના બતાવો', sessionId: sid4 });
    console.log('GU T2 Schemes:', (r4_2.schemes || []).map(s => s.title));
    const guHasKisan = (r4_2.schemes || []).some(s => /kisan|farmer|fasal|કિસાન/i.test(s.title));
    console.log(`GU Test Result: No Kisan: ${!guHasKisan}`);

    // Test 5: Hindi: "किसान योजना" -> "अब पढ़ाई और छात्रवृत्ति योजनाएं दिखाएं"
    const sid5 = 'test_hi_' + Date.now();
    console.log('\n--- Test 5: Hindi "किसान योजना" then "अब पढ़ाई और छात्रवृत्ति योजनाएं दिखाएं" ---');
    const r5_1 = await post({ message: 'किसान योजना', sessionId: sid5 });
    console.log('HI T1 Schemes:', (r5_1.schemes || []).map(s => s.title));
    const r5_2 = await post({ message: 'अब पढ़ाई और छात्रवृत्ति योजनाएं दिखाएं', sessionId: sid5 });
    console.log('HI T2 Schemes:', (r5_2.schemes || []).map(s => s.title));
    const hiHasKisan = (r5_2.schemes || []).some(s => /kisan|farmer|fasal/i.test(s.title));
    console.log(`HI Test Result: No Kisan: ${!hiHasKisan}`);
}

testFlow().catch(console.error);
