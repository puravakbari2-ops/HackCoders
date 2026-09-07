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
    for (const s of srcs) {
        if (s.includes('chunk')) {
            const full = s.startsWith('http') ? s : `https://www.myscheme.gov.in${s}`;
            const c = await fetchUrl(full);
            if (c.includes('api.myscheme.gov.in')) {
                console.log('Found api in chunk:', s);
                const matches = c.match(/https:\/\/api\.myscheme\.gov\.in[^\s"'`)]+/g) || [];
                console.log('URLs:', Array.from(new Set(matches)));
            }
        }
    }
}

run();
