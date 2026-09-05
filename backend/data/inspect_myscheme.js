const fs = require('fs');
const schemes = require('./schemes.json');

const mySchemes = schemes.filter(s => s.applyLink && s.applyLink.includes('myscheme.gov.in'));
console.log('Total schemes with myscheme links:', mySchemes.length);

const byMin = {};
mySchemes.forEach(s => {
    byMin[s.ministry] = (byMin[s.ministry] || 0) + 1;
});
console.log('Breakdown by Ministry:');
console.log(byMin);

console.log('\nFirst 20 schemes with myscheme:');
mySchemes.slice(0, 20).forEach(s => {
    console.log('[' + s.id + '] (' + s.ministry + ') ' + s.title + ' -> ' + s.applyLink);
});
