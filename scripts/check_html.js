const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
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
    const html = await fetchUrl('https://www.myscheme.gov.in/schemes/pmjdy');
    console.log('HTML size:', html.length);
    console.log('Includes "National Mission for Financial Inclusion":', html.includes('National Mission for Financial Inclusion'));
    console.log('Includes "Basic Savings Bank Deposit Account":', html.includes('Basic Savings Bank Deposit Account'));
    console.log('Includes "Can I Open A Joint Account":', html.includes('Can I Open A Joint Account'));
    
    // Look for script tags with JSON
    const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    console.log('Total scripts:', scripts.length);
    for (const s of scripts) {
        if (s.includes('National Mission for Financial Inclusion')) {
            console.log('Found match in script! Length:', s.length, 'Snippet:', s.slice(0, 300));
        }
    }
}

run();
