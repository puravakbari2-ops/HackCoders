const fs = require('fs');
const path = require('path');

console.log('Synchronizing from backend/data/schemes.json (Single Source of Truth)...');

// 1. Read the verified 1,074 schemes
const schemesJsonPath = path.resolve(__dirname, 'schemes.json');
const allSchemes = JSON.parse(fs.readFileSync(schemesJsonPath, 'utf8'));
console.log(`Loaded ${allSchemes.length} schemes (${allSchemes.filter(s => s.type === 'central').length} central, ${allSchemes.filter(s => s.type === 'state').length} state)`);

// 2. Read MINISTRIES from script.js
const scriptPath = path.resolve(__dirname, '../../script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
const minMatch = scriptContent.match(/const MINISTRIES = (\[[\s\S]*?\]);\r?\n/);
const MINISTRIES = eval(minMatch[1]);

// Validate all 52 ministries have exact counts in allSchemes
const minCounts = {};
allSchemes.filter(s => s.type === 'central').forEach(s => {
    minCounts[s.ministry] = (minCounts[s.ministry] || 0) + 1;
});
let anyFail = false;
MINISTRIES.forEach(m => {
    const act = minCounts[m.name] || 0;
    if (act !== m.count) {
        console.error(`FAIL: ${m.name} -> Target: ${m.count}, Actual: ${act}`);
        anyFail = true;
    }
});
if (anyFail) throw new Error('Ministry count verification failed!');
console.log('All 52 Central Ministries verified with 100% exact target counts.');

// 3. Format schemes string
const formattedSchemes = JSON.stringify(allSchemes, null, 4);

// 4. Update frontend/assets/js/data.js
const dataJsPath = path.resolve(__dirname, '../../frontend/assets/js/data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
const dataStart = dataJsContent.indexOf('const SAMPLE_SCHEMES = [');
const minStart = dataJsContent.indexOf('const MINISTRIES = [');
if (dataStart === -1 || minStart === -1) throw new Error('Markers in data.js not found');

const statesBlock = fs.readFileSync(path.resolve(__dirname, 'states_block.txt'), 'utf8');

const updatedDataJs = dataJsContent.slice(0, dataStart) +
    'const SAMPLE_SCHEMES = ' + formattedSchemes + ';\n\n' +
    statesBlock + '\n\n' +
    dataJsContent.slice(minStart);
fs.writeFileSync(dataJsPath, updatedDataJs, 'utf8');
console.log('Successfully updated frontend/assets/js/data.js (including STATES and API_BASE)');

// 5. Update script.js
const scriptStart = scriptContent.indexOf('let ALL_SCHEMES = [');
let scriptEnd = scriptContent.indexOf('];\r\n\r\n// Try fetching');
if (scriptEnd === -1) scriptEnd = scriptContent.indexOf('];\n\n// Try fetching');
if (scriptStart === -1 || scriptEnd === -1) throw new Error('Markers in script.js not found');

let updatedScript = scriptContent.slice(0, scriptStart) +
    'let ALL_SCHEMES = ' + formattedSchemes + ';' +
    scriptContent.slice(scriptEnd + 2);

fs.writeFileSync(scriptPath, updatedScript, 'utf8');
console.log('Successfully updated script.js');

console.log('Synchronization Complete!');
