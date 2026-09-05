const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function fetchPage(from, size = 100) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&from=${from}&size=${size}`;
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const j = JSON.parse(data);
                    resolve(j?.data?.hits?.items || []);
                } catch(e) {
                    resolve([]);
                }
            });
        }).on('error', () => resolve([]));
    });
}

async function run() {
    const outPath = path.join(__dirname, '..', 'backend', 'data', 'myscheme_catalog.json');
    if (fs.existsSync(outPath)) {
        const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
        if (existing.length >= 4000) {
            console.log(`Catalog already downloaded with ${existing.length} schemes!`);
            return;
        }
    }

    console.log('Downloading complete myScheme catalog (4,772 schemes)...');
    const allItems = [];
    const totalSchemes = 4772;
    const pageSize = 100;
    const totalPages = Math.ceil(totalSchemes / pageSize);

    for (let page = 0; page < totalPages; page++) {
        const from = page * pageSize;
        const items = await fetchPage(from, pageSize);
        if (!items || items.length === 0) {
            console.log(`Page ${page + 1}: empty, stopping.`);
            break;
        }
        allItems.push(...items);
        if ((page + 1) % 5 === 0 || page === totalPages - 1) {
            console.log(`Progress: Page ${page + 1}/${totalPages} (${allItems.length} schemes)`);
        }
        await new Promise(r => setTimeout(r, 120));
    }

    console.log(`Total collected: ${allItems.length}`);
    const catalog = allItems.map(it => ({
        id: it.id,
        slug: it.fields?.slug,
        title: (it.fields?.schemeName || '').trim(),
        shortTitle: (it.fields?.schemeShortTitle || '').trim(),
        ministry: (it.fields?.nodalMinistryName || '').trim(),
        state: it.fields?.beneficiaryState || [],
        level: it.fields?.level || '',
        category: it.fields?.schemeCategory || [],
        briefDescription: (it.fields?.briefDescription || '').trim(),
        tags: it.fields?.tags || []
    }));

    fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2));
    console.log(`Successfully saved ${catalog.length} schemes to ${outPath}`);
}

run();
