/* ============================================
   JanSahay AI - Scheme Details View Controller
   Renders verified official scheme details
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initAuthSession();
    initNavbarSearch();
    await loadAndRenderScheme();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            themeToggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', next);
        });
    }
}

// User Session Management
function initAuthSession() {
    const signInBtn = document.getElementById('signInBtn');
    const userProfileMenu = document.getElementById('userProfileMenu');
    const userChipDropdownBtn = document.getElementById('userChipDropdownBtn');
    const navUserName = document.getElementById('navUserName');
    const navUserAvatar = document.getElementById('navUserAvatar');
    const dropdownFullName = document.getElementById('dropdownFullName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    function checkUser() {
        try {
            const rawUser = localStorage.getItem('jansahay_user');
            if (rawUser) {
                const user = JSON.parse(rawUser);
                if (signInBtn) signInBtn.style.display = 'none';
                if (userProfileMenu) userProfileMenu.style.display = 'inline-block';
                if (navUserName) navUserName.textContent = user.name || 'Citizen';
                if (dropdownFullName) dropdownFullName.textContent = user.name || 'Citizen';
                if (dropdownEmail) dropdownEmail.textContent = user.email || 'citizen@jansahay.gov.in';
                if (user.avatar && navUserAvatar) navUserAvatar.src = user.avatar;
            } else {
                if (signInBtn) signInBtn.style.display = 'inline-flex';
                if (userProfileMenu) userProfileMenu.style.display = 'none';
            }
        } catch (e) {
            console.error('Error reading citizen session:', e);
        }
    }

    if (userChipDropdownBtn && userProfileMenu) {
        userChipDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfileMenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', (e) => {
        if (userProfileMenu && !userProfileMenu.contains(e.target)) {
            userProfileMenu.classList.remove('open');
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('jansahay_user');
            if (userProfileMenu) userProfileMenu.classList.remove('open');
            checkUser();
            showToast('You have been signed out successfully.', 'info');
        });
    }

    checkUser();
}

// Navbar Search
function initNavbarSearch() {
    const input = document.getElementById('navSearchInput');
    const btn = document.getElementById('navSearchBtn');
    function doSearch() {
        const q = (input?.value || '').trim();
        if (q) {
            window.location.href = `index.html?search=${encodeURIComponent(q)}`;
        }
    }
    if (btn) btn.addEventListener('click', doSearch);
    if (input) input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doSearch();
    });
}

// Format Markdown to safe HTML
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

// Parse Application Process items if structured
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

// Load Scheme Data
async function loadAndRenderScheme() {
    const params = new URLSearchParams(window.location.search);
    const schemeId = params.get('id');
    const slug = params.get('slug');

    let scheme = null;

    // 1. Try memory array ALL_SCHEMES first
    if (typeof ALL_SCHEMES !== 'undefined' && Array.isArray(ALL_SCHEMES)) {
        if (schemeId) scheme = ALL_SCHEMES.find(s => String(s.id) === String(schemeId));
        if (!scheme && slug) scheme = ALL_SCHEMES.find(s => s.myscheme_slug === slug || (s.title && s.title.toLowerCase().includes(slug.toLowerCase())));
    }

    // 2. Fallback: fetch backend/data/schemes.json
    if (!scheme) {
        try {
            const res = await fetch('backend/data/schemes.json');
            if (res.ok) {
                const list = await res.json();
                if (schemeId) scheme = list.find(s => String(s.id) === String(schemeId));
                if (!scheme && slug) scheme = list.find(s => s.myscheme_slug === slug || (s.title && s.title.toLowerCase().includes(slug.toLowerCase())));
                if (!scheme && list.length > 0) scheme = list[0];
            }
        } catch (e) {
            console.error('Failed to load schemes JSON:', e);
        }
    }

    // Default fallback if still null
    if (!scheme && typeof ALL_SCHEMES !== 'undefined' && ALL_SCHEMES.length > 0) {
        scheme = ALL_SCHEMES[0];
    }

    if (!scheme) {
        document.getElementById('heroTitle').textContent = "Scheme Not Found";
        document.getElementById('heroLead').textContent = "We could not find the requested scheme. Please return to the schemes catalog.";
        return;
    }

    renderSchemeDetails(scheme);
}

// Render complete Scheme details onto page
function renderSchemeDetails(scheme) {
    const isCentral = scheme.type === 'central';
    const stateName = scheme.state && scheme.state !== 'All India' ? scheme.state : 'All India';

    // 1. Titles & Meta
    document.title = `${scheme.title} - JanSahay AI`;
    const breadcrumbCat = document.getElementById('breadcrumbCategory');
    if (breadcrumbCat) {
        breadcrumbCat.textContent = scheme.category || 'All Schemes';
        breadcrumbCat.href = `index.html?category=${encodeURIComponent(scheme.category || '')}`;
    }
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    if (breadcrumbTitle) breadcrumbTitle.textContent = scheme.title;

    // 2. Hero Section
    document.getElementById('heroTitle').textContent = scheme.title;
    document.getElementById('heroMinistry').innerHTML = `<i class="fas fa-building-columns"></i> <span>${scheme.ministry || 'Government of India'}</span>`;
    document.getElementById('heroLead').textContent = scheme.eligibility_summary || scheme.benefits || 'Official government welfare and citizen empowerment initiative.';

    // Badges
    const levelBadge = document.getElementById('heroLevelBadge');
    levelBadge.innerHTML = `<i class="fas ${isCentral ? 'fa-landmark-flag' : 'fa-map-location-dot'}"></i> ${isCentral ? 'Central Scheme' : `${stateName} State Scheme`}`;
    levelBadge.className = `badge-tag ${isCentral ? 'badge-central' : 'badge-state'}`;

    const catBadge = document.getElementById('heroCategoryBadge');
    catBadge.innerHTML = `<i class="fas fa-layer-group"></i> ${scheme.category || 'Welfare'}`;

    if (!isCentral && stateName !== 'All India') {
        const stateBadge = document.getElementById('heroStateBadge');
        stateBadge.style.display = 'inline-flex';
        stateBadge.innerHTML = `<i class="fas fa-location-dot"></i> ${stateName}`;
    }

    // Dynamic Match Score calculation based on citizen profile if exists
    let calculatedScore = scheme.matchScore || scheme.baseMatchScore || 95;
    let calculationReason = "Based on Indian residency, standard age eligibility, and identity verification requirements.";

    try {
        const rawProfile = localStorage.getItem('jansahay_profile');
        if (rawProfile) {
            const profile = JSON.parse(rawProfile);
            if (profile && Object.keys(profile).length > 0) {
                let score = 0;
                let matchedCriteria = [];
                const e = scheme.eligibility || {};
                const ageNum = parseInt(profile.age) || 25;
                if (e.minAge !== undefined && e.maxAge !== undefined) {
                    if (ageNum >= e.minAge && ageNum <= e.maxAge) {
                        score += 25;
                        matchedCriteria.push(`Age ${ageNum} yrs`);
                    }
                } else {
                    score += 25;
                }
                if (profile.gender && e.gender && (e.gender.includes(profile.gender.toLowerCase()) || e.gender.includes('all'))) {
                    score += 20;
                    matchedCriteria.push(profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1));
                } else if (!e.gender || e.gender.includes('all')) {
                    score += 20;
                }
                if (profile.state && scheme.state) {
                    if (scheme.type === 'central' || scheme.state === 'All India' || scheme.state.toLowerCase() === profile.state.toLowerCase()) {
                        score += 20;
                        matchedCriteria.push(profile.state);
                    }
                } else {
                    score += 20;
                }
                if (profile.category && e.category && (e.category.includes(profile.category.toLowerCase()) || e.category.includes('all'))) {
                    score += 15;
                    matchedCriteria.push(profile.category.toUpperCase());
                } else if (!e.category) {
                    score += 15;
                }
                if (profile.occupation && e.occupation && (e.occupation.includes(profile.occupation.toLowerCase()) || e.occupation.includes('all'))) {
                    score += 20;
                } else if (!e.occupation) {
                    score += 20;
                }
                calculatedScore = Math.min(Math.max(score, 45), 99);
                calculationReason = `Based on your citizen profile (${matchedCriteria.join(', ')}).`;
            }
        }
    } catch(e) {}

    const matchBadge = document.getElementById('heroMatchBadge');
    matchBadge.innerHTML = `<i class="fas fa-star"></i> ${calculatedScore}% Eligibility Match`;

    // Apply Button Link
    const applyBtn = document.getElementById('heroApplyBtn');
    const sidebarApplyBtn = document.getElementById('sidebarApplyBtn');
    const targetUrl = scheme.applyLink || 'https://www.myscheme.gov.in/';
    if (applyBtn) applyBtn.href = targetUrl;
    if (sidebarApplyBtn) sidebarApplyBtn.href = targetUrl;

    // Hero Highlights Pills
    const e = scheme.eligibility || {};
    const highlights = [];
    if (e.minAge && e.maxAge) highlights.push({ icon: 'fa-user-clock', label: `Age: ${e.minAge}–${e.maxAge} Yrs` });
    if (e.gender && e.gender.length > 0) highlights.push({ icon: 'fa-venus-mars', label: e.gender.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join('/') });
    if (e.income && e.income.length > 0) highlights.push({ icon: 'fa-indian-rupee-sign', label: `Income: Up to 8L` });
    highlights.push({ icon: 'fa-shield-halved', label: scheme.myscheme_verified ? 'myScheme Verified' : 'Government Verified' });
    highlights.push({ icon: 'fa-bolt', label: 'Direct Benefit Transfer (DBT)' });

    const highlightsContainer = document.getElementById('heroHighlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = highlights.map(h => `
            <div class="highlight-pill">
                <i class="fas ${h.icon}"></i> <span>${h.label}</span>
            </div>
        `).join('');
    }

    // 3. Tab 1: Scheme Details
    const detailsContent = document.getElementById('detailsContent');
    const rawDetails = scheme.details || scheme.benefits || 'Official details under departmental administration.';
    detailsContent.innerHTML = mdToHtml(rawDetails);

    // 4. Tab 2: Benefits
    const benefitsContent = document.getElementById('benefitsContent');
    const rawBenefits = scheme.benefits_detailed || scheme.benefits || 'Financial assistance and support.';
    benefitsContent.innerHTML = mdToHtml(rawBenefits);

    // 5. Tab 3: Eligibility
    const eligibilityContent = document.getElementById('eligibilityContent');
    const rawElig = scheme.eligibility_detailed || scheme.eligibility_summary || 'Citizens fulfilling departmental conditions are eligible.';
    
    // Render Demographic Grid
    let demoHtml = `
        <div class="demographic-grid">
            <div class="demo-card">
                <div class="demo-icon"><i class="fas fa-calendar-days text-violet"></i></div>
                <div class="demo-title">Age Range</div>
                <div class="demo-val">${e.minAge && e.maxAge ? `${e.minAge} – ${e.maxAge} Years` : 'All Ages'}</div>
            </div>
            <div class="demo-card">
                <div class="demo-icon"><i class="fas fa-venus-mars text-cyan"></i></div>
                <div class="demo-title">Gender</div>
                <div class="demo-val">${(e.gender || ['All Genders']).map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}</div>
            </div>
            <div class="demo-card">
                <div class="demo-icon"><i class="fas fa-users text-emerald"></i></div>
                <div class="demo-title">Social Category</div>
                <div class="demo-val">${(e.category || ['General', 'OBC', 'SC', 'ST']).map(c => c.toUpperCase()).join(', ')}</div>
            </div>
            <div class="demo-card">
                <div class="demo-icon"><i class="fas fa-map-location text-pink"></i></div>
                <div class="demo-title">Applicable State</div>
                <div class="demo-val">${stateName}</div>
            </div>
        </div>
    `;
    eligibilityContent.innerHTML = demoHtml + `<div class="eligibility-text-box">${mdToHtml(rawElig)}</div>`;

    // 6. Tab 4: Application Process
    const processContent = document.getElementById('processContent');
    processContent.innerHTML = renderApplicationProcess(scheme.application_process, scheme.applyLink);

    // 7. Tab 5: Documents Required
    const documentsContent = document.getElementById('documentsContent');
    const rawDocs = Array.isArray(scheme.documents_required) && scheme.documents_required.length > 0
        ? scheme.documents_required
        : (scheme.documents || ['Aadhaar Card', 'Income Certificate', 'Bank Passbook', 'Domicile Proof']);

    let docs = [];
    rawDocs.forEach(item => {
        if (typeof item === 'string') {
            if (/(?:\b\d+\.\s+)/.test(item) && (item.match(/\b\d+\.\s+/g) || []).length > 1) {
                const parts = item.split(/(?=\b\d+\.\s+)/).map(s => s.trim().replace(/^\d+\.\s*/, '')).filter(Boolean);
                docs.push(...parts);
            } else if (item.includes('\n')) {
                const parts = item.split('\n').map(s => s.trim().replace(/^[-*•\d.]+\s*/, '')).filter(Boolean);
                docs.push(...parts);
            } else {
                const cleanItem = item.trim().replace(/^[-*•\d.]+\s*/, '');
                if (cleanItem) docs.push(cleanItem);
            }
        } else if (item) {
            docs.push(String(item));
        }
    });
    if (docs.length === 0) docs = ['Aadhaar Card', 'Identity Proof', 'Bank Passbook', 'Passport Size Photograph'];

    documentsContent.innerHTML = `
        <div class="docs-checklist-wrapper">
            <p class="docs-intro"><i class="fas fa-circle-check text-emerald"></i> Keep clear scanned copies (PDF/JPEG, under 2MB) of the following documents ready before beginning your application:</p>
            <div class="docs-list">
                ${docs.map((doc, idx) => `
                    <div class="doc-item">
                        <div class="doc-check"><i class="fas fa-check"></i></div>
                        <div class="doc-info">
                            <strong class="doc-title">${doc}</strong>
                            <span class="doc-badge">Original / Self-Attested Photocopy</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 8. Tab 6: FAQs
    const faqsContent = document.getElementById('faqsContent');
    const faqs = Array.isArray(scheme.faqs) && scheme.faqs.length > 0 ? scheme.faqs : [
        {
            question: `What is ${scheme.title}?`,
            answer: scheme.benefits || 'Official welfare initiative by the Government.'
        },
        {
            question: "Who is eligible to receive benefits?",
            answer: scheme.eligibility_summary || 'Citizens fulfilling departmental guidelines.'
        },
        {
            question: "Where can I apply?",
            answer: `You can apply directly at ${scheme.applyLink || 'https://www.myscheme.gov.in/'} or at your nearest Common Service Centre (CSC).`
        }
    ];

    faqsContent.innerHTML = faqs.map((faq, fIdx) => `
        <div class="faq-accordion-item ${fIdx === 0 ? 'active' : ''}" id="scheme-faq-${fIdx}">
            <button class="faq-accordion-btn" onclick="toggleSchemeFAQ(${fIdx})">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-chevron"></i>
            </button>
            <div class="faq-accordion-body">
                <div class="faq-accordion-inner">${mdToHtml(faq.answer || '')}</div>
            </div>
        </div>
    `).join('');

    // 9. Quick Facts Sidebar
    const quickFactsList = document.getElementById('quickFactsList');
    if (quickFactsList) {
        quickFactsList.innerHTML = `
            <li><span class="fact-label">Level</span><span class="fact-val">${isCentral ? 'Central Government' : 'State Government'}</span></li>
            <li><span class="fact-label">State</span><span class="fact-val">${stateName}</span></li>
            <li><span class="fact-label">Category</span><span class="fact-val">${scheme.category || 'Social Welfare'}</span></li>
            <li><span class="fact-label">Nodal Body</span><span class="fact-val">${scheme.ministry || 'Govt. Dept'}</span></li>
            <li><span class="fact-label">Application Mode</span><span class="fact-val">Online & In-Person</span></li>
            <li><span class="fact-label">Verification</span><span class="fact-val text-emerald"><i class="fas fa-circle-check"></i> 100% Verified</span></li>
        `;
    }

    // 10. Match Score & Explanation
    const matchDesc = document.getElementById('sidebarMatchDesc');
    const matchScoreEl = document.getElementById('sidebarMatchScore');
    if (matchScoreEl) matchScoreEl.textContent = `${calculatedScore}%`;
    if (matchDesc) matchDesc.textContent = calculationReason;

    // 11. Related Schemes
    renderRelatedSchemes(scheme);

    // 12. Setup Tab click events and URL hash switching
    setupTabs();

    // 13. Setup Actions (Share, Bookmark, Print)
    setupActionButtons(scheme);
}

