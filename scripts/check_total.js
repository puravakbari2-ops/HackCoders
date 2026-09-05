const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function checkTotal() {
    return new Promise((resolve) => {
        const url = `https://api.myscheme.gov.in/search/v6/schemes?lang=en&q=%5B%5D&keyword=&from=0&size=1`;
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'x-api-key': API_KEY,
                'Origin': 'https://www.myscheme.gov.in',
                'Referer': 'https://www.myscheme.gov.in/'
            }
        }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', err => resolve({ error: err.message }));
    });
}

async function run() {
    const res = await checkTotal();
    console.log('res.data keys:', Object.keys(res?.data || {}));
    console.log('res.data.hits keys:', Object.keys(res?.data?.hits || {}));
    console.log('res.data.count:', res?.data?.count);
    console.log('res.data.total:', res?.data?.total);
    console.log('res.data:', JSON.stringify(res?.data).slice(0, 300));
}

run();
