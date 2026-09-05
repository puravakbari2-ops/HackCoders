const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function testEndpoint(path, method = 'GET', body = null) {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/schemes/v6/public/${path}`;
        const req = https.request(url, {
            method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/',
                'Content-Type': 'application/json'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                resolve({ path, status: res.statusCode, length: data.length, preview: data.slice(0, 300) });
            });
        });
        req.on('error', err => resolve({ path, error: err.message }));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function run() {
    const paths = [
        { path: 'search?q=pmjdy&lang=en', method: 'GET' },
        { path: 'search', method: 'POST', body: { query: 'pmjdy', lang: 'en' } },
        { path: 'schemes/search?q=pmjdy', method: 'GET' },
        { path: 'schemes?lang=en&page=1&limit=10', method: 'GET' },
        { path: 'filter', method: 'POST', body: { lang: 'en', page: 1, limit: 10 } }
    ];

    for (const p of paths) {
        const r = await testEndpoint(p.path, p.method, p.body);
        console.log(`${p.method} ${r.path} -> Status: ${r.status}, Preview: ${r.preview}`);
    }
}

run();
