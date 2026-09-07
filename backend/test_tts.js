const https = require('https');
const text = encodeURIComponent('ખેડૂત માટે સ્કીમ');
const url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8&q=' + text + '&tl=gu&client=gtx&sl=gu';
const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log('Status:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('Content-Length:', res.headers['content-length']);
    console.log('CORS header:', res.headers['access-control-allow-origin'] || '(NONE — will be BLOCKED by browsers)');
    let bytes = 0;
    res.on('data', chunk => bytes += chunk.length);
    res.on('end', () => console.log('Total audio bytes received:', bytes));
});
req.on('error', e => console.error('Error:', e.message));
req.end();
