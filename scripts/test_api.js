const https = require('https');

function testEndpoint(url, headers = {}) {
    return new Promise((resolve) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/',
                ...headers
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                resolve({ url, status: res.statusCode, length: data.length, preview: data.slice(0, 300) });
            });
        });
        req.on('error', err => resolve({ url, error: err.message }));
    });
}

async function run() {
    const urls = [
        'https://api.myscheme.gov.in/schemes/v6/public/schemes/pmjdy',
        'https://api.myscheme.gov.in/schemes/v6/public/schemes?slug=pmjdy',
        'https://api.myscheme.gov.in/schemes/v6/public/schemes?id=pmjdy',
        'https://api.myscheme.gov.in/schemes/v6/public/schemes'
    ];

    for (const u of urls) {
        const r = await testEndpoint(u);
        console.log(`URL: ${r.url} -> Status: ${r.status}, Preview: ${r.preview}`);
    }
}

run();
