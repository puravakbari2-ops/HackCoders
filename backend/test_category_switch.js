// JanSahay Category Switch & Accuracy Test Suite
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

async function testCategorySwitching() {
    console.log('====================================================');
    console.log('🧪 CATEGORY SWITCHING & ACCURACY TEST SUITE');
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

    const sid = 'test_switch_session_' + Date.now();

    // ── Turn 1: Farmer / Kisan Scheme ─────────────────────────
    console.log('Turn 1: Ask for kisan yojana in Gujarat');
    const res1 = await post({ message: 'I need kisan yojana in Gujarat', sessionId: sid });
    const titles1 = (res1.data.schemes || []).map(s => s.title);
    console.log('   Results:', titles1);

    assert(
        res1.data.schemes && res1.data.schemes.length > 0 &&
        titles1.some(t => /kisan|fasal|farmer/i.test(t)) &&
        !titles1.some(t => /scholarship|education/i.test(t)),
        'Turn 1 returns ONLY agriculture/farmer schemes',
        titles1.join(', ')
    );

    // ── Turn 2: Switch to Education schemes in SAME session ────
    console.log('\nTurn 2: Now ask for education schemes in the SAME session');
    const res2 = await post({ message: 'now what about education schemes?', sessionId: sid });
    const titles2 = (res2.data.schemes || []).map(s => s.title);
    console.log('   Results:', titles2);

    assert(
        res2.data.schemes && res2.data.schemes.length > 0 &&
        titles2.every(t => !/kisan|fasal|farmer/i.test(t)) &&
        titles2.some(t => /scholarship|mysy|education|student/i.test(t)),
        'Turn 2 switches to Education: Returns ONLY education schemes and ZERO farmer schemes',
        titles2.join(', ')
    );

    // ── Turn 3: Switch to Health schemes in SAME session ───────
    console.log('\nTurn 3: Switch to health schemes in SAME session');
    const res3 = await post({ message: 'can you show me healthcare and medical schemes?', sessionId: sid });
    const titles3 = (res3.data.schemes || []).map(s => s.title);
    console.log('   Results:', titles3);

    assert(
        res3.data.schemes && res3.data.schemes.length > 0 &&
        titles3.every(t => !/scholarship|kisan/i.test(t)) &&
        titles3.some(t => /ayushman|health|amrutam|medical/i.test(t)),
        'Turn 3 switches to Health: Returns healthcare schemes',
        titles3.join(', ')
    );

    // ── Turn 4: Switch to Business / Mudra loans ───────────────
    console.log('\nTurn 4: Switch to business loan schemes in SAME session');
    const res4 = await post({ message: 'what about business loans or mudra loan?', sessionId: sid });
    const titles4 = (res4.data.schemes || []).map(s => s.title);
    console.log('   Results:', titles4);

    assert(
        res4.data.schemes && res4.data.schemes.length > 0 &&
        titles4.some(t => /mudra|business|loan|stand-up|startup/i.test(t)),
        'Turn 4 switches to Business: Returns MUDRA and business loan schemes',
        titles4.join(', ')
    );

    // ── Turn 5: Multilingual Gujarati Switch ───────────────────
    console.log('\nTurn 5: Multilingual Gujarati Switch (Farmer → Education)');
    const sidGu = 'test_gu_switch_' + Date.now();

    // Gujarati Turn 5A: Farmer
    const resGu1 = await post({ message: 'મારે ખેડૂતો માટે યોજના જોઈએ', sessionId: sidGu });
    // Provide Gujarat state
    await post({ message: 'ગુજરાત', sessionId: sidGu });
    const resGuKisan = await post({ message: 'આવક ૫૦ હજાર', sessionId: sidGu });
    const guTitles1 = (resGuKisan.data.schemes || []).map(s => s.title);
    console.log('   Gujarati Farmer Results:', guTitles1);

    assert(
        guTitles1.some(t => /kisan|fasal/i.test(t)),
        'Gujarati Turn 5A returns Kisan schemes',
        guTitles1.join(', ')
    );

    // Gujarati Turn 5B: Switch to Education in SAME session
    const resGuEdu = await post({ message: 'હવે વિદ્યાર્થીઓ માટે સ્કોલરશિપ અને શિક્ષણ યોજનાઓ કઈ છે?', sessionId: sidGu });
    const guTitles2 = (resGuEdu.data.schemes || []).map(s => s.title);
    console.log('   Gujarati Education Switch Results:', guTitles2);

    assert(
        guTitles2.length > 0 &&
        guTitles2.every(t => !/kisan|fasal/i.test(t)) &&
        guTitles2.some(t => /scholarship|mysy|education/i.test(t)),
        'Gujarati Turn 5B accurately switches to Education schemes and excludes Kisan schemes',
        guTitles2.join(', ')
    );

    // ── Turn 6: Multilingual Hindi Switch ──────────────────────
    console.log('\nTurn 6: Multilingual Hindi Switch (Farmer → Education)');
    const sidHi = 'test_hi_switch_' + Date.now();

    // Hindi Turn 6A: Farmer
    const resHi1 = await post({ message: 'मुझे किसान योजना चाहिए राजस्थान में', sessionId: sidHi });
    const hiTitles1 = (resHi1.data.schemes || []).map(s => s.title);
    console.log('   Hindi Farmer Results:', hiTitles1);

    // Hindi Turn 6B: Switch to Education
    const resHiEdu = await post({ message: 'अब मुझे छात्रवृत्ति (scholarship) और शिक्षा योजना बताओ', sessionId: sidHi });
    const hiTitles2 = (resHiEdu.data.schemes || []).map(s => s.title);
    console.log('   Hindi Education Switch Results:', hiTitles2);

    assert(
        hiTitles2.length > 0 &&
        hiTitles2.every(t => !/kisan mitra/i.test(t)) &&
        hiTitles2.some(t => /scholarship|yasasvi|chhatravritti/i.test(t)),
        'Hindi Turn 6B accurately switches to Scholarship/Education schemes',
        hiTitles2.join(', ')
    );

    console.log('\n====================================================');
    console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');
}

testCategorySwitching().catch(console.error);
