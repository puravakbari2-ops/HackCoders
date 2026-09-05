const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

const anchor = 'result-card-link" title="Apply on official portal">Apply Now';
const idx = s.indexOf(anchor);

if (idx !== -1) {
    const lineStart = s.lastIndexOf('<a href=', idx);
    const lineEnd = s.indexOf('</a>', idx) + 4;
    const oldLine = s.substring(lineStart, lineEnd);
    console.log('Found old link:', oldLine);
    const newLine = '<a href="${(scheme.applyLink && scheme.applyLink !== \'#\') ? scheme.applyLink : \'https://www.india.gov.in/\'}" target="_blank" rel="noopener noreferrer" class="result-card-link" title="Apply on official portal">Apply Now <i class="fas fa-external-link-alt"></i></a>';
    s = s.substring(0, lineStart) + newLine + s.substring(lineEnd);
    fs.writeFileSync('script.js', s, 'utf8');
    console.log('Successfully replaced fallback in script.js!');
} else {
    console.error('Anchor not found in script.js');
}