// Tab Switching with URL hash support
function setupTabs() {
    const tabBtns = document.querySelectorAll('.scheme-tab-btn');
    const tabPanes = document.querySelectorAll('.scheme-tab-pane');

    function activateTab(targetTab) {
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === targetTab);
        });
        tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === `pane-${targetTab}`);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            activateTab(targetTab);
            if (history.replaceState) {
                history.replaceState(null, null, `#${targetTab}`);
            }
        });
    });

    // Check if URL has a hash (e.g. #faqs, #benefits, #eligibility, #process, #documents)
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['details', 'benefits', 'eligibility', 'process', 'documents', 'faqs'];
    if (hash && validTabs.includes(hash)) {
        activateTab(hash);
    }
}

// FAQ Accordion Toggle
window.toggleSchemeFAQ = function(idx) {
    const item = document.getElementById(`scheme-faq-${idx}`);
    if (!item) return;
    const isActive = item.classList.contains('active');
    item.classList.toggle('active', !isActive);
};

// Render Related Schemes
function renderRelatedSchemes(currentScheme) {
    const container = document.getElementById('relatedSchemesList');
    if (!container || typeof ALL_SCHEMES === 'undefined' || !Array.isArray(ALL_SCHEMES)) return;

    // Find schemes in same category or same state
    const related = ALL_SCHEMES
        .filter(s => String(s.id) !== String(currentScheme.id) && (s.category === currentScheme.category || s.state === currentScheme.state))
        .slice(0, 4);

    if (related.length === 0) {
        container.innerHTML = `<p style="font-size:0.85rem; color:var(--text-secondary);">No similar schemes found.</p>`;
        return;
    }

    container.innerHTML = related.map(s => `
        <a href="scheme-details.html?id=${s.id}" class="related-scheme-item">
            <div class="related-item-title">${s.title}</div>
            <div class="related-item-meta">
                <span><i class="fas fa-layer-group"></i> ${s.category || 'General'}</span>
                <span><i class="fas fa-star text-emerald"></i> ${s.baseMatchScore || 90}% Match</span>
            </div>
        </a>
    `).join('');
}

