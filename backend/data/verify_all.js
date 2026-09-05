const fs = require('fs');

global.window = { location: { hostname: 'localhost' } };

console.log('--- RUNNING FULL VERIFICATION SUITE ---');

// 1. backend/data/schemes.json
const backend = JSON.parse(fs.readFileSync('backend/data/schemes.json', 'utf8'));
const backendCentral = backend.filter(s => s.type === 'central').length;
const backendState = backend.filter(s => s.type === 'state').length;
console.log('1. backend/data/schemes.json:');
console.log(`   Total: ${backend.length} | Central: ${backendCentral} | State: ${backendState}`);
if (backend.length !== 1074 || backendCentral !== 714 || backendState !== 360) {
    throw new Error('backend schemes count mismatch');
}

// 2. frontend/assets/js/data.js
const dataJs = fs.readFileSync('frontend/assets/js/data.js', 'utf8');
const fakeWindow = {};
eval(dataJs.replace('window.AppData =', 'fakeWindow.AppData ='));
const dataSchemes = fakeWindow.AppData.SAMPLE_SCHEMES;
const dataCentral = dataSchemes.filter(s => s.type === 'central').length;
const dataState = dataSchemes.filter(s => s.type === 'state').length;
console.log('2. frontend/assets/js/data.js:');
console.log(`   Total: ${dataSchemes.length} | Central: ${dataCentral} | State: ${dataState}`);
if (dataSchemes.length !== 1074 || dataCentral !== 714 || dataState !== 360) {
    throw new Error('data.js schemes count mismatch');
}

// 3. script.js
const scriptJs = fs.readFileSync('script.js', 'utf8');
const minMatch = scriptJs.match(/const MINISTRIES = (\[[\s\S]*?\]);\r?\n/);
const MINISTRIES = eval(minMatch[1]);
const start = scriptJs.indexOf('let ALL_SCHEMES = [');
const endMarker = 'const SAMPLE_SCHEMES = ALL_SCHEMES;';
const end = scriptJs.indexOf(endMarker);
const scriptSchemes = JSON.parse(scriptJs.slice(start + 'let ALL_SCHEMES = '.length, end).trim().replace(/;$/, ''));
const scriptCentral = scriptSchemes.filter(s => s.type === 'central').length;
const scriptState = scriptSchemes.filter(s => s.type === 'state').length;
console.log('3. script.js:');
console.log(`   Total: ${scriptSchemes.length} | Central: ${scriptCentral} | State: ${scriptState}`);
if (scriptSchemes.length !== 1074 || scriptCentral !== 714 || scriptState !== 360) {
    throw new Error('script.js schemes count mismatch');
}

// 4. Test all 52 Ministries card clicks with getFilteredSchemes in script.js
const filterCodeMatch = scriptJs.match(/function getFilteredSchemes[\s\S]*?\n\}/);
eval('var ALL_SCHEMES = scriptSchemes; ' + filterCodeMatch[0]);

let passedCount = 0;
MINISTRIES.forEach(m => {
    const filtered = getFilteredSchemes(m.name, 'all');
    if (filtered.length !== m.count) {
        console.error(`FAIL: ${m.name} -> expected ${m.count}, got ${filtered.length}`);
    } else {
        passedCount++;
    }
});

console.log(`4. Card click test: ${passedCount} / 52 ministries passed with exact badge counts!`);
if (passedCount !== 52) throw new Error('Ministry filter verification failed');

// 5. Check duplicate IDs
const idCounts = {};
backend.forEach(s => { idCounts[s.id] = (idCounts[s.id] || 0) + 1; });
const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
console.log(`5. Duplicate IDs check: ${duplicateIds.length} duplicates found.`);
if (duplicateIds.length > 0) throw new Error('Duplicate IDs found: ' + duplicateIds.join(', '));

// 6. Test search keywords
console.log('6. Sample Keyword Searches:');
['kisan', 'scholarship', 'pension', 'ayushman', 'women'].forEach(kw => {
    const res = getFilteredSchemes(kw, 'all');
    console.log(`   Keyword "${kw}": returned ${res.length} schemes`);
});

console.log('\n=============================================');
console.log('ALL VERIFICATIONS PASSED WITH 100% PERFECTION');
console.log('=============================================');
