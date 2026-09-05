const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function testSearch(keyword) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&keyword=${encodeURIComponent(keyword)}&from=0&size=5`;
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
                    resolve({ error: e.message, raw: data });
                }
            });
        }).on('error', err => resolve({ error: err.message }));
    });
}

async function run() {
    const kws = ['PMJDY', 'PMJJBY', 'PMSBY', 'Atal Pension', 'PM KISAN', 'Fasal Bima'];
    for (const kw of kws) {
        const res = await testSearch(kw);
        const items = res?.data?.hits?.items || [];
        console.log(`Keyword: "${kw}" -> Found: ${items.length}`);
        if (items.length > 0) {
            console.log(`  -> Slug: ${items[0].slug} | Title: ${items[0].fields?.schemeName}`);
        }
    }
}

run();
