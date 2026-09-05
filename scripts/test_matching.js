const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function searchMyScheme(keyword) {
    return new Promise((resolve) => {
        const cleanKw = keyword.replace(/\([^)]*\)/g, '').trim();
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&q=%5B%5D&keyword=${encodeURIComponent(cleanKw)}&sort=relevance&from=0&size=3`;
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json?.data?.hits?.items || []);
                } catch(e) {
                    resolve([]);
                }
            });
        }).on('error', () => resolve([]));
    });
}

function fetchSchemeDetails(slug) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/schemes/v6/public/schemes?slug=${slug}&lang=en`;
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    const raw = fs.readFileSync(path.join(__dirname, '..', 'backend', 'data', 'schemes.json'), 'utf8');
    const schemes = JSON.parse(raw);

    console.log(`Testing first 10 schemes...`);
    for (let i = 0; i < 10; i++) {
        const s = schemes[i];
        console.log(`\n[${i + 1}/10] Testing: "${s.title}"`);
        
        // Try acronym first if present, e.g. PMJDY, PMJJBY
        const acronymMatch = s.title.match(/\(([^)]+)\)/);
        let items = [];
        if (acronymMatch) {
            items = await searchMyScheme(acronymMatch[1]);
        }
        if (items.length === 0) {
            items = await searchMyScheme(s.title);
        }

        if (items.length > 0) {
            const best = items[0];
            console.log(`  -> Matched slug: ${best.slug} | Name: ${best.fields?.schemeName}`);
            const details = await fetchSchemeDetails(best.slug);
            const content = details?.data?.en?.schemeContent;
            console.log(`  -> Got details! Desc: ${Boolean(content?.detailedDescription_md)}, Benefits: ${Boolean(content?.benefits_md)}`);
        } else {
            console.log(`  -> No match found`);
        }
    }
}

run();
