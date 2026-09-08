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
            nextBtn.innerHTML = '<i class="fas fa-brain fa-spin"></i> AI Analyzing Profile...';
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

    // ── Recommendation Engine: RAG + LLM Pipeline with Fallbacks ─────────────
    async function fetchRecommendations(filtersOverride) {
        window._lastRagData = null;
        // Use any overriding filters passed directly, else use the active filter module state
        const activeFilters = filtersOverride || (window.FilterModule ? window.FilterModule.getActive() : {});
        const hasFilters    = activeFilters && Object.keys(activeFilters).length > 0;

        // 1. Try RAG + LLM Pipeline Endpoint (Primary AI Layer)
        try {
            const controller = new AbortController();
            const timeoutId  = setTimeout(() => controller.abort(), 35000); // extended for larger filtered sets
            const res = await fetch(`${API_BASE}/rag/query`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                    profile: formData,
                    filters: hasFilters ? activeFilters : undefined
                }),
                signal:  controller.signal
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const json = await res.json();
                if (json.success && Array.isArray(json.recommendations)) {
                    window._lastRagData = json;
                    return json.recommendations;
                }
            }
        } catch (e) {
            console.info('RAG Pipeline offline or timed out; trying rule recommendation endpoint:', e.message);
        }

        // 2. Try standard backend recommend endpoint
        try {
            const controller = new AbortController();
            const timeoutId  = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${API_BASE}/schemes/recommend`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(formData),
                signal:  controller.signal
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    let data = json.data;
                    // Client-side post-filter if backend filters not supported on this endpoint
                    if (hasFilters && window.FilterModule) {
                        const filteredIds = new Set(
                            (await fetchFilteredIds(activeFilters))
                        );
                        data = data.filter(s => filteredIds.has(String(s.id)));
                    }
                    return data;
                }
            }
        } catch (e) {
            console.info('JanSahay Backend API offline or timed out; running client-side RuleEngine matching:', e.message);
        }

        // 3. Client-side RuleEngine matching (Zero network fallback)
        if (window.RuleEngine && typeof window.RuleEngine.matchSchemes === 'function') {
            const allSchemes = (window.AppData && window.AppData.SAMPLE_SCHEMES) ? window.AppData.SAMPLE_SCHEMES : [];
            let matched = window.RuleEngine.matchSchemes(formData, allSchemes, {
                minScore: 70,
                maxResults: null
            });
            // Client-side filter fallback
            if (hasFilters) {
                try {
                    const filteredIds = new Set(await fetchFilteredIds(activeFilters));
                    matched = matched.filter(s => filteredIds.has(String(s.id)));
                } catch (_) {}
            }
            return matched;
        }

        return [];
    }

    // Helper: get filtered IDs from backend (used as fallback filter for non-RAG endpoints)
    async function fetchFilteredIds(filters) {
        try {
            const resp = await fetch(`${API_BASE}/filter/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });
            if (resp.ok) {
                const d = await resp.json();
                return d.schemeIds || [];
            }
        } catch (_) {}
        return [];
    }

    // ── Results Page ──────────────────────────────────────────
    function showResults(schemes) {
        document.querySelector('main').style.display = 'none';
        document.getElementById('footer').style.display = 'none';
        resultsPage.style.display = 'block';
        window.scrollTo(0, 0);
        renderResults(schemes);

        // Init filter module once results are shown
        if (window.FilterModule) {
            window.FilterModule.init();
        }
    }

    backToHome && backToHome.addEventListener('click', () => {
        resultsPage.style.display = 'none';
        document.querySelector('main').style.display = '';
        document.getElementById('footer').style.display = '';
    });

    function renderResults(schemes) {
        const summary = document.getElementById('resultsSummary');
        const profileSummaryText = (window.RuleEngine && typeof window.RuleEngine.getProfileSummary === 'function')
            ? window.RuleEngine.getProfileSummary(formData)
            : '';

        const centralCount = schemes.filter(s => s.type === 'central').length;
        const stateCount = schemes.filter(s => s.type === 'state').length;

        const ragData = window._lastRagData;
        const aiSummaryHtml = (ragData && ragData.summary) ? `
            <div class="ai-summary-banner" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.08)); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 14px 18px; margin-top: 14px; margin-bottom: 8px;">
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
                    <div style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--primary); font-size: 0.95rem;">
                        <i class="fas fa-brain"></i> AI Eligibility Assessment
                        <span style="font-size: 0.72rem; background: rgba(99,102,241,0.2); color: #818cf8; padding: 2px 8px; border-radius: 12px; font-weight: 600; border: 1px solid rgba(99,102,241,0.3);">RAG + Gemini 3.5</span>
                    </div>
                    <span style="font-size:0.75rem; color:var(--text-secondary);"><i class="fas fa-check-double" style="color:var(--emerald);margin-right:4px;"></i>${ragData.pipeline || 'Rule Engine → RAG → LLM'}</span>
                </div>
                <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.55;">${ragData.summary}</div>
            </div>
        ` : '';

        // Filter stats banner
        const filterStats = ragData?.filterStats;
        const filterStatsBanner = (filterStats && filterStats.filtersApplied) ? `
            <div class="filter-stats-banner">
                <i class="fas fa-filter"></i>
                <span>Filtered: <strong>${filterStats.afterFilter}</strong> of ${filterStats.totalSchemes} schemes matched your filters</span>
                <span class="filter-stats-filters">${(filterStats.activeFilters || []).join(' • ')}</span>
            </div>
        ` : '';

        summary.innerHTML = `
            <div class="results-count-row">
                <div class="results-count">
                    <span>${schemes.length} Schemes Found</span>
                    ${profileSummaryText ? `<span style="display:block;font-size:0.95rem;font-weight:400;color:var(--text-secondary);margin-top:4px;"><i class="fas fa-user-check" style="color:var(--emerald);margin-right:6px;"></i>Matched profile: ${profileSummaryText}</span>` : ''}
                </div>
                <button class="filter-btn" id="mainFilterBtn" onclick="window.FilterModule && window.FilterModule.open()" aria-label="Open filter panel">
                    <i class="fas fa-sliders"></i> Filter
                </button>
            </div>
            ${filterStatsBanner}
            ${aiSummaryHtml}
            <div class="results-filters" style="margin-top:14px;">
                <div class="filter-chip active" onclick="filterResults('all', this)">All Schemes (${schemes.length})</div>
                <div class="filter-chip" onclick="filterResults('central', this)">Central (${centralCount})</div>
                <div class="filter-chip" onclick="filterResults('state', this)">State (${stateCount})</div>
            </div>
        `;

        // Update filter button state and chips
        if (window.FilterModule) {
            window.FilterModule.updateButton();
            window.FilterModule.renderChips();
        }

        const grid = document.getElementById('resultsGrid');
        grid.innerHTML = schemes.length ? schemes.map(s => schemeCard(s)).join('') : `
            <div style="text-align:center;padding:3.5rem 1.5rem;color:var(--text-secondary);max-width:600px;margin:0 auto;">
                <i class="fas fa-filter-circle-xmark" style="font-size:3.5rem;margin-bottom:1.25rem;color:var(--amber);opacity:0.75;"></i>
                <h3 style="color:var(--text-primary);font-size:1.4rem;margin-bottom:0.5rem;">No Schemes Found</h3>
                <p style="font-size:0.95rem;line-height:1.6;color:var(--text-secondary);">
                    ${window.FilterModule && window.FilterModule.hasActive()
                        ? 'No government schemes match all your selected filters. Try removing one or more filters.'
                        : 'No active schemes matched the selected profile. Try adjusting your criteria.'}
                </p>
                ${window.FilterModule && window.FilterModule.hasActive() ? `
                    <button onclick="window.FilterModule.clearAll()" style="margin-top:1rem;padding:10px 24px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;">
                        <i class="fas fa-rotate-left"></i> Clear Filters
                    </button>` : ''}
            </div>`;

        // Store for type filter chips
        window._allResults = schemes;
    }

    // Expose renderResults globally for main.js event handler and filter module
    window._renderResults = renderResults;

    // Re-run recommendations with a given filter set (called by FilterModule)
    window._rerunWithFilters = async function(filters) {
        // Show loading state on the grid
        const grid = document.getElementById('resultsGrid');
        if (grid) {
            grid.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-secondary);"><i class="fas fa-brain fa-spin" style="font-size:2rem;color:var(--primary);margin-bottom:1rem;"></i><p>Re-ranking with filters...</p></div>`;
        }
        const schemes = await fetchRecommendations(filters);
        renderResults(schemes);
    };

    function schemeCard(s) {
        const scoreVal = s.matchScore || s.baseMatchScore || 75;
        const match = `${scoreVal}%`;
        const quality = s.matchQuality || (scoreVal >= 90 ? { label: 'Excellent Match', color: '#10b981' } : (scoreVal >= 75 ? { label: 'Good Match', color: '#22c55e' } : { label: 'Eligible Match', color: '#3b82f6' }));
        const docs  = s.documents ? s.documents.slice(0, 3).map(d => `<li>${d}</li>`).join('') : '';

        const aiReasonHtml = s.matchReason ? `
            <div class="result-card-reason" style="margin: 10px 0; padding: 10px 12px; background: rgba(99, 102, 241, 0.08); border-left: 3px solid #6366f1; border-radius: 6px; font-size: 0.83rem; color: var(--text-primary); line-height: 1.45;">
                <div style="color: #6366f1; font-weight: 600; display: flex; align-items: center; gap: 5px; font-size: 0.78rem; margin-bottom: 3px;">
                    <i class="fas fa-wand-magic-sparkles"></i> AI Eligibility Evidence
                </div>
                <div>${s.matchReason}</div>
            </div>
        ` : '';

        return `
        <div class="result-card" data-type="${s.type}" onclick="if(!event.target.closest('.result-card-link, .result-card-view-btn')) window.location.href='scheme-details.html?id=${s.id}';" style="cursor:pointer;" tabindex="0" role="button" aria-label="View details for ${s.title}">
            <div class="result-card-header">
                <div class="result-card-badge ${s.type === 'central' ? 'badge-central' : 'badge-state'}">
                    <i class="fas ${s.type === 'central' ? 'fa-landmark' : 'fa-map-location-dot'}"></i>
                    ${s.type === 'central' ? 'Central' : (s.state || 'State')}
                </div>
                <div class="result-eligibility" style="color:${quality.color || 'inherit'};">
                    <i class="fas fa-check-circle"></i> ${match} Match
                </div>
            </div>
            <a href="scheme-details.html?id=${s.id}" class="result-card-title-link" onclick="event.stopPropagation();">
                <div class="result-card-title">${s.title}</div>
            </a>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> ${s.ministry}</div>
            ${aiReasonHtml}
            <p class="result-card-benefits">${s.benefits}</p>
            ${docs ? `<div class="result-docs"><strong><i class="fas fa-file-alt"></i> Docs:</strong><ul>${docs}</ul></div>` : ''}
            <div class="result-card-tags">${(s.tags || []).map(t => `<span class="result-tag">${t}</span>`).join('')}</div>
            <div class="result-card-footer">
                <div class="result-card-actions">
                    <a href="scheme-details.html?id=${s.id}" class="result-card-view-btn" onclick="event.stopPropagation();">
                        <i class="fas fa-circle-info"></i> View Details
                    </a>
                    <a href="${(s.applyLink && s.applyLink !== '#') ? s.applyLink : 'https://www.myscheme.gov.in/'}" target="_blank" rel="noopener noreferrer" class="result-card-link" title="Apply on official portal" onclick="event.stopPropagation();">
                        Apply Now <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <div class="result-match-score" style="color:${quality.color || 'inherit'};"><i class="fas fa-star"></i> ${match} ${quality.label ? `· ${quality.label}` : 'Match'}</div>
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
