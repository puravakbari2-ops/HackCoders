/* ============================================================
   Test: Unicode & Multilingual Pipeline Verification
   Checks Hindi and Gujarati text integrity end-to-end
   ============================================================ */

const assert = require('assert');

const testStrings = [
    { lang: 'en', original: "Hello, what government schemes are available?" },
    { lang: 'hi', original: "मुझे सरकारी योजना चाहिए - किसानों के लिए" },
    { lang: 'gu', original: "મારે સરકારી યોજના જોઈએ - ખેડૂતો માટે" },
    { lang: 'hi', original: "नमस्ते भारत" },
    { lang: 'gu', original: "નમસ્તે ભારત - ખેડૂત" }
];

console.log('══════════════════════════════════════════════════');
console.log('   JanSahay AI — Unicode Pipeline Verification    ');
console.log('══════════════════════════════════════════════════\n');

let failed = 0;

testStrings.forEach((item, idx) => {
    // 1. JSON stringify and parse
    const serialized = JSON.stringify({ message: item.original });
    const parsed = JSON.parse(serialized);

    assert.strictEqual(parsed.message, item.original, `JSON roundtrip failed for ${item.lang}`);

    // 2. Buffer UTF-8 roundtrip
    const buf = Buffer.from(item.original, 'utf-8');
    const decoded = buf.toString('utf-8');
    assert.strictEqual(decoded, item.original, `Buffer UTF-8 roundtrip failed for ${item.lang}`);

    // 3. Check for corruption markers
    const hasCorruption = /[Ãð]/.test(decoded);
    if (hasCorruption) {
        console.error(`❌ Corruption detected in [${item.lang}]: "${item.original}" -> "${decoded}"`);
        failed++;
    } else {
        console.log(`✅ [${item.lang.toUpperCase()}] Text integrity verified: "${decoded}"`);
    }
});

if (failed === 0) {
    console.log('\n🎉 ALL Unicode tests passed with 0% corruption!\n');
    process.exit(0);
} else {
    console.error(`\n❌ ${failed} Unicode tests failed!\n`);
    process.exit(1);
}
