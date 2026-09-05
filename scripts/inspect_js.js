const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

async function run() {
    const slugUrl = 'https://cdn.myscheme.in/_next/static/chunks/pages/schemes/%5Bslug%5D-e3ed95a1bb1f9ccc.js';
    const scriptCode = await fetchUrl(slugUrl);
    console.log('Script length:', scriptCode.length);

    // Look for fetch or axios or API endpoints
    const matches = scriptCode.match(/["'`](https?:\/\/[^"'`]+|\/api\/[^"'`]+)["'`]/g) || [];
    console.log('All URL literals:', Array.from(new Set(matches)));

    // Look for keywords like "details", "benefits", "eligibility", "faqs", "process"
    const keywordMatches = scriptCode.match(/["']([a-zA-Z0-9_\-\/]*(?:scheme|details|benefit|eligib|doc|faq)[a-zA-Z0-9_\-\/]*)["']/gi) || [];
    console.log('Keyword matches:', Array.from(new Set(keywordMatches)).slice(0, 30));
}

run();
