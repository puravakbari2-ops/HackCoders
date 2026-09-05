const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('schemes-data.js', 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const schemes = sandbox.window.ALL_SCHEMES;

// Extract mdToHtml and renderApplicationProcess from scheme-details.js
const detailsJsCode = fs.readFileSync('scheme-details.js', 'utf8');

// Test mdToHtml
function mdToHtml(md = '') {
    if (!md) return '';
    let html = md
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h4 class="details-heading-3">$1</h4>')
        .replace(/## (.*?)\n/g, '<h3 class="details-heading-2">$1</h3>')
        .replace(/# (.*?)\n/g, '<h2 class="details-heading-1">$1</h2>')
        .replace(/^> (.*?)$/gm, '<blockquote class="details-quote">$1</blockquote>')
        .replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>')
        .replace(/^\s*\d+\.\s+(.*?)$/gm, '<li>$1</li>');

    // Wrap continuous <li> into <ul>
    html = html.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gs, '<ul class="details-list">$1</ul>');
    
    // Convert newlines to paragraphs
    const paragraphs = html.split(/\n{2,}/).map(p => {
        p = p.trim();
        if (!p) return '';
        if (p.startsWith('<ul') || p.startsWith('<h') || p.startsWith('<blockquote')) return p;
        return `<p class="details-para">${p.replace(/\n/g, '<br>')}</p>`;
    }).filter(Boolean);

    return paragraphs.join('');
}

function renderApplicationProcess(processData, applyLink) {
    if (!processData) {
        return `<div class="step-card">
            <div class="step-badge"><i class="fas fa-arrow-up-right-from-square"></i></div>
            <div class="step-content">
                <h4>Online Application Portal</h4>
                <p>Citizens can apply directly via the official portal.</p>
                <a href="${applyLink || '#'}" target="_blank" rel="noopener noreferrer" class="btn-step-link">Open Official Portal <i class="fas fa-external-link-alt"></i></a>
            </div>
        </div>`;
    }

    if (Array.isArray(processData)) {
        return processData.map((channel, cIdx) => {
            const mode = channel.mode || `Application Channel ${cIdx + 1}`;
            const url = channel.url || applyLink || '#';
            let stepsHtml = '';

            if (Array.isArray(channel.steps)) {
                stepsHtml = channel.steps.map(step => `
                    <div class="process-step-item">
                        <div class="step-number-pill">${step.stepNumber || '•'}</div>
                        <div class="step-details">
                            <h5 class="step-title">${step.title || 'Instruction'}</h5>
                            <p class="step-desc">${mdToHtml(step.description || '')}</p>
                        </div>
                    </div>
                `).join('');
            } else if (Array.isArray(channel.process)) {
                // Parse nested children from myScheme format
                const rawText = channel.process.map(item => {
                    if (item.children) {
                        return item.children.map(c => {
                            if (c.children) return c.children.map(x => x.text || '').join('');
                            return c.text || '';
                        }).join(' ');
                    }
                    return '';
                }).filter(Boolean).join('\n\n');

                stepsHtml = `<div class="process-raw-box">${mdToHtml(rawText || 'Follow official instructions at designated centres.')}</div>`;
            } else if (typeof channel.process === 'string') {
                stepsHtml = `<div class="process-raw-box">${mdToHtml(channel.process)}</div>`;
            }

            return `
                <div class="channel-card">
                    <div class="channel-header">
                        <div class="channel-mode"><i class="fas ${mode.toLowerCase().includes('offline') ? 'fa-building' : 'fa-laptop'}"></i> ${mode}</div>
                        ${url && url !== '#' ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="channel-link">Visit Portal <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                    </div>
                    <div class="channel-steps-container">
                        ${stepsHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    if (typeof processData === 'string') {
        return `<div class="process-raw-box">${mdToHtml(processData)}</div>`;
    }

    return `<p>Please refer to the official application portal for step-by-step instructions.</p>`;
}

// Test rendering for scheme 1 (PMJDY)
const s1 = schemes[0];
console.log('=== Scheme 1: PMJDY ===');
console.log('Details rendered length:', mdToHtml(s1.details).length);
console.log('Benefits rendered length:', mdToHtml(s1.benefits_detailed).length);
console.log('Eligibility rendered length:', mdToHtml(s1.eligibility_detailed).length);
console.log('App Process rendered length:', renderApplicationProcess(s1.application_process, s1.applyLink).length);
console.log('App Process snippet:', renderApplicationProcess(s1.application_process, s1.applyLink).substring(0, 300));

// Test rendering for scheme 2 (PMJJBY)
const s2 = schemes[1];
console.log('\n=== Scheme 2: PMJJBY ===');
console.log('Details rendered length:', mdToHtml(s2.details).length);
console.log('Benefits rendered length:', mdToHtml(s2.benefits_detailed).length);
console.log('Eligibility rendered length:', mdToHtml(s2.eligibility_detailed).length);
console.log('App Process rendered length:', renderApplicationProcess(s2.application_process, s2.applyLink).length);
console.log('App Process snippet:', renderApplicationProcess(s2.application_process, s2.applyLink).substring(0, 300));
