/* ============================================================
   Eligibility Service: Eligibility Engine
   Structured rule-based eligibility checking (NOT LLM-based)
   ============================================================ */

const path = require('path');
const { evaluateCriterion, formatIncome } = require('./ruleEvaluator');

// Load schemes data
let schemes = [];
try {
    schemes = require(path.join(__dirname, '..', '..', 'data', 'schemes.json'));
} catch (e) {
    console.warn('[EligibilityEngine] Could not load schemes:', e.message);
}

/**
 * Eligibility status constants
 */
const ELIGIBILITY_STATUS = {
    MATCHED: 'MATCHED',
    POTENTIALLY_ELIGIBLE: 'POTENTIALLY_ELIGIBLE',
    NOT_ELIGIBLE: 'NOT_ELIGIBLE',
    INSUFFICIENT_INFORMATION: 'INSUFFICIENT_INFORMATION',
    NOT_APPLICABLE: 'NOT_APPLICABLE'
};

/**
 * Check eligibility for a specific scheme
 * @param {Object} userProfile - User's profile data
 * @param {string|Object} schemeIdOrScheme - Scheme ID or scheme object
 * @returns {Object} - { status, score, matchedCriteria, failedCriteria, missingCriteria, explanation }
 */
function checkEligibility(userProfile, schemeIdOrScheme) {
    let scheme;

    if (typeof schemeIdOrScheme === 'string' || typeof schemeIdOrScheme === 'number') {
        scheme = schemes.find(s => String(s.id) === String(schemeIdOrScheme));
        if (!scheme) {
            return {
                status: ELIGIBILITY_STATUS.NOT_APPLICABLE,
                score: 0,
                matchedCriteria: [],
                failedCriteria: [],
                missingCriteria: [],
                explanation: `Scheme with ID ${schemeIdOrScheme} not found in knowledge base.`
            };
        }
    } else {
        scheme = schemeIdOrScheme;
    }

    const eligibility = scheme.eligibility || {};
    const matchedCriteria = [];
    const failedCriteria = [];
    const missingCriteria = [];

    // ── Check each criterion ────────────────────────────────────
    const criteria = [
        { field: 'age', userValue: userProfile.age, schemeValue: eligibility.minAge != null ? eligibility : null },
        { field: 'gender', userValue: userProfile.gender, schemeValue: eligibility.gender },
        { field: 'income', userValue: userProfile.income, schemeValue: eligibility.income },
        { field: 'category', userValue: userProfile.category, schemeValue: eligibility.category },
        { field: 'occupation', userValue: userProfile.occupation, schemeValue: eligibility.occupation },
        { field: 'area', userValue: userProfile.area, schemeValue: eligibility.area },
        { field: 'state', userValue: userProfile.state, schemeValue: scheme.state },
        { field: 'maritalStatus', userValue: userProfile.maritalStatus, schemeValue: eligibility.maritalStatus },
        { field: 'education', userValue: userProfile.education, schemeValue: eligibility.education }
    ];

    for (const { field, userValue, schemeValue } of criteria) {
        const result = evaluateCriterion(field, userValue, schemeValue);

        switch (result.status) {
            case 'MATCHED':
                matchedCriteria.push(result.reason);
                break;
            case 'NOT_ELIGIBLE':
                failedCriteria.push(result.reason);
                break;
            case 'INSUFFICIENT_INFORMATION':
                missingCriteria.push(result.reason);
                break;
            // NOT_APPLICABLE — skip (doesn't affect eligibility)
        }
    }

    // ── Determine overall status ────────────────────────────────
    let status;
    let score;

    const totalChecked = matchedCriteria.length + failedCriteria.length + missingCriteria.length;

    if (failedCriteria.length > 0) {
        status = ELIGIBILITY_STATUS.NOT_ELIGIBLE;
        score = totalChecked > 0 ? Math.round((matchedCriteria.length / totalChecked) * 100) : 0;
    } else if (missingCriteria.length > 0 && matchedCriteria.length > 0) {
        status = ELIGIBILITY_STATUS.POTENTIALLY_ELIGIBLE;
        score = totalChecked > 0 ? Math.round((matchedCriteria.length / totalChecked) * 100) : 50;
    } else if (matchedCriteria.length > 0 && missingCriteria.length === 0) {
        status = ELIGIBILITY_STATUS.MATCHED;
        score = 100;
    } else if (missingCriteria.length > 0) {
        status = ELIGIBILITY_STATUS.INSUFFICIENT_INFORMATION;
        score = 0;
    } else {
        status = ELIGIBILITY_STATUS.POTENTIALLY_ELIGIBLE;
        score = 50;
    }

    // ── Build explanation ───────────────────────────────────────
    const explanation = buildExplanation(scheme, status, matchedCriteria, failedCriteria, missingCriteria);

    return {
        schemeId: scheme.id,
        schemeName: scheme.title,
        status,
        score,
        matchedCriteria,
        failedCriteria,
        missingCriteria,
        explanation
    };
}