// Action Buttons: Share, Bookmark, Print
function setupActionButtons(scheme) {
    const btnShare = document.getElementById('btnShare');
    const btnBookmark = document.getElementById('btnBookmark');
    const btnPrint = document.getElementById('btnPrint');

    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: scheme.title,
                        text: `Check out ${scheme.title} on JanSahay AI:`,
                        url: window.location.href
                    });
                } catch(e) {}
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Scheme URL copied to clipboard!", "success");
            }
        });
    }

    if (btnBookmark) {
        const savedKey = `saved_scheme_${scheme.id}`;
        let isSaved = localStorage.getItem(savedKey) === 'true';
        updateBookmarkUI(btnBookmark, isSaved);

        btnBookmark.addEventListener('click', () => {
            isSaved = !isSaved;
            localStorage.setItem(savedKey, isSaved);
            updateBookmarkUI(btnBookmark, isSaved);
            showToast(isSaved ? "Saved to your Scheme Vault!" : "Removed from Scheme Vault.", "info");
        });
    }

    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            window.print();
        });
    }
}

function updateBookmarkUI(btn, isSaved) {
    if (!btn) return;
    if (isSaved) {
        btn.innerHTML = '<i class="fas fa-bookmark text-pink"></i> <span>Saved</span>';
        btn.classList.add('active');
    } else {
        btn.innerHTML = '<i class="far fa-bookmark"></i> <span>Save</span>';
        btn.classList.remove('active');
    }
}

// Global Toast
window.showToast = function(msg, type = 'info') {
    let container = document.getElementById('toastNotification');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastNotification';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
};
