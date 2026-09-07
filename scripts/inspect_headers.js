const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

async function run() {
    const slugUrl = 'https://cdn.myscheme.in/_next/static/chunks/pages/schemes/%5Bslug%5D-e3ed95a1bb1f9ccc.js';
    const code = await fetchUrl(slugUrl);
    const idx = code.indexOf('tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc');
    console.log(code.slice(idx - 100, idx + 1500));
}

run();
