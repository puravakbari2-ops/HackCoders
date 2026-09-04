/* ============================================================
   JanSahay AI - Multi-Step Form Module
   Handles the "Find Schemes" modal form and results rendering
   ============================================================ */

(function () {
    'use strict';

    const { FORM_STEPS, SAMPLE_SCHEMES, API_BASE } = window.AppData;

    // DOM References
    const findSchemesBtn = document.getElementById('findSchemesBtn');
    const modalOverlay   = document.getElementById('modalOverlay');
    const modalClose     = document.getElementById('modalClose');
    const stepper        = document.getElementById('stepper');
    const formStepsEl    = document.getElementById('formSteps');
    const prevBtn        = document.getElementById('prevBtn');
    const nextBtn        = document.getElementById('nextBtn');
    const resetFormBtn   = document.getElementById('resetFormBtn');
    const resultsPage    = document.getElementById('resultsPage');
    const backToHome     = document.getElementById('backToHome');

    let currentStep = 0;
    let formData    = {};
    let isLoading   = false;

    // ── Modal Open/Close ──────────────────────────────────────
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    findSchemesBtn && findSchemesBtn.addEventListener('click', openModal);
    modalClose     && modalClose.addEventListener('click', closeModal);
    modalOverlay   && modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    // ── Stepper ───────────────────────────────────────────────
    function renderStepper() {
        let html = '';
        for (let i = 0; i < FORM_STEPS.length; i++) {
            html += `<div class="stepper-dot ${i === 0 ? 'active' : ''}" id="step-dot-${i}">${i + 1}</div>`;
            if (i < FORM_STEPS.length - 1) {
                html += `<div class="stepper-line" id="step-line-${i}"></div>`;
            }
        }
        stepper.innerHTML = html;
    }

    function updateStepper() {
        for (let i = 0; i < FORM_STEPS.length; i++) {
            const dot  = document.getElementById(`step-dot-${i}`);
            const line = i < FORM_STEPS.length - 1 ? document.getElementById(`step-line-${i}`) : null;

            dot.classList.remove('active', 'completed');
            if (i < currentStep) {
                dot.classList.add('completed');
                dot.innerHTML = '<i class="fas fa-check" style="font-size:0.6rem;"></i>';
            } else if (i === currentStep) {
                dot.classList.add('active');
                dot.textContent = i + 1;
            } else {
                dot.textContent = i + 1;
            }

            if (line) line.classList.toggle('completed', i < currentStep);
        }
    }

    // ── Form Steps Renderer ───────────────────────────────────
    function renderFormSteps() {
        formStepsEl.innerHTML = FORM_STEPS.map((step, i) => {
            let html = `<div class="form-step ${i === 0 ? 'active' : ''}" id="form-step-${i}">`;
            html += `<div class="form-label">${step.label}</div>`;

            if (step.type === 'options') {
                html += `<div class="form-options" data-group="${step.field}">`;
                step.options.forEach(opt => {
                    html += `<div class="form-option" data-field="${step.field}" data-value="${opt.value}">
                        <i class="${opt.icon}"></i>
                        <span>${opt.label}</span>
                    </div>`;
                });
                html += `</div>`;
            } else if (step.type === 'select') {
                html += `<div class="form-select-wrapper">
                    <select class="form-select" data-field="${step.field}">
                        <option value="">-- Select --</option>
                        ${step.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
                    </select>
                </div>`;
            }

            if (step.extra) {
                html += `<div class="form-label" style="margin-top:12px;">${step.extra.label}</div>`;
                if (step.extra.type === 'options') {
                    html += `<div class="form-options" data-group="${step.extra.field}">`;
                    step.extra.options.forEach(opt => {
                        html += `<div class="form-option" data-field="${step.extra.field}" data-value="${opt.value}">
                            <i class="${opt.icon}"></i>
                            <span>${opt.label}</span>
                        </div>`;
                    });
                    html += `</div>`;
                } else if (step.extra.type === 'select') {
                    const suffix = step.extra.suffix
                        ? `<span style="margin-left:8px;font-weight:500;">${step.extra.suffix}</span>` : '';
                    html += `<div class="form-select-wrapper" style="display:flex;align-items:center;gap:8px;">
                        <select class="form-select" style="max-width:200px;" data-field="${step.extra.field}">
                            <option value="">--</option>
                            ${step.extra.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
                        </select>
                        ${suffix}
                    </div>`;
                }
            }

            html += `</div>`;
            return html;
        }).join('');
    }

    // Shared formData store accessible from other modules
    window.AppData._fd = formData;

    // Event delegation for ALL form-option clicks inside formStepsEl
    formStepsEl && formStepsEl.addEventListener('click', e => {
        // Walk up to find the .form-option div (handles clicks on child <i> or <span>)
        const option = e.target.closest('.form-option');
        if (!option) return;
        const field = option.getAttribute('data-field');
        const value = option.getAttribute('data-value');
        if (!field || !value) return;
        // Deselect siblings within the same group
        const group = option.closest('.form-options');
        if (group) group.querySelectorAll('.form-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        formData[field] = value;
    });

    // Event delegation for ALL form-select changes inside formStepsEl
    formStepsEl && formStepsEl.addEventListener('change', e => {
        const select = e.target.closest('.form-select');
        if (!select) return;
        const field = select.getAttribute('data-field');
        if (field) formData[field] = select.value;
    });

    // Keep legacy global for backward compat
    window.selectFormOption = function (el, field, value) {
        const group = el.closest ? el.closest('.form-options') : el.parentElement;
        if (group) group.querySelectorAll('.form-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        formData[field] = value;
    };

    // ── Navigation ────────────────────────────────────────────
    nextBtn && nextBtn.addEventListener('click', async () => {
        if (isLoading) return;

        if (currentStep < FORM_STEPS.length - 1) {
            document.getElementById(`form-step-${currentStep}`).classList.remove('active');
            currentStep++;
            document.getElementById(`form-step-${currentStep}`).classList.add('active');
            updateStepper();
            prevBtn.style.display = 'inline-flex';
            if (currentStep === FORM_STEPS.length - 1) {
                nextBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Find Schemes <i class="fas fa-arrow-right-long"></i>';
            }
        } else {
            // Final step — fetch recommendations
            isLoading = true;
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            nextBtn.disabled  = true;

            const schemes = await fetchRecommendations();
            closeModal();
            showResults(schemes);

            isLoading        = false;
            nextBtn.disabled = false;
            nextBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Find Schemes <i class="fas fa-arrow-right-long"></i>';
        }
    });

    prevBtn && prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            document.getElementById(`form-step-${currentStep}`).classList.remove('active');
            currentStep--;
            document.getElementById(`form-step-${currentStep}`).classList.add('active');
            updateStepper();
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right-long"></i>';
            if (currentStep === 0) prevBtn.style.display = 'none';
        }
    });

    resetFormBtn && resetFormBtn.addEventListener('click', () => {
        currentStep = 0;
        formData    = {};
        window.AppData._fd = formData;

        document.querySelectorAll('.form-step').forEach((el, i) => el.classList.toggle('active', i === 0));
        document.querySelectorAll('.form-option').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.form-select').forEach(el => el.value = '');

        prevBtn.style.display = 'none';
        nextBtn.innerHTML     = 'Next <i class="fas fa-arrow-right-long"></i>';
        updateStepper();
    });

    // ── API: Fetch Recommendations ────────────────────────────
    async function fetchRecommendations() {
        try {
            const res = await fetch(`${API_BASE}/schemes/recommend`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('API error');
            const json = await res.json();
            return json.data || [];
        } catch {
            console.warn('Backend not reachable, using sample data');
            return SAMPLE_SCHEMES;
        }
    }

    // ── Results Page ──────────────────────────────────────────
    function showResults(schemes) {
        document.querySelector('main').style.display = 'none';
        document.getElementById('footer').style.display = 'none';
        resultsPage.style.display = 'block';
        window.scrollTo(0, 0);
        renderResults(schemes);
    }

    backToHome && backToHome.addEventListener('click', () => {
        resultsPage.style.display = 'none';
        document.querySelector('main').style.display = '';
        document.getElementById('footer').style.display = '';
    });

    function renderResults(schemes) {
        const summary = document.getElementById('resultsSummary');
        summary.innerHTML = `
            <div class="results-count">${schemes.length} Schemes Found</div>
            <div class="results-filters">
                <div class="filter-chip active" onclick="filterResults('all', this)">All Schemes</div>
                <div class="filter-chip" onclick="filterResults('central', this)">Central</div>
                <div class="filter-chip" onclick="filterResults('state', this)">State</div>
            </div>
        `;

        const grid = document.getElementById('resultsGrid');
        grid.innerHTML = schemes.length ? schemes.map(s => schemeCard(s)).join('') : `
            <div style="text-align:center;padding:3rem;color:var(--text-secondary);">
                <i class="fas fa-search" style="font-size:3rem;margin-bottom:1rem;opacity:0.4;"></i>
                <p>No schemes matched your profile. Try adjusting your inputs.</p>
            </div>`;

        // Store for filter
        window._allResults = schemes;
    }

    // Expose renderResults globally for main.js event handler
    window._renderResults = renderResults;

    function schemeCard(s) {
        const match = s.matchScore || s.baseMatchScore ? `${s.matchScore || s.baseMatchScore + '%'}` : 'N/A';
        const docs  = s.documents ? s.documents.slice(0, 3).map(d => `<li>${d}</li>`).join('') : '';
        return `
        <div class="result-card" data-type="${s.type}">
            <div class="result-card-header">
                <div class="result-card-badge ${s.type === 'central' ? 'badge-central' : 'badge-state'}">
                    <i class="fas ${s.type === 'central' ? 'fa-landmark' : 'fa-map-location-dot'}"></i>
                    ${s.type === 'central' ? 'Central' : (s.state || 'State')}
                </div>
                <div class="result-eligibility"><i class="fas fa-check-circle"></i> ${match} Match</div>
            </div>
            <div class="result-card-title">${s.title}</div>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> ${s.ministry}</div>
            <p class="result-card-benefits">${s.benefits}</p>
            ${docs ? `<div class="result-docs"><strong><i class="fas fa-file-alt"></i> Docs:</strong><ul>${docs}</ul></div>` : ''}
            <div class="result-card-tags">${(s.tags || []).map(t => `<span class="result-tag">${t}</span>`).join('')}</div>
            <div class="result-card-footer">
                <a href="${s.applyLink || '#'}" target="_blank" rel="noopener" class="result-card-link">
                    Apply Now <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>`;
    }

    window.filterResults = function (type, el) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        const filtered = type === 'all' ? window._allResults : window._allResults.filter(s => s.type === type);
        document.getElementById('resultsGrid').innerHTML = filtered.map(s => schemeCard(s)).join('');
    };

    // Results search
    const resultsSearchInput = document.getElementById('resultsSearchInput');
    resultsSearchInput && resultsSearchInput.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        const filtered = (window._allResults || []).filter(s =>
            s.title.toLowerCase().includes(q) || (s.tags || []).some(t => t.toLowerCase().includes(q)) || s.ministry.toLowerCase().includes(q) || (s.state && s.state.toLowerCase().includes(q))
        );
        document.getElementById('resultsGrid').innerHTML = filtered.map(s => schemeCard(s)).join('');
    });

    // ── Init ──────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        renderStepper();
        renderFormSteps();
    });

})();
