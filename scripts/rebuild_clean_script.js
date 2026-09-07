const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Header part before ALL_SCHEMES
const startMarker = 'let ALL_SCHEMES = [';
const headerIndex = scriptContent.indexOf(startMarker);
if (headerIndex === -1) {
    console.error('Could not find ALL_SCHEMES start');
    process.exit(1);
}
const headerPart = scriptContent.slice(0, headerIndex);

// Footer part after ALL_SCHEMES
const endMarker = '// Try fetching dynamically if hosted on server';
const footerIndex = scriptContent.indexOf(endMarker);
if (footerIndex === -1) {
    console.error('Could not find ALL_SCHEMES end');
    process.exit(1);
}
let footerPart = scriptContent.slice(footerIndex);

// Replace result card template in footerPart
const oldCardPattern = `        return \`
        <div class="result-card">
            <div class="result-card-header">
                <div class="result-card-badge \${scheme.type === 'central' ? 'badge-central' : 'badge-state'}">
                    \${scheme.type === 'central' ? 'Central' : (scheme.state || 'State')}
                </div>
                \${qualityBadge}
            </div>
            <div class="result-card-title">\${scheme.title}</div>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> \${scheme.ministry || 'Government of India'}</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.55;">
                \${scheme.benefits || 'Financial assistance and welfare support provided under government guidelines.'}
            </p>
            <div class="result-card-tags">
                \${(scheme.tags||[]).map(t => \`<span class="result-tag">\${t}</span>\`).join('')}
            </div>
            <div class="result-card-footer">
                <a href="\${scheme.applyLink || 'https://www.myscheme.gov.in/'}" target="_blank" rel="noopener noreferrer" class="result-card-link">Apply Now <i class="fas fa-external-link-alt"></i></a>
                \${scoreDisplay}
            </div>
        </div>\`;`;

const newCardTemplate = `        return \`
        <div class="result-card" onclick="if(!event.target.closest('.result-card-link')) window.location.href='scheme-details.html?id=\${scheme.id}';" style="cursor:pointer;" tabindex="0" role="button" aria-label="View details for \${scheme.title}">
            <div class="result-card-header">
                <div class="result-card-badge \${scheme.type === 'central' ? 'badge-central' : 'badge-state'}">
                    \${scheme.type === 'central' ? 'Central' : (scheme.state || 'State')}
                </div>
                \${qualityBadge}
            </div>
            <a href="scheme-details.html?id=\${scheme.id}" class="result-card-title-link" style="text-decoration:none; color:inherit;" onclick="event.stopPropagation();">
                <div class="result-card-title">\${scheme.title}</div>
            </a>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> \${scheme.ministry || 'Government of India'}</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.55;">
                \${scheme.benefits || 'Financial assistance and welfare support provided under government guidelines.'}
            </p>
            <div class="result-card-tags">
                \${(scheme.tags||[]).map(t => \`<span class="result-tag">\${t}</span>\`).join('')}
            </div>
            <div class="result-card-footer">
                <div class="result-card-actions">
                    <a href="scheme-details.html?id=\${scheme.id}" class="result-card-view-btn" onclick="event.stopPropagation();">
                        <i class="fas fa-circle-info"></i> View Details
                    </a>
                    <a href="\${scheme.applyLink || 'https://www.myscheme.gov.in/'}" target="_blank" rel="noopener noreferrer" class="result-card-link" onclick="event.stopPropagation();">
                        Apply Now <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                \${scoreDisplay}
            </div>
        </div>\`;`;

if (footerPart.includes(oldCardPattern)) {
    footerPart = footerPart.replace(oldCardPattern, newCardTemplate);
    console.log('Replaced old card template in footer');
} else {
    console.log('Card template already updated or slightly different, checking regex replace...');
    footerPart = footerPart.replace(/return\s*`\s*<div class="result-card"[\s\S]*?<\/div>`;/m, newCardTemplate.trim());
}

// Assemble clean script
const middlePart = `// 432 Schemes loaded from schemes-data.js or backend/data/schemes.json
let ALL_SCHEMES = (typeof window !== 'undefined' && Array.isArray(window.ALL_SCHEMES) && window.ALL_SCHEMES.length > 0)
    ? window.ALL_SCHEMES
    : [];

`;

const newScript = headerPart + middlePart + footerPart;
fs.writeFileSync(scriptPath, newScript, 'utf8');
console.log(`Updated script.js successfully! New size: ${newScript.length} bytes`);
