const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';

const cacheFile = path.join(__dirname, '..', 'backend', 'data', 'myscheme_details_cache.json');
let cache = {};
if (fs.existsSync(cacheFile)) {
    try { cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8')); } catch(e) {}
}

function fetchJson(url) {
    return new Promise((resolve) => {
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
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function getSchemeFullDetails(slug) {
    if (cache[slug]) return cache[slug];

    const mainRes = await fetchJson(`https://api.myscheme.gov.in/schemes/v6/public/schemes?slug=${slug}&lang=en`);
    if (!mainRes || !mainRes.data) return null;

    const data = mainRes.data;
    const id = data._id;
    const en = data.en || {};
    const content = en.schemeContent || {};

    let docs = [];
    let faqs = [];

    if (id) {
        const docsRes = await fetchJson(`https://api.myscheme.gov.in/schemes/v6/public/schemes/${id}/documents?lang=en`);
        const docItems = docsRes?.data?.en?.documents_required || [];
        docs = docItems.map(d => {
            if (typeof d === 'string') return d;
            if (d.children) {
                return d.children.map(c => (c.children ? c.children.map(x => x.text).join('') : (c.text || ''))).join(' ').trim();
            }
            return '';
        }).filter(Boolean);

        const faqsRes = await fetchJson(`https://api.myscheme.gov.in/schemes/v6/public/schemes/${id}/faqs?lang=en`);
        const faqItems = faqsRes?.data?.en?.faqs || [];
        faqs = faqItems.map(f => ({
            question: f.question,
            answer: (f.answer_md || '').trim() || (f.answer ? JSON.stringify(f.answer) : '')
        })).filter(f => f.question && f.answer);
    }

    const result = {
        slug,
        id,
        briefDescription: (content.briefDescription || '').trim(),
        detailedDescription: (content.detailedDescription_md || '').trim(),
        benefits: (content.benefits_md || '').trim(),
        exclusions: (content.exclusions_md || '').trim(),
        eligibilityCriteria: en.eligibilityCriteria || null,
        applicationProcess: en.applicationProcess || null,
        references: content.references || [],
        schemeImageUrl: content.schemeImageUrl || '',
        documents: docs,
        faqs: faqs
    };

    cache[slug] = result;
    return result;
}

async function run() {
    const localPath = path.join(__dirname, '..', 'backend', 'data', 'schemes.json');
    const catalogPath = path.join(__dirname, '..', 'backend', 'data', 'myscheme_catalog.json');
    const localSchemes = JSON.parse(fs.readFileSync(localPath, 'utf8'));
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

    function clean(str = '') {
        return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    const matchedSlugs = new Set();
    for (const s of localSchemes) {
        // parens check
        const allParens = [...s.title.matchAll(/\(([^)]+)\)/g)].map(m => m[1]);
        let m = null;
        for (const p of allParens) {
            const clP = clean(p);
            m = catalog.find(c => clean(c.shortTitle) === clP || clean(c.slug) === clP);
            if (m) break;
        }
        if (!m) {
            const titleNoParens = clean(s.title.replace(/\([^)]*\)/g, ''));
            m = catalog.find(c => {
                const cT = clean(c.title.replace(/\([^)]*\)/g, ''));
                return cT === titleNoParens || cT.includes(titleNoParens) || titleNoParens.includes(cT);
            });
        }
        if (m && m.slug) matchedSlugs.add(m.slug);
    }

    const slugList = Array.from(matchedSlugs);
    console.log(`Fetching details for ${slugList.length} unique matched myScheme slugs...`);

    let count = 0;
    for (const slug of slugList) {
        count++;
        if (cache[slug]) continue;
        try {
            const res = await getSchemeFullDetails(slug);
            if (count % 10 === 0 || count === slugList.length) {
                console.log(`Fetched [${count}/${slugList.length}] slug: ${slug} (${Boolean(res)})`);
                fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
            }
            await new Promise(r => setTimeout(r, 100));
        } catch(e) {
            console.error(`Error fetching ${slug}:`, e.message);
        }
    }

    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
    console.log(`Saved ${Object.keys(cache).length} full scheme details into ${cacheFile}`);
}

run();
