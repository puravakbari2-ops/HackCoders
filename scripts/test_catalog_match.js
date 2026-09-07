const fs = require('fs');
const path = require('path');

const localPath = path.join(__dirname, '..', 'backend', 'data', 'schemes.json');
const catalogPath = path.join(__dirname, '..', 'backend', 'data', 'myscheme_catalog.json');

const localSchemes = JSON.parse(fs.readFileSync(localPath, 'utf8'));
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

function clean(str = '') {
    return str.toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getKeywords(title = '') {
    return clean(title)
        .replace(/\b(yojana|yojna|scheme|mission|pariyojana|pradhan|mantri|pm|central|state|national|portal|for|and|the|of|in|to)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(w => w.length > 2);
}

let matchedCount = 0;
const matched = [];
const unmatched = [];

for (const s of localSchemes) {
    let match = null;
    let matchType = '';

    // Check acronyms inside parentheses
    const allParens = [...s.title.matchAll(/\(([^)]+)\)/g)].map(m => m[1]);
    for (const p of allParens) {
        const clP = clean(p);
        const exact = catalog.find(c => clean(c.shortTitle) === clP || clean(c.slug) === clP);
        if (exact) {
            match = exact;
            matchType = 'paren_exact';
            break;
        }
    }

    // Check primary title without parens
    if (!match) {
        const titleNoParens = clean(s.title.replace(/\([^)]*\)/g, ''));
        const exact = catalog.find(c => {
            const cT = clean(c.title.replace(/\([^)]*\)/g, ''));
            return cT === titleNoParens || cT.includes(titleNoParens) || titleNoParens.includes(cT);
        });
        if (exact) {
            match = exact;
            matchType = 'title_contain';
        }
    }

    // Keyword matching
    if (!match) {
        const kws = getKeywords(s.title);
        if (kws.length > 0) {
            let bestScore = 0;
            let bestCandidate = null;

            for (const c of catalog) {
                // If state specified, check state
                if (s.state && s.state !== 'All India') {
                    const cState = Array.isArray(c.state) ? c.state.join(' ') : (c.state || '');
                    if (!cState.toLowerCase().includes(s.state.toLowerCase()) && !cState.toLowerCase().includes('all')) {
                        continue;
                    }
                }

                const cFull = clean(c.title + ' ' + (c.shortTitle || '') + ' ' + (c.slug || ''));
                let hits = 0;
                for (const k of kws) {
                    if (cFull.includes(k)) hits++;
                }
                const score = hits / kws.length;
                if (score > 0.5 && score > bestScore) {
                    bestScore = score;
                    bestCandidate = c;
                }
            }

            if (bestCandidate && bestScore >= 0.5) {
                match = bestCandidate;
                matchType = `keyword_match_${Math.round(bestScore * 100)}%`;
            }
        }
    }

    if (match) {
        matchedCount++;
        matched.push({ id: s.id, local: s.title, matched: match.title, slug: match.slug, matchType });
    } else {
        unmatched.push({ id: s.id, title: s.title, state: s.state });
    }
}

console.log(`Total matched: ${matchedCount} / ${localSchemes.length} (${Math.round(matchedCount / localSchemes.length * 100)}%)`);
console.log(`Unmatched: ${unmatched.length}`);
console.log(`\nSample newly matched items:`);
matched.filter(m => [11, 19, 20, 21, 34, 39, 48, 50].includes(parseInt(m.id))).forEach(m => {
    console.log(`[${m.id}] "${m.local}" -> "${m.matched}" (${m.slug})`);
});
