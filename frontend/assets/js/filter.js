/* ============================================================
   JanSahay AI — Filter Module
   Manages the filter drawer, active filter state, filter chips,
   and coordinates with the RAG recommendation pipeline.

   IMPORTANT: The drawer is injected once and opens IMMEDIATELY on click.
   Closing the drawer always restores document.body scroll immediately.
   ============================================================ */

(function () {
    'use strict';

    /* ── State ─────────────────────────────────────────────── */
    let activeFilters     = {};    // Currently applied filter values
    let filterOptions     = null;  // Loaded from /api/filter/options
    let isApplying        = false;
    let optionsLoading    = false;
    let optionsLoaded     = false;

    /* ── Determine API base URL safely ──────────────────────── */
    function getApiBase() {
        if (window.AppData && window.AppData.API_BASE) {
            return window.AppData.API_BASE;
        }
        const { protocol, hostname, port } = window.location;
        const p = port ? `:${port}` : '';
        return `${protocol}//${hostname}${p}/api`;
    }

    /* ── Static fallback options (used when API is unreachable) ── */
    function getFallbackOptions() {
        return {
            states: [
                'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh',
                'Assam','Bihar','Chandigarh','Chhattisgarh',
                'Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat',
                'Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand',
                'Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh',
                'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha',
                'Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
                'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','All India'
            ].sort(),
            categories: [
                'Agriculture, Rural & Environment','Arts & Culture',
                'Banking, Financial Services & Insurance','Business & Entrepreneurship',
                'Education & Learning','Health & Wellness','Housing & Shelter',
                'Infrastructure & Connectivity','Public Safety, Law & Justice',
                'Science & Technology','Skills & Employment',
                'Social Welfare & Empowerment','Sports & Adventure',
                'Transport & Infrastructure','Travel & Tourism',
                'Utility & Sanitation','Women & Child'
            ],
            incomeBrackets: [
                { value: 'below-1l',  label: 'Below ₹1 Lakh' },
                { value: '1l-2.5l',  label: '₹1 Lakh – ₹2.5 Lakh' },
                { value: '2.5l-5l',  label: '₹2.5 Lakh – ₹5 Lakh' },
                { value: '5l-8l',    label: '₹5 Lakh – ₹8 Lakh' },
                { value: '8l-10l',   label: '₹8 Lakh – ₹10 Lakh' },
                { value: 'above-10l',label: 'Above ₹10 Lakh' }
            ],
            occupations: [
                { value: 'student',           label: 'Student' },
                { value: 'farmer',            label: 'Farmer' },
                { value: 'self-employed',     label: 'Self-employed / Business' },
                { value: 'salaried',          label: 'Salaried Employee' },
                { value: 'unemployed',        label: 'Unemployed' },
                { value: 'homemaker',         label: 'Homemaker' },
                { value: 'retired',           label: 'Retired' },
                { value: 'daily-wage-worker', label: 'Daily Wage Worker' }
            ],
            totalSchemes: 1074
        };
    }

    /* ── Load filter options from API (non-blocking, with timeout) ─ */
    function loadFilterOptions() {
        if (optionsLoaded || optionsLoading) return;
        optionsLoading = true;

        const API_BASE  = getApiBase();
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 3000);

        fetch(`${API_BASE}/filter/options`, { signal: controller.signal })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                clearTimeout(tid);
                if (data && data.success && data.data) {
                    filterOptions = data.data;
                } else {
                    filterOptions = getFallbackOptions();
                }
                optionsLoaded  = true;
                optionsLoading = false;
                populateDynamicOptions(filterOptions);
            })
            .catch(() => {
                clearTimeout(tid);
                filterOptions  = getFallbackOptions();
                optionsLoaded  = true;
                optionsLoading = false;
                populateDynamicOptions(filterOptions);
            });
    }

    /* ── Populate select elements after options load ─────────── */
    function populateDynamicOptions(opts) {
        if (!opts) return;

        const stateEl = document.getElementById('filterState');
        if (stateEl && stateEl.options.length <= 2) {
            stateEl.innerHTML = '<option value="">All States &amp; UTs</option>';
            (opts.states || []).forEach(s => {
                const o = document.createElement('option');
                o.value = s;
                o.textContent = s;
                stateEl.appendChild(o);
            });
            if (activeFilters.state) stateEl.value = activeFilters.state;
        }

        const schemeCatEl = document.getElementById('filterSchemeCategory');
        if (schemeCatEl && schemeCatEl.options.length <= 2) {
            schemeCatEl.innerHTML = '<option value="">All Categories</option>';
            (opts.categories || []).forEach(c => {
                const o = document.createElement('option');
                o.value = c;
                o.textContent = c;
                schemeCatEl.appendChild(o);
            });
            if (activeFilters.schemeCategory) schemeCatEl.value = activeFilters.schemeCategory;
        }

        const incomeEl = document.getElementById('filterIncome');
        if (incomeEl && incomeEl.options.length <= 2) {
            incomeEl.innerHTML = '<option value="">Any Income Level</option>';
            (opts.incomeBrackets || []).forEach(b => {
                const o = document.createElement('option');
                o.value = b.value;
                o.textContent = b.label;
                incomeEl.appendChild(o);
            });
            if (activeFilters.income) incomeEl.value = activeFilters.income;
        }

        const occEl = document.getElementById('filterOccupation');
        if (occEl && occEl.options.length <= 2) {
            occEl.innerHTML = '<option value="">Any Occupation</option>';
            (opts.occupations || []).forEach(oc => {
                const o = document.createElement('option');
                o.value = oc.value;
                o.textContent = oc.label;
                occEl.appendChild(o);
            });
            if (activeFilters.occupation) occEl.value = activeFilters.occupation;
        }
    }

    /* ── Build drawer HTML ───────────────────────────────────── */
    function buildDrawerHTML() {
        return `
<div class="filter-backdrop" id="filterBackdrop"></div>
<div class="filter-drawer" id="filterDrawer" role="dialog" aria-label="Filter Schemes" aria-modal="true">
    <div class="filter-drawer-header">
        <div class="filter-drawer-title">
            <i class="fas fa-sliders"></i>
            <span>Filter Schemes</span>
        </div>
        <button class="filter-drawer-close" id="filterDrawerClose" aria-label="Close filters">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <div class="filter-drawer-body">

        <!-- Scheme Type -->
        <div class="filter-group">
            <label class="filter-group-label"><i class="fas fa-landmark"></i> Scheme Type</label>
            <div class="filter-radio-group">
                <label class="filter-radio-option">
                    <input type="radio" name="filterType" value="">
                    <span>All Types</span>
                </label>
                <label class="filter-radio-option">
                    <input type="radio" name="filterType" value="central">
                    <span><i class="fas fa-landmark"></i> Central</span>
                </label>
                <label class="filter-radio-option">
                    <input type="radio" name="filterType" value="state">
                    <span><i class="fas fa-map-location-dot"></i> State</span>
                </label>
            </div>
        </div>

        <!-- State -->
        <div class="filter-group">
            <label class="filter-group-label" for="filterState"><i class="fas fa-map-marker-alt"></i> State / UT</label>
            <select class="filter-select" id="filterState">
                <option value="">All States &amp; UTs</option>
            </select>
        </div>

        <!-- Gender -->
        <div class="filter-group">
            <label class="filter-group-label"><i class="fas fa-venus-mars"></i> Gender</label>
            <div class="filter-radio-group">
                <label class="filter-radio-option">
                    <input type="radio" name="filterGender" value="">
                    <span>All Genders</span>
                </label>
                <label class="filter-radio-option">
                    <input type="radio" name="filterGender" value="male">
                    <span><i class="fas fa-mars"></i> Male</span>
                </label>
                <label class="filter-radio-option">
                    <input type="radio" name="filterGender" value="female">
                    <span><i class="fas fa-venus"></i> Female</span>
                </label>
            </div>
        </div>

        <!-- Age Range -->
        <div class="filter-group">
            <label class="filter-group-label"><i class="fas fa-calendar-alt"></i> Age Range (Years)</label>
            <div class="filter-age-row">
                <div class="filter-age-field">
                    <span class="filter-age-label">Min Age</span>
                    <input type="number" class="filter-number" id="filterAgeMin" min="0" max="100" placeholder="0">
                </div>
                <span class="filter-age-separator">–</span>
                <div class="filter-age-field">
                    <span class="filter-age-label">Max Age</span>
                    <input type="number" class="filter-number" id="filterAgeMax" min="0" max="100" placeholder="100">
                </div>
            </div>
        </div>

        <!-- Category -->
        <div class="filter-group">
            <label class="filter-group-label"><i class="fas fa-users"></i> Category</label>
            <div class="filter-checkbox-group">
                <label class="filter-checkbox-option">
                    <input type="checkbox" name="filterCategory" value="general">
                    <span>General</span>
                </label>
                <label class="filter-checkbox-option">
                    <input type="checkbox" name="filterCategory" value="obc">
                    <span>OBC</span>
                </label>
                <label class="filter-checkbox-option">
                    <input type="checkbox" name="filterCategory" value="sc">
                    <span>SC</span>
                </label>
                <label class="filter-checkbox-option">
                    <input type="checkbox" name="filterCategory" value="st">
                    <span>ST</span>
                </label>
                <label class="filter-checkbox-option">
                    <input type="checkbox" name="filterCategory" value="ews">
                    <span>EWS</span>
                </label>
            </div>
        </div>

        <!-- Annual Income -->
        <div class="filter-group">
            <label class="filter-group-label" for="filterIncome"><i class="fas fa-indian-rupee-sign"></i> Annual Income</label>
            <select class="filter-select" id="filterIncome">
                <option value="">Any Income Level</option>
            </select>
        </div>

        <!-- Occupation -->
        <div class="filter-group">
            <label class="filter-group-label" for="filterOccupation"><i class="fas fa-briefcase"></i> Occupation</label>
            <select class="filter-select" id="filterOccupation">
                <option value="">Any Occupation</option>
            </select>
        </div>

        <!-- Scheme Category -->
        <div class="filter-group">
            <label class="filter-group-label" for="filterSchemeCategory"><i class="fas fa-tag"></i> Scheme Category</label>
            <select class="filter-select" id="filterSchemeCategory">
                <option value="">All Categories</option>
            </select>
        </div>

    </div>
    <div class="filter-drawer-footer">
        <button class="filter-clear-btn" id="filterClearBtn" type="button">
            <i class="fas fa-rotate-left"></i> Clear All
        </button>
        <button class="filter-apply-btn" id="filterApplyBtn" type="button">
            <i class="fas fa-check"></i> Apply Filter
        </button>
    </div>
</div>`;
    }

    /* ── Inject drawer into DOM (only once) ──────────────────── */
    function injectDrawer() {
        if (document.getElementById('filterDrawer')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'filterModuleContainer';
        wrapper.innerHTML = buildDrawerHTML();
        document.body.appendChild(wrapper);

        attachDrawerEvents();
    }

    /* ── Attach event listeners to drawer elements ───────────── */
    function attachDrawerEvents() {
        document.getElementById('filterDrawerClose')
            ?.addEventListener('click', closeDrawer);
        document.getElementById('filterBackdrop')
            ?.addEventListener('click', closeDrawer);
        document.getElementById('filterClearBtn')
            ?.addEventListener('click', clearAllFilters);
        document.getElementById('filterApplyBtn')
            ?.addEventListener('click', applyFilters);

        // Highlight selected radio options
        document.querySelectorAll('#filterDrawer .filter-radio-option').forEach(label => {
            label.addEventListener('click', () => {
                const radio = label.querySelector('input[type=radio]');
                if (!radio) return;
                const name = radio.name;
                document.querySelectorAll(`#filterDrawer input[name="${name}"]`).forEach(r => {
                    r.closest('.filter-radio-option')?.classList.remove('selected');
                });
                label.classList.add('selected');
            });
        });

        // Toggle selected class on checkboxes
        document.querySelectorAll('#filterDrawer .filter-checkbox-option input[type=checkbox]').forEach(cb => {
            cb.addEventListener('change', () => {
                cb.closest('.filter-checkbox-option')?.classList.toggle('selected', cb.checked);
            });
        });

        // Initialize selected class for checked radios & checkboxes
        document.querySelectorAll('#filterDrawer input[type=radio]:checked').forEach(r => {
            r.closest('.filter-radio-option')?.classList.add('selected');
        });
        document.querySelectorAll('#filterDrawer input[type=checkbox]:checked').forEach(c => {
            c.closest('.filter-checkbox-option')?.classList.add('selected');
        });
    }

    /* ── Open drawer ─────────────────────────────────────────── */
    function openDrawer() {
        injectDrawer();
        restoreFiltersToUI(activeFilters);

        const drawer   = document.getElementById('filterDrawer');
        const backdrop = document.getElementById('filterBackdrop');

        if (drawer)   drawer.classList.add('open');
        if (backdrop) backdrop.classList.add('open');

        // Prevent background scrolling while modal is open
        document.body.style.overflow = 'hidden';

        // Ensure dynamic options are ready
        if (!optionsLoaded) {
            loadFilterOptions();
        } else if (filterOptions) {
            populateDynamicOptions(filterOptions);
        }
    }

    /* ── Close drawer ────────────────────────────────────────── */
    function closeDrawer() {
        const drawer   = document.getElementById('filterDrawer');
        const backdrop = document.getElementById('filterBackdrop');

        if (drawer)   drawer.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');

        // Always restore scroll
        document.body.style.overflow = '';
    }

    /* ── Restore active filters to drawer UI ─────────────────── */
    function restoreFiltersToUI(filters) {
        // Type radio
        document.querySelectorAll('input[name="filterType"]').forEach(r => {
            r.checked = (r.value === (filters.type || ''));
            if (r.checked) {
                r.closest('.filter-radio-option')?.classList.add('selected');
            } else {
                r.closest('.filter-radio-option')?.classList.remove('selected');
            }
        });
        // Gender radio
        document.querySelectorAll('input[name="filterGender"]').forEach(r => {
            r.checked = (r.value === (filters.gender || ''));
            if (r.checked) {
                r.closest('.filter-radio-option')?.classList.add('selected');
            } else {
                r.closest('.filter-radio-option')?.classList.remove('selected');
            }
        });
        // Category checkboxes
        const activeCats = Array.isArray(filters.category)
            ? filters.category.map(c => String(c).toLowerCase())
            : (filters.category ? [String(filters.category).toLowerCase()] : []);
        document.querySelectorAll('input[name="filterCategory"]').forEach(cb => {
            cb.checked = activeCats.includes(cb.value.toLowerCase());
            if (cb.checked) {
                cb.closest('.filter-checkbox-option')?.classList.add('selected');
            } else {
                cb.closest('.filter-checkbox-option')?.classList.remove('selected');
            }
        });
        // Age
        const ageMin = document.getElementById('filterAgeMin');
        const ageMax = document.getElementById('filterAgeMax');
        if (ageMin) ageMin.value = filters.ageMin || '';
        if (ageMax) ageMax.value = filters.ageMax || '';
        // Income
        const income = document.getElementById('filterIncome');
        if (income) income.value = filters.income || '';
        // Occupation
        const occ = document.getElementById('filterOccupation');
        if (occ) occ.value = filters.occupation || '';
        // Scheme category
        const cat = document.getElementById('filterSchemeCategory');
        if (cat) cat.value = filters.schemeCategory || '';
        // State
        const state = document.getElementById('filterState');
        if (state) state.value = filters.state || '';
    }

    /* ── Read current drawer values into filters object ─────── */
    function readDrawerFilters() {
        const filters = {};

        const typeEl = document.querySelector('input[name="filterType"]:checked');
        if (typeEl?.value) filters.type = typeEl.value;

        const stateEl = document.getElementById('filterState');
        if (stateEl?.value) filters.state = stateEl.value;

        const genderEl = document.querySelector('input[name="filterGender"]:checked');
        if (genderEl?.value) filters.gender = genderEl.value;

        const ageMinEl = document.getElementById('filterAgeMin');
        if (ageMinEl?.value) filters.ageMin = parseInt(ageMinEl.value, 10);

        const ageMaxEl = document.getElementById('filterAgeMax');
        if (ageMaxEl?.value) filters.ageMax = parseInt(ageMaxEl.value, 10);

        const checkedCats = Array.from(document.querySelectorAll('#filterDrawer input[name="filterCategory"]:checked'))
            .map(cb => cb.value)
            .filter(Boolean);
        if (checkedCats.length > 0) {
            filters.category = checkedCats.length === 1 ? checkedCats[0] : checkedCats;
        }

        const incomeEl = document.getElementById('filterIncome');
        if (incomeEl?.value) filters.income = incomeEl.value;

        const occEl = document.getElementById('filterOccupation');
        if (occEl?.value) filters.occupation = occEl.value;

        const schemeCatEl = document.getElementById('filterSchemeCategory');
        if (schemeCatEl?.value) filters.schemeCategory = schemeCatEl.value;

        return filters;
    }

    /* ── Count non-empty active filters ─────────────────────── */
    function countActiveFilters(filters) {
        return Object.values(filters).filter(v =>
            v !== null && v !== undefined && v !== ''
        ).length;
    }

    /* ── Update the Filter button in the results header ─────── */
    function updateFilterButton() {
        const btn = document.getElementById('mainFilterBtn');
        if (!btn) return;
        const count = countActiveFilters(activeFilters);
        if (count > 0) {
            btn.classList.add('has-active');
            btn.innerHTML = `<i class="fas fa-sliders"></i> Filter <span class="filter-count-badge">${count}</span>`;
        } else {
            btn.classList.remove('has-active');
            btn.innerHTML = `<i class="fas fa-sliders"></i> Filter`;
        }
    }

    /* ── Apply filters and re-run recommendations ────────────── */
    async function applyFilters() {
        if (isApplying) return;

        const newFilters = readDrawerFilters();
        activeFilters    = newFilters;
        isApplying       = true;

        const applyBtn = document.getElementById('filterApplyBtn');
        if (applyBtn) {
            applyBtn.disabled = true;
            applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying…';
        }

        closeDrawer();
        updateFilterButton();
        renderFilterChips();

        try {
            if (typeof window._rerunWithFilters === 'function') {
                await window._rerunWithFilters(activeFilters);
            }
        } catch (e) {
            console.warn('Filter apply error:', e);
        } finally {
            isApplying = false;
            if (applyBtn) {
                applyBtn.disabled = false;
                applyBtn.innerHTML = '<i class="fas fa-check"></i> Apply Filters';
            }
        }
    }

    /* ── Clear all filters ───────────────────────────────────── */
    async function clearAllFilters() {
        activeFilters = {};

        // Reset UI inputs
        document.querySelectorAll('#filterDrawer input[type=radio]').forEach(r => {
            r.checked = (r.value === '');
            if (r.checked) {
                r.closest('.filter-radio-option')?.classList.add('selected');
            } else {
                r.closest('.filter-radio-option')?.classList.remove('selected');
            }
        });
        document.querySelectorAll('#filterDrawer input[type=checkbox]').forEach(c => {
            c.checked = false;
            c.closest('.filter-checkbox-option')?.classList.remove('selected');
        });
        document.querySelectorAll('#filterDrawer select').forEach(s => { s.value = ''; });
        document.querySelectorAll('#filterDrawer input[type=number]').forEach(n => { n.value = ''; });

        closeDrawer();
        updateFilterButton();
        renderFilterChips();

        try {
            if (typeof window._rerunWithFilters === 'function') {
                await window._rerunWithFilters({});
            }
        } catch (e) {
            console.warn('Clear filters error:', e);
        }
    }

    /* ── Remove a single filter and re-run ───────────────────── */
    async function removeFilter(key) {
        delete activeFilters[key];
        updateFilterButton();
        renderFilterChips();
        try {
            if (typeof window._rerunWithFilters === 'function') {
                await window._rerunWithFilters(activeFilters);
            }
        } catch (e) {
            console.warn('Remove filter error:', e);
        }
    }

    /* ── Human-readable chip labels ─────────────────────────── */
    const CHIP_LABELS = {
        state:          v => Array.isArray(v) ? v.join(', ') : v,
        type:           v => v.charAt(0).toUpperCase() + v.slice(1),
        gender:         v => v.charAt(0).toUpperCase() + v.slice(1),
        age:            v => `Age ${v}`,
        ageMin:         v => `Age ≥ ${v}`,
        ageMax:         v => `Age ≤ ${v}`,
        category:       v => Array.isArray(v) ? v.map(c => c.toUpperCase()).join(', ') : v.toUpperCase(),
        income: v => {
            const m = {
                'below-1l': '< ₹1 Lakh',
                '1l-2.5l': '₹1L – ₹2.5L',
                'below-3l': '< ₹3 Lakh',
                '2.5l-5l': '₹2.5L – ₹5L',
                '5l-8l': '₹5L – ₹8L',
                '8l-10l': '₹8L – ₹10L',
                'above-10l': '> ₹10 Lakh'
            };
            return m[v] || (typeof v === 'number' ? `≤ ₹${(v/100000).toFixed(1)}L` : v);
        },
        occupation:     v => (Array.isArray(v) ? v.join(', ') : String(v)).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        schemeCategory: v => {
            const s = Array.isArray(v) ? v.join(', ') : String(v);
            return s.length > 22 ? s.slice(0, 20) + '…' : s;
        }
    };

    /* ── Render active filter chips below results count ──────── */
    function renderFilterChips() {
        const container = document.getElementById('activeFilterChips');
        if (!container) return;

        const activeKeys = Object.keys(activeFilters).filter(k => {
            const v = activeFilters[k];
            if (v === null || v === undefined || v === '') return false;
            if (Array.isArray(v) && v.length === 0) return false;
            return true;
        });

        if (activeKeys.length === 0) {
            container.innerHTML = '';
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        const chipsHtml = activeKeys.map(key => {
            const val   = activeFilters[key];
            const label = CHIP_LABELS[key] ? CHIP_LABELS[key](val) : String(val);
            return `<span class="active-filter-chip">
                <span>${label}</span>
                <button class="filter-chip-remove"
                    onclick="window.FilterModule.removeFilter('${key}')"
                    aria-label="Remove ${label} filter">
                    <i class="fas fa-times"></i>
                </button>
            </span>`;
        }).join('');

        const clearBtnHtml = `<button class="filter-chips-clear-all" onclick="window.FilterModule.clearAll()" aria-label="Clear all filters">
            Clear All
        </button>`;

        container.innerHTML = chipsHtml + clearBtnHtml;
    }

    /* ── Public API ─────────────────────────────────────────── */
    window.FilterModule = {
        open:           openDrawer,
        close:          closeDrawer,
        clearAll:       clearAllFilters,
        removeFilter:   removeFilter,
        getActive:      () => ({ ...activeFilters }),
        hasActive:      () => countActiveFilters(activeFilters) > 0,
        getActiveCount: () => countActiveFilters(activeFilters),
        renderChips:    renderFilterChips,
        updateButton:   updateFilterButton,
        init: function () {
            injectDrawer();
            loadFilterOptions();
            updateFilterButton();
            renderFilterChips();
        }
    };

    // ESC key closes the drawer
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && document.getElementById('filterDrawer')) {
            closeDrawer();
        }
    });

    // Auto-init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.FilterModule.init();
        });
    } else {
        window.FilterModule.init();
    }

})();
