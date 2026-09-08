/* ============================================================
   JanSahay AI — Filter Service
   Deterministic pre-filter engine that runs BEFORE RAG retrieval.
   
   Pipeline position:
     All Schemes → filterSchemes() → eligible IDs → RAG → Gemini
   ============================================================ */

const path    = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

/* ── Income bracket upper bounds in Rupees ──────────────────── */
const BRACKET_MAX = {
    'below-1l':   100000,
    '1l-2.5l':    250000,
    '2.5l-5l':    500000,
    '5l-8l':      800000,
    '8l-10l':     1000000,
    'above-10l':  Infinity
};

const INCOME_ORDER = ['below-1l', '1l-2.5l', '2.5l-5l', '5l-8l', '8l-10l', 'above-10l'];

/* ── Normalize string to lowercase and trimmed ─────────────── */
function norm(str) {
    return typeof str === 'string' ? str.toLowerCase().trim() : '';
}

/* ── Parse any income representation to Rupees ──────────────── */
function parseIncomeToNumber(val) {
    if (typeof val === 'number') return isNaN(val) ? null : val;
    if (typeof val !== 'string') return null;
    val = val.trim().toLowerCase();
    
    // Check "below-1l", "1l-2.5l", etc.
    if (val === 'below-1l') return 100000;
    if (val === '1l-2.5l') return 250000;
    if (val === 'below-3l' || val === 'below-3.0l') return 300000;
    if (val === '2.5l-5l') return 500000;
    if (val === '5l-8l') return 800000;
    if (val === '8l-10l') return 1000000;
    if (val === 'above-10l') return 1500000;

    // Check "2.5 lakh", "3 lakh", "2.5l"
    const lakhMatch = val.match(/([0-9.]+)\s*(?:lakh|l)/);
    if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000;

    // Check raw digits e.g. "250000", "₹2,50,000"
    const cleanDigits = val.replace(/[^0-9.]/g, '');
    if (cleanDigits && !isNaN(cleanDigits)) {
        const num = parseFloat(cleanDigits);
        if (num > 0 && num < 100) return num * 100000; // User entered "2.5" meaning 2.5L
        return num;
    }

    return null;
}

/**
 * Check if user income matches scheme income eligibility criteria
 * 
 * Rules:
 * 1. If scheme has no income restriction, everyone is eligible.
 * 2. If user provides a numeric income (e.g. 250000):
 *    - Find scheme's maximum income ceiling: Math.max(...scheme.income.map(b => BRACKET_MAX[b]))
 *    - If userIncome <= scheme ceiling -> ELIGIBLE.
 *    - If userIncome > scheme ceiling -> EXCLUDED.
 * 3. If user provides "below-3l":
 *    - Any scheme whose ceiling >= 100000 and includes 'below-1l', '1l-2.5l', or '2.5l-5l' -> ELIGIBLE.
 * 4. If user provides a specific bracket ('1l-2.5l'):
 *    - If scheme includes that bracket -> ELIGIBLE.
 * 5. If user provides an array of brackets:
 *    - If scheme includes ANY of the brackets -> ELIGIBLE.
 */
function checkIncomeEligibility(schemeIncomeList, rawIncomeFilter) {
    if (!schemeIncomeList || schemeIncomeList.length === 0) return true; // No income restriction
    if (!rawIncomeFilter) return true;

    // 1. Direct bracket array
    if (Array.isArray(rawIncomeFilter)) {
        return rawIncomeFilter.some(b => schemeIncomeList.includes(b));
    }

    const strFilter = String(rawIncomeFilter).trim().toLowerCase();

    // 2. Special case: below-3l
    if (strFilter === 'below-3l' || strFilter === 'below-3.0l') {
        return schemeIncomeList.some(b => ['below-1l', '1l-2.5l', '2.5l-5l'].includes(b));
    }

    // 3. Exact bracket match if it is one of standard brackets
    if (INCOME_ORDER.includes(strFilter)) {
        return schemeIncomeList.includes(strFilter);
    }

    // 4. Numeric income comparison (e.g. 250000, "2.5 lakh", "₹2,50,000")
    const numericIncome = parseIncomeToNumber(strFilter);
    if (numericIncome !== null) {
        const schemeMaxCeiling = Math.max(...schemeIncomeList.map(b => BRACKET_MAX[b] || 0));
        return numericIncome <= schemeMaxCeiling;
    }

    return true;
}

/* ──────────────────────────────────────────────────────────── */
/*   MAIN FILTER FUNCTION                                        */
/* ──────────────────────────────────────────────────────────── */

/**
 * filterSchemes(allSchemes, filters) → { count, schemeIds, filtered }
 *
 * filters = {
 *   state?:          string | string[]
 *   gender?:         string | string[]
 *   age?:            number | string
 *   ageMin?:         number | string
 *   ageMax?:         number | string
 *   category?:       string | string[]
 *   income?:         string | number | string[]
 *   occupation?:     string | string[]
 *   schemeCategory?: string | string[]
 *   type?:           string
 *   benefits?:       string | string[]
 *   tags?:           string | string[]
 * }
 */
