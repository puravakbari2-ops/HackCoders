const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

const anchor = 'const coreName = cleanQ.replace(/^ministry of\\s+/, \'\').trim();';
const anchorIdx = content.indexOf(anchor);

if (anchorIdx === -1) {
    throw new Error('Anchor not found in script.js');
}

const before = content.slice(0, anchorIdx + anchor.length);
const after = content.slice(anchorIdx + anchor.length);

const addition = `

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

fs.writeFileSync('script.js', before + addition + after, 'utf8');
console.log('Successfully patched getFilteredSchemes in script.js!');
