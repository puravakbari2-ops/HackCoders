const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
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
                    resolve({ status: res.statusCode, json: JSON.parse(data) });
                } catch(e) {
                    resolve({ status: res.statusCode, error: e.message, raw: data });
                }
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    const schemeRes = await fetchJson('https://api.myscheme.gov.in/schemes/v6/public/schemes?slug=pmjdy&lang=en');
    const en = schemeRes.json?.data?.en;
    console.log('Keys in data.en:', Object.keys(en || {}));
    console.log('schemeBasicInfo:', en?.schemeBasicInfo);
    console.log('Keys in schemeContent:', Object.keys(en?.schemeContent || {}));
    if (en?.schemeContent) {
        for (const k of Object.keys(en.schemeContent)) {
            console.log(`-- ${k} sample:`, JSON.stringify(en.schemeContent[k]).slice(0, 150));
        }
    }
    
    // Also check documents and faqs structure
    const id = schemeRes.json?.data?._id;
    const docsRes = await fetchJson(`https://api.myscheme.gov.in/schemes/v6/public/schemes/${id}/documents?lang=en`);
    console.log('Docs keys:', Object.keys(docsRes.json?.data?.en || {}));
    console.log('Docs sample:', JSON.stringify(docsRes.json?.data?.en?.documents_required).slice(0, 300));

    const faqsRes = await fetchJson(`https://api.myscheme.gov.in/schemes/v6/public/schemes/${id}/faqs?lang=en`);
    console.log('FAQs count:', faqsRes.json?.data?.en?.faqs?.length);
    console.log('FAQs sample:', JSON.stringify(faqsRes.json?.data?.en?.faqs?.[0]));
}

run();