function filterSchemes(allSchemes, filters = {}) {
    if (!filters || Object.keys(filters).length === 0) {
        return {
            count:     allSchemes.length,
            schemeIds: allSchemes.map(s => String(s.id)),
            filtered:  allSchemes
        };
    }

    const normF = normalizeFilters(filters);

    const filtered = allSchemes.filter(scheme => {
        const e = scheme.eligibility || {};

        /* ── 1. State filter ──────────────────────────────── */
        if (normF.state && normF.state.length > 0) {
            const schemeState = norm(scheme.state);
            const schemeType  = norm(scheme.type);

            // Central schemes and "All India" always pass any state filter
            const isNational = (schemeType === 'central' || schemeState === 'all india' || schemeState === '');
            if (!isNational) {
                // State-specific: must match user state
                const matchesState = normF.state.some(st => norm(st) === schemeState);
                if (!matchesState) return false;
            }
        }

        /* ── 2. Scheme Type filter ────────────────────────── */
        if (normF.type && normF.type !== 'both' && normF.type !== 'all') {
            if (norm(scheme.type) !== norm(normF.type)) return false;
        }

        /* ── 3. Scheme category filter ────────────────────── */
        if (normF.schemeCategory && normF.schemeCategory.length > 0) {
            const cat = norm(scheme.category);
            const matchesCat = normF.schemeCategory.some(sc => cat.includes(norm(sc)));
            if (!matchesCat) return false;
        }

        /* ── 4. Gender filter ─────────────────────────────── */
        if (normF.gender && normF.gender !== 'all') {
            if (e.gender && e.gender.length > 0) {
                const schemeGenders = e.gender.map(norm);
                // If scheme restricts gender, it must include user's gender or 'all'
                if (!schemeGenders.includes(norm(normF.gender)) && !schemeGenders.includes('all')) {
                    return false;
                }
            }
        }

        /* ── 5. Age filter ────────────────────────────────── */
        // Exact user age provided (e.g. user is 22)
        if (normF.age !== null && normF.age !== undefined) {
            if (e.minAge !== undefined && e.minAge !== null && normF.age < e.minAge) return false;
            if (e.maxAge !== undefined && e.maxAge !== null && normF.age > e.maxAge) return false;
        }
        // Age range: Min age filter
        if (normF.ageMin !== null && normF.ageMin !== undefined) {
            if (e.maxAge !== undefined && e.maxAge !== null && normF.ageMin > e.maxAge) return false;
        }
        // Age range: Max age filter
        if (normF.ageMax !== null && normF.ageMax !== undefined) {
            if (e.minAge !== undefined && e.minAge !== null && normF.ageMax < e.minAge) return false;
        }

        /* ── 6. Social category filter ────────────────────── */
        if (normF.category && normF.category.length > 0) {
            if (e.category && e.category.length > 0) {
                const schemeCats = e.category.map(norm);
                if (!schemeCats.includes('all')) {
                    const matchesCategory = normF.category.some(c => schemeCats.includes(norm(c)));
                    if (!matchesCategory) return false;
                }
            }
        }

        /* ── 7. Income filter ─────────────────────────────── */
        if (normF.income !== null && normF.income !== undefined && normF.income !== '') {
            if (!checkIncomeEligibility(e.income, normF.income)) return false;
        }

        /* ── 8. Occupation filter ─────────────────────────── */
        if (normF.occupation && normF.occupation.length > 0) {
            if (e.occupation && e.occupation.length > 0) {
                const schemeOccs = e.occupation.map(norm);
                if (!schemeOccs.includes('all')) {
                    const matchesOcc = normF.occupation.some(o => schemeOccs.includes(norm(o)));
                    if (!matchesOcc) return false;
                }
            }
        }

        /* ── 9. Benefits / Tags filter ────────────────────── */
        if (normF.benefits && normF.benefits.length > 0) {
            const allSchemeText = [
                scheme.title,
                scheme.benefits,
                scheme.benefits_detailed,
                Array.isArray(scheme.tags) ? scheme.tags.join(' ') : (scheme.tags || '')
            ].join(' ').toLowerCase();

            const matchesBenefit = normF.benefits.some(b => allSchemeText.includes(norm(b)));
            if (!matchesBenefit) return false;
        }

        return true;
    });

    return {
        count:     filtered.length,
        schemeIds: filtered.map(s => String(s.id)),
        filtered
    };
}

