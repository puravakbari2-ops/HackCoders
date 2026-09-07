const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function searchMyScheme(keyword = '') {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&q=%5B%5D&keyword=${encodeURIComponent(keyword)}&sort=relevance&from=0&size=5`;
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch(e) {
                    resolve({ error: e.message, raw: data });
                }
            });
        }).on('error', err => resolve({ error: err.message }));
    });
}

async function run() {
    console.log('Searching for "Pradhan Mantri Jeevan Jyoti"...');
    const res = await searchMyScheme('Pradhan Mantri Jeevan Jyoti');
    console.log('Status code:', res?.statusCode);
    const items = res?.data?.hits?.items || [];
    console.log('Total found:', items.length);
    for (const item of items) {
        console.log(`- Slug: ${item.slug} | Name: ${item.fields?.schemeName} | Ministry: ${item.fields?.nodalMinistryName}`);
    }
}

run();
