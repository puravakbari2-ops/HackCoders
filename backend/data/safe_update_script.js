const fs = require('fs');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, '../../script.js');
const SCHEMES_PATH = path.join(__dirname, 'schemes.json');
const FORM_JS_PATH = path.join(__dirname, '../../frontend/assets/js/form.js');

const schemes = JSON.parse(fs.readFileSync(SCHEMES_PATH, 'utf8'));
let scriptContent = fs.readFileSync(SCRIPT_PATH, 'utf8');

// 1. Update ALL_SCHEMES array
const startMarker = 'let ALL_SCHEMES = [';
const endMarker = 'const SAMPLE_SCHEMES = ALL_SCHEMES;';

const startIdx = scriptContent.indexOf(startMarker);
const endIdx = scriptContent.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find ALL_SCHEMES markers in script.js');
    process.exit(1);
}

const newArrayStr = 'let ALL_SCHEMES = ' + JSON.stringify(schemes, null, 4) + ';\n\n';
scriptContent = scriptContent.substring(0, startIdx) + newArrayStr + scriptContent.substring(endIdx);
console.log('Replaced ALL_SCHEMES in script.js successfully.');

// 2. Ensure exact ministry matching in getFilteredSchemes
if (!scriptContent.includes('const isExactMinistry = MINISTRIES.some(')) {
    const filterAnchor = '    const cleanQ   = q.replace(/\\([^)]*\\)/g, \'\').trim();\r\n    const coreName = cleanQ.replace(/^ministry of\\s+/, \'\').trim();';
    const filterAnchorLF = '    const cleanQ   = q.replace(/\\([^)]*\\)/g, \'\').trim();\n    const coreName = cleanQ.replace(/^ministry of\\s+/, \'\').trim();';
    
    const patchCode = `

    // Prioritize exact ministry match when clicked from a ministry badge
    const isExactMinistry = MINISTRIES.some(m => m.name.toLowerCase() === rawQ || m.name.toLowerCase().replace(/&/g, 'and') === q);
    if (isExactMinistry) {
        return ALL_SCHEMES.filter(scheme => {
            if (typeFilter === 'central' && scheme.type !== 'central') return false;
            if (typeFilter === 'state' && scheme.type !== 'state') return false;
            const sMin = (scheme.ministry || '').toLowerCase().replace(/&/g, 'and');
            return sMin === q;
        });
    }`;

    if (scriptContent.includes(filterAnchor)) {
        scriptContent = scriptContent.replace(filterAnchor, filterAnchor + patchCode);
        console.log('Patched getFilteredSchemes in script.js (CRLF).');
    } else if (scriptContent.includes(filterAnchorLF)) {
        scriptContent = scriptContent.replace(filterAnchorLF, filterAnchorLF + patchCode);
        console.log('Patched getFilteredSchemes in script.js (LF).');
    }
}

// 3. Update Apply Now link in renderResults of script.js
const oldApplyAnchor = '<a href="${scheme.applyLink || \'#\'}" target="_blank" rel="noopener noreferrer" class="result-card-link">Apply Now <i class="fas fa-external-link-alt"></i></a>';
const newApplyAnchor = '<a href="${(scheme.applyLink && scheme.applyLink !== \'#\') ? scheme.applyLink : `https://www.myscheme.gov.in/search?q=${encodeURIComponent((scheme.title || \'\').replace(/\\(.*?\\)/g, \'\').trim())}`}" target="_blank" rel="noopener noreferrer" class="result-card-link" title="Apply on official portal">Apply Now <i class="fas fa-external-link-alt"></i></a>';

if (scriptContent.includes(oldApplyAnchor)) {
    scriptContent = scriptContent.replace(oldApplyAnchor, newApplyAnchor);
    console.log('Updated Apply Now link in script.js.');
} else {
    console.log('Note: Apply Now link already updated or differs in script.js.');
}

fs.writeFileSync(SCRIPT_PATH, scriptContent, 'utf8');
console.log('Saved script.js successfully.');

// 4. Update Apply Now link in frontend/assets/js/form.js
let formJsContent = fs.readFileSync(FORM_JS_PATH, 'utf8');
const oldFormLink = '<a href="${s.applyLink || \'#\'}" target="_blank" rel="noopener" class="result-card-link">';
const newFormLink = '<a href="${(s.applyLink && s.applyLink !== \'#\') ? s.applyLink : `https://www.myscheme.gov.in/search?q=${encodeURIComponent((s.title || \'\').replace(/\\(.*?\\)/g, \'\').trim())}`}" target="_blank" rel="noopener noreferrer" class="result-card-link" title="Apply on official portal">';

if (formJsContent.includes(oldFormLink)) {
    formJsContent = formJsContent.replace(oldFormLink, newFormLink);
    fs.writeFileSync(FORM_JS_PATH, formJsContent, 'utf8');
    console.log('Updated Apply Now link in frontend/assets/js/form.js.');
} else {
    console.log('Note: Apply Now link already updated or differs in form.js.');
}