/* ── Normalize and validate incoming filter values ────────── */
function normalizeFilters(filters) {
    const out = {};

    // State (string or array)
    if (filters.state) {
        if (Array.isArray(filters.state)) {
            const arr = filters.state.map(norm).filter(Boolean);
            if (arr.length > 0) out.state = arr;
        } else if (typeof filters.state === 'string' && filters.state.trim()) {
            out.state = [filters.state.trim()];
        }
    }

    // Gender
    if (filters.gender && typeof filters.gender === 'string') {
        const g = norm(filters.gender);
        out.gender = ['male', 'female', 'transgender', 'all'].includes(g) ? g : null;
    }

    // Age exact
    if (filters.age !== undefined && filters.age !== null && filters.age !== '') {
        const a = parseInt(filters.age);
        if (!isNaN(a) && a >= 0 && a <= 120) out.age = a;
    }

    // Age Min
    if (filters.ageMin !== undefined && filters.ageMin !== null && filters.ageMin !== '') {
        const v = parseInt(filters.ageMin);
        if (!isNaN(v) && v >= 0 && v <= 120) out.ageMin = v;
    }

    // Age Max
    if (filters.ageMax !== undefined && filters.ageMax !== null && filters.ageMax !== '') {
        const v = parseInt(filters.ageMax);
        if (!isNaN(v) && v >= 0 && v <= 120) out.ageMax = v;
    }

    // Social category (string or array)
    if (filters.category) {
        if (Array.isArray(filters.category)) {
            const arr = filters.category.map(norm).filter(c => c && c !== 'all');
            if (arr.length > 0) out.category = arr;
        } else if (typeof filters.category === 'string') {
            const c = norm(filters.category);
            if (c && c !== 'all') out.category = [c];
        }
    }

    // Income
    if (filters.income !== undefined && filters.income !== null && filters.income !== '') {
        out.income = filters.income;
    }

    // Occupation (string or array)
    if (filters.occupation) {
        if (Array.isArray(filters.occupation)) {
            const arr = filters.occupation.map(norm).filter(o => o && o !== 'all');
            if (arr.length > 0) out.occupation = arr;
        } else if (typeof filters.occupation === 'string') {
            const o = norm(filters.occupation);
            if (o && o !== 'all') out.occupation = [o];
        }
    }

    // Scheme Category (string or array)
    if (filters.schemeCategory) {
        if (Array.isArray(filters.schemeCategory)) {
            const arr = filters.schemeCategory.map(norm).filter(Boolean);
            if (arr.length > 0) out.schemeCategory = arr;
        } else if (typeof filters.schemeCategory === 'string' && filters.schemeCategory.trim()) {
            out.schemeCategory = [filters.schemeCategory.trim()];
        }
    }

    // Type
    if (filters.type && typeof filters.type === 'string') {
        const t = norm(filters.type);
        out.type = ['central', 'state', 'both', 'all'].includes(t) ? t : null;
    }

    // Benefits / Tags
    const ben = filters.benefits || filters.benefit || filters.tags;
    if (ben) {
        if (Array.isArray(ben)) {
            const arr = ben.map(norm).filter(Boolean);
            if (arr.length > 0) out.benefits = arr;
        } else if (typeof ben === 'string' && ben.trim()) {
            out.benefits = [ben.trim()];
        }
    }

    return out;
}

/* ── Build filter options from actual scheme data ─────────── */
function getFilterOptions() {
    const states      = [...new Set(schemes.map(s => s.state).filter(Boolean))].sort();
    const categories  = [...new Set(schemes.map(s => s.category).filter(Boolean))].sort();
    const types       = ['all', 'central', 'state'];

    const incomeOptions = [
        { value: '',           label: 'Any Income Level' },
        { value: 'below-1l',   label: 'Below ₹1 Lakh' },
        { value: '1l-2.5l',    label: '₹1 Lakh – ₹2.5 Lakh' },
        { value: 'below-3l',   label: 'Below ₹3 Lakh' },
        { value: '2.5l-5l',    label: '₹2.5 Lakh – ₹5 Lakh' },
        { value: '5l-8l',      label: '₹5 Lakh – ₹8 Lakh' },
        { value: '8l-10l',     label: '₹8 Lakh – ₹10 Lakh' },
        { value: 'above-10l',  label: 'Above ₹10 Lakh' }
    ];

    const occupationLabels = {
        'student':          'Student',
        'farmer':           'Farmer',
        'self-employed':    'Self-employed / Business',
        'salaried':         'Salaried Employee',
        'unemployed':       'Unemployed',
        'homemaker':        'Homemaker',
        'retired':          'Retired',
        'daily-wage-worker':'Daily Wage Worker'
    };

    const allOccupations = [...new Set(schemes.flatMap(s => s.eligibility?.occupation || []))].sort();

    const popularBenefits = [
        'Scholarship',
        'Financial Support / Subsidy',
        'Health & Medical Insurance',
        'Loan / Low Interest Credit',
        'Housing / Shelter Assistance',
        'Skill Training & Employment',
        'Pension / Senior Citizen'
    ];

    return {
        states,
        categories,
        types,
        genders:          ['all', 'male', 'female'],
        socialCategories: ['general', 'obc', 'sc', 'st', 'ews'],
        incomeBrackets:   incomeOptions,
        occupations:      allOccupations.map(o => ({ value: o, label: occupationLabels[o] || o })),
        popularBenefits,
        totalSchemes:     schemes.length
    };
}

module.exports = { filterSchemes, getFilterOptions, normalizeFilters, parseIncomeToNumber };
