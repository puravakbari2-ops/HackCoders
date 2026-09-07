const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'backend', 'data', 'schemes.json');
const raw = fs.readFileSync(filePath, 'utf8');
const schemes = JSON.parse(raw);

console.log('Total schemes in backend/data/schemes.json:', schemes.length);
console.log('First 5 scheme titles:');
schemes.slice(0, 5).forEach((s, idx) => console.log(`${idx + 1}. [ID: ${s.id}] ${s.title} (${s.type}, ${s.state})`));

console.log('\nLast 5 scheme titles:');
schemes.slice(-5).forEach((s, idx) => console.log(`${schemes.length - 5 + idx + 1}. [ID: ${s.id}] ${s.title} (${s.type}, ${s.state})`));
