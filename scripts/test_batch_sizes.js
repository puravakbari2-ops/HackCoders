const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function testBatch(from, size) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&from=${from}&size=${size}`;
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
                    const j = JSON.parse(data);
                    resolve({ status: res.statusCode, count: j?.data?.hits?.items?.length });
                } catch(e) {
                    resolve({ status: res.statusCode, error: e.message });
                }
            });
        }).on('error', err => resolve({ error: err.message }));
    });
}

async function run() {
    for (const size of [10, 50, 100, 200]) {
        const r = await testBatch(0, size);
        console.log(`Size: ${size} -> Status: ${r.status}, Count: ${r.count}`);
    }
}

run();
