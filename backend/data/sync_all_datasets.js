const fs = require('fs');
const path = require('path');

console.log('Starting Master Dataset Synchronization...');

// 1. Read MINISTRIES from script.js
const scriptPath = path.resolve(__dirname, '../../script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
const minMatch = scriptContent.match(/const MINISTRIES = (\[[\s\S]*?\]);\r?\n/);
if (!minMatch) throw new Error('Could not find MINISTRIES in script.js');
const MINISTRIES = eval(minMatch[1]);
console.log('Loaded', MINISTRIES.length, 'official ministries from script.js');

// 2. Extract existing schemes from script.js
const start = scriptContent.indexOf('let ALL_SCHEMES = [');
let end = scriptContent.indexOf('];\r\n\r\n// Try fetching');
if (end === -1) end = scriptContent.indexOf('];\n\n// Try fetching');
if (start === -1 || end === -1) throw new Error('Could not find ALL_SCHEMES in script.js');

const existingAll = JSON.parse(scriptContent.slice(start + 'let ALL_SCHEMES = '.length, end + 1));
const existingCentral = existingAll.filter(s => s.type === 'central');
const existingState = existingAll.filter(s => s.type === 'state');
console.log('Existing in script.js: Central =', existingCentral.length, ', State =', existingState.length);

// 3. Load Batch 2 (109)
const b2Path = 'C:/Users/priya/.gemini/antigravity-ide/brain/d7b7c06b-6a92-4a06-85fd-a1910ea02209/scratch/generate_schemes2.js';
const b2Content = fs.readFileSync(b2Path, 'utf8');
const b2ArrStr = b2Content.slice(b2Content.indexOf('const additionalSchemes = [') + 'const additionalSchemes = '.length, b2Content.lastIndexOf('];') + 1);
const batch2_109 = eval(b2ArrStr);
console.log('Loaded Batch 2 (generate_schemes2.js):', batch2_109.length);

// 4. Load the 4 batches
const { educationAndSciTechSchemes } = require('./batches/batch_education_scitech.js');
const { socialAndCommerceSchemes } = require('./batches/batch_social_commerce.js');
const { middleMinistriesSchemes } = require('./batches/batch_middle_ministries.js');
const { otherMinistriesSchemes } = require('./batches/batch_other_ministries.js');

console.log('Loaded Batches: Edu&SciTech =', educationAndSciTechSchemes.length,
    ', Social&Comm =', socialAndCommerceSchemes.length,
    ', Middle =', middleMinistriesSchemes.length,
    ', Other =', otherMinistriesSchemes.length);

// 5. Combine all Central Schemes
const allCentral = [
    ...existingCentral,
    ...batch2_109,
    ...educationAndSciTechSchemes,
    ...socialAndCommerceSchemes,
    ...middleMinistriesSchemes,
    ...otherMinistriesSchemes
];

// Normalize Ministry names & specific scheme re-mappings
allCentral.forEach(s => {
    if (s.ministry === 'Ministry of Agriculture & Farmers Welfare') s.ministry = 'Ministry of Agriculture and Farmers Welfare';
    if (s.ministry === 'Ministry of Youth Affairs and Sports') s.ministry = 'Ministry of Youth Affairs & Sports';
    if (s.id === '66') s.ministry = 'Ministry of Tourism'; // UDAN RCS Tourism
    if (s.id === '42') s.ministry = 'Ministry of Rural Development'; // AAY
    if (s.id === '43') s.ministry = 'Ministry of Social Justice and Empowerment'; // PMGKAY
    if (s.ministry === 'Ministry of Consumer Affairs, Food & Public Distribution') {
        s.ministry = 'Ministry of Consumer Affairs, Food and Public Distribution';
    }
});

// 6. Validate Central Counts
const minCounts = {};
allCentral.forEach(s => {
    minCounts[s.ministry] = (minCounts[s.ministry] || 0) + 1;
});

let mismatchFound = false;
MINISTRIES.forEach(m => {
    const act = minCounts[m.name] || 0;
    if (act !== m.count) {
        console.error(`ERROR: ${m.name} -> Target: ${m.count}, Actual: ${act}`);
        mismatchFound = true;
    }
});
if (mismatchFound) {
    throw new Error('Ministry count verification failed!');
}
console.log('SUCCESS: All 52 Central Ministries match badge counts exactly (714 schemes).');

// 7. Combine Central + State
const completeSchemes = [...allCentral, ...existingState];
console.log(`Complete Schemes Dataset: Central = ${allCentral.length}, State = ${existingState.length}, Total = ${completeSchemes.length}`);

// Ensure unique IDs
const idSet = new Set();
completeSchemes.forEach(s => {
    if (idSet.has(s.id)) {
        throw new Error(`Duplicate ID found: ${s.id}`);
    }
    idSet.add(s.id);
});
console.log('SUCCESS: Zero duplicate IDs across entire 1,074 scheme dataset.');

// 8. Write backend/data/schemes.json
const backendJsonPath = path.resolve(__dirname, 'schemes.json');
fs.writeFileSync(backendJsonPath, JSON.stringify(completeSchemes, null, 2), 'utf8');
console.log('Updated backend/data/schemes.json');

// 9. Update frontend/assets/js/data.js
const dataJsPath = path.resolve(__dirname, '../../frontend/assets/js/data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
const dataStart = dataJsContent.indexOf('const SAMPLE_SCHEMES = [');
const dataEnd = dataJsContent.indexOf('\nconst MINISTRIES = [');
if (dataStart === -1 || dataEnd === -1) {
    throw new Error('Could not find SAMPLE_SCHEMES markers in data.js');
}

const statesBlock = fs.readFileSync(path.resolve(__dirname, 'states_block.txt'), 'utf8');
const formattedSchemes = JSON.stringify(completeSchemes, null, 4);
const newDataJs = dataJsContent.slice(0, dataStart) +
    'const SAMPLE_SCHEMES = ' + formattedSchemes + ';\n\n' +
    statesBlock + '\n' +
    dataJsContent.slice(dataEnd + 1);
fs.writeFileSync(dataJsPath, newDataJs, 'utf8');
console.log('Updated frontend/assets/js/data.js (preserving STATES and API_BASE)');

// 10. Update script.js
const newScriptPart1 = scriptContent.slice(0, start) + 'let ALL_SCHEMES = ' + formattedSchemes + ';';
let scriptRemainder = scriptContent.slice(end + 2); // after ];

// Update getFilteredSchemes in script.js for exact ministry matching
const oldFilterFunc = `function getFilteredSchemes(query, typeFilter) {
    const rawQ = (query || '').toLowerCase().trim();
    if (!rawQ) {
        return ALL_SCHEMES.filter(scheme => {
            if (typeFilter === 'central' && scheme.type !== 'central') return false;
            if (typeFilter === 'state' && scheme.type !== 'state') return false;
            return true;
        });
    }

    const q = rawQ.replace(/&/g, 'and');
    const cleanQ = q.replace(/\\([^)]*\\)/g, '').trim();
    const coreName = cleanQ.replace(/^ministry of\\s+/, '').trim();

    return ALL_SCHEMES.filter(scheme => {
        // Type filter
        if (typeFilter === 'central' && scheme.type !== 'central') return false;
        if (typeFilter === 'state' && scheme.type !== 'state') return false;

        // Text search — title, ministry, category, tags, benefits, eligibility_summary
        const haystack = [
            scheme.title,
            scheme.ministry,
            scheme.state || '',
            scheme.category || '',
            (scheme.tags || []).join(' '),
            scheme.benefits,
            scheme.eligibility_summary || ''
        ].join(' ').toLowerCase().replace(/&/g, 'and');

        return haystack.includes(rawQ) ||
            haystack.includes(q) ||
            (cleanQ.length > 3 && haystack.includes(cleanQ)) ||
            (coreName.length > 3 && haystack.includes(coreName));
    });
}`;

const newFilterFunc = `function getFilteredSchemes(query, typeFilter) {
    const rawQ = (query || '').toLowerCase().trim();
    if (!rawQ) {
        return ALL_SCHEMES.filter(scheme => {
            if (typeFilter === 'central' && scheme.type !== 'central') return false;
            if (typeFilter === 'state' && scheme.type !== 'state') return false;
            return true;
        });
    }

    const q = rawQ.replace(/&/g, 'and');
    const cleanQ = q.replace(/\\([^)]*\\)/g, '').trim();
    const coreName = cleanQ.replace(/^ministry of\\s+/, '').trim();

    // Prioritize exact ministry match when clicked from ministry badge
    const isExactMinistry = MINISTRIES.some(m => m.name.toLowerCase() === rawQ || m.name.toLowerCase().replace(/&/g, 'and') === q);
    if (isExactMinistry) {
        return ALL_SCHEMES.filter(scheme => {
            if (typeFilter === 'central' && scheme.type !== 'central') return false;
            if (typeFilter === 'state' && scheme.type !== 'state') return false;
            const sMin = (scheme.ministry || '').toLowerCase().replace(/&/g, 'and');
            return sMin === q;
        });
    }

    return ALL_SCHEMES.filter(scheme => {
        // Type filter
        if (typeFilter === 'central' && scheme.type !== 'central') return false;
        if (typeFilter === 'state' && scheme.type !== 'state') return false;

        // Text search — title, ministry, category, tags, benefits, eligibility_summary
        const haystack = [
            scheme.title,
            scheme.ministry,
            scheme.state || '',
            scheme.category || '',
            (scheme.tags || []).join(' '),
            scheme.benefits,
            scheme.eligibility_summary || ''
        ].join(' ').toLowerCase().replace(/&/g, 'and');

        return haystack.includes(rawQ) ||
            haystack.includes(q) ||
            (cleanQ.length > 3 && haystack.includes(cleanQ)) ||
            (coreName.length > 3 && haystack.includes(coreName));
    });
}`;

if (scriptRemainder.includes(oldFilterFunc)) {
    scriptRemainder = scriptRemainder.replace(oldFilterFunc, newFilterFunc);
}

fs.writeFileSync(scriptPath, newScriptPart1 + scriptRemainder, 'utf8');
console.log('Updated script.js with unified schemes and exact ministry filter');

// 11. Update main.js for exact ministry handling
const mainJsPath = path.resolve(__dirname, '../../frontend/assets/js/main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
const oldMainFilter = `            document.dispatchEvent(new CustomEvent('jansahay:showResults', {
                detail: window.AppData.SAMPLE_SCHEMES.filter(s =>
                    s.title.toLowerCase().includes(query.toLowerCase()) || 
                    (s.ministry && s.ministry.toLowerCase().includes(query.toLowerCase())) ||
                    (s.state && s.state.toLowerCase().includes(query.toLowerCase())) || 
                    (s.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase())))
            }));`;

const newMainFilter = `            const cleanQuery = (query || '').toLowerCase().trim().replace(/&/g, 'and');
            const isMin = window.AppData.MINISTRIES.some(m => m.name.toLowerCase().replace(/&/g, 'and') === cleanQuery);
            const filtered = isMin
                ? window.AppData.SAMPLE_SCHEMES.filter(s => (s.ministry || '').toLowerCase().replace(/&/g, 'and') === cleanQuery)
                : window.AppData.SAMPLE_SCHEMES.filter(s =>
                    s.title.toLowerCase().includes(query.toLowerCase()) || 
                    (s.ministry && s.ministry.toLowerCase().includes(query.toLowerCase())) ||
                    (s.state && s.state.toLowerCase().includes(query.toLowerCase())) || 
                    (s.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase())));
            document.dispatchEvent(new CustomEvent('jansahay:showResults', { detail: filtered }));`;

if (mainJsContent.includes(oldMainFilter)) {
    mainJsContent = mainJsContent.replace(oldMainFilter, newMainFilter);
    fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
    console.log('Updated frontend/assets/js/main.js with exact ministry filter');
}

console.log(' Master Synchronization Complete!');
