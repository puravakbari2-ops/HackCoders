const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json, text/plain, */*'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', reject);
    });
}

async function run() {
    // 1. Get buildId
    const page = await fetchUrl('https://www.myscheme.gov.in/schemes/pmjdy');
    const match = page.data.match(/"buildId":"([^"]+)"/);
    if (!match) {
        console.log('No buildId found');
        return;
    }
    const buildId = match[1];
    console.log('Got buildId:', buildId);

    // 2. Fetch _next/data
    const dataUrl = `https://www.myscheme.gov.in/_next/data/${buildId}/schemes/pmjdy.json`;
    console.log('Fetching:', dataUrl);
    const res = await fetchUrl(dataUrl);
    console.log('Status:', res.status, 'Length:', res.data.length);
    if (res.status === 200) {
        try {
            const json = JSON.parse(res.data);
            console.log('Root keys:', Object.keys(json));
            console.log('pageProps keys:', Object.keys(json.pageProps || {}));
            const d = json.pageProps?.schemeData || json.pageProps?.data || json.pageProps;
            console.log('Scheme Details Preview:', JSON.stringify(d).slice(0, 1000));
        } catch(e) {
            console.error('JSON parse err:', e.message);
        }
    } else {
        console.log('Response body preview:', res.data.slice(0, 500));
    }
}

run();
