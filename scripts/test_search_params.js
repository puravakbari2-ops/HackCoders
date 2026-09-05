const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function testSearch(params) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?${params}`;
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
                    resolve(JSON.parse(data));
                } catch(e) {
                    resolve({ error: e.message, raw: data });
                }
            });
        }).on('error', err => resolve({ error: err.message }));
    });
}

async function run() {
    const tests = [
        'lang=en&q=%5B%5D&keyword=&from=0&size=5',
        'lang=en&keyword=PMJDY&from=0&size=5',
        'lang=en&q=%5B%5D&keyword=Jeevan&from=0&size=5',
        'lang=en&from=0&size=5'
    ];
    for (const t of tests) {
        const res = await testSearch(t);
        const count = res?.data?.hits?.items?.length ?? res?.data?.hits?.total?.value ?? 0;
        console.log(`Params: ${t} -> Total items: ${count}`);
        if (res?.data?.hits?.items?.length > 0) {
            console.log('Sample item:', res.data.hits.items[0]);
        }
    }
}

run();
