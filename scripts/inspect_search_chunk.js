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
    const html = await fetchUrl('https://www.myscheme.gov.in/search');
    const srcs = [];
    const re = /<script[^>]+src=["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) srcs.push(m[1]);
    const searchChunk = srcs.find(s => s.includes('search'));
    console.log('Search chunk:', searchChunk);
    if (searchChunk) {
        const full = searchChunk.startsWith('http') ? searchChunk : `https://www.myscheme.gov.in${searchChunk}`;
        const code = await fetchUrl(full);
        console.log('Search chunk length:', code.length);
        const apis = code.match(/\/schemes\/v6\/public\/[a-zA-Z0-9_\-\/]+/g) || [];
        console.log('Matched endpoints in search chunk:', Array.from(new Set(apis)));
        const queries = code.match(/["']https:\/\/api\.myscheme\.gov\.in[^"']+["']/g) || [];
        console.log('API queries in search chunk:', Array.from(new Set(queries)));
    }
}

run();
