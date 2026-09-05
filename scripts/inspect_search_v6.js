const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        });
        req.on('error', () => resolve(''));
    });
}

async function run() {
    const code = await fetchUrl('https://cdn.myscheme.in/_next/static/chunks/pages/_app-cc093557c6b9d45e.js');
    const idx = code.indexOf('/search/v6');
    console.log(code.slice(Math.max(0, idx - 100), Math.min(code.length, idx + 800)));
}

run();