/**
 * Check eligibility across multiple schemes
 * @param {Object} userProfile - User's profile
 * @param {Object} [options] - Filtering options
 * @returns {Object[]} - Array of eligibility results, sorted by score
 */
function checkMultipleSchemes(userProfile, options = {}) {
    const {
        maxResults = 20,
        minScore = 40,
        filterState = null,
        filterCategory = null
    } = options;

    let targetSchemes = schemes;

    // Pre-filter by state
    if (filterState) {
        targetSchemes = targetSchemes.filter(s => {
            const state = (s.state || '').toLowerCase();
            return state === 'all india' || state === '' || state === filterState.toLowerCase();
        });
    }

    // Pre-filter by category
    if (filterCategory) {
        targetSchemes = targetSchemes.filter(s => {
            const cat = (s.category || '').toLowerCase();
            return cat.includes(filterCategory.toLowerCase());
        });
    }

    const results = [];

    for (const scheme of targetSchemes) {
        const result = checkEligibility(userProfile, scheme);

        if (result.score >= minScore || result.status === ELIGIBILITY_STATUS.MATCHED || result.status === ELIGIBILITY_STATUS.POTENTIALLY_ELIGIBLE) {
            results.push(result);
        }
    }

    // Sort by score (descending), then by status priority
    const statusPriority = {
        MATCHED: 0,
        POTENTIALLY_ELIGIBLE: 1,
        INSUFFICIENT_INFORMATION: 2,
        NOT_ELIGIBLE: 3,
        NOT_APPLICABLE: 4
    };

    results.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return (statusPriority[a.status] || 4) - (statusPriority[b.status] || 4);
    });

    return results.slice(0, maxResults);
}

/**
 * Build human-readable explanation
 */
function buildExplanation(scheme, status, matched, failed, missing) {
    const parts = [];

    parts.push(`**${scheme.title}**`);

    switch (status) {
        case ELIGIBILITY_STATUS.MATCHED:
            parts.push('\n✅ **Status: Potentially Eligible** (based on available criteria)');
            break;
        case ELIGIBILITY_STATUS.POTENTIALLY_ELIGIBLE:
            parts.push('\n⚠️ **Status: Potentially Eligible** (some information is missing)');
            break;
        case ELIGIBILITY_STATUS.NOT_ELIGIBLE:
            parts.push('\n❌ **Status: Not Eligible** (based on available criteria)');
            break;
        case ELIGIBILITY_STATUS.INSUFFICIENT_INFORMATION:
            parts.push('\nℹ️ **Status: More Information Needed**');
            break;
    }

    if (matched.length > 0) {
        parts.push('\n**Matching Criteria:**');
        matched.forEach(m => parts.push(m));
    }

    if (failed.length > 0) {
        parts.push('\n**Not Matching:**');
        failed.forEach(f => parts.push(f));
    }

    if (missing.length > 0) {
        parts.push('\n**Still Required:**');
        missing.forEach(m => parts.push(`• ${m.replace(/.*: /, '')}`));
    }

    return parts.join('\n');
}

/**
 * Get a scheme by ID
 */
function getSchemeById(id) {
    return schemes.find(s => String(s.id) === String(id)) || null;
}

/**
 * Get total scheme count
 */
function getSchemeCount() {
    return schemes.length;
}

module.exports = {
    checkEligibility,
    checkMultipleSchemes,
    getSchemeById,
    getSchemeCount,
    ELIGIBILITY_STATUS
};
