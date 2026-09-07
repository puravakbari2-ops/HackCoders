/* ============================================================
   Eligibility Service: Rule Evaluator
   Evaluates individual scheme eligibility rules against user
   ============================================================ */

/**
 * Evaluate a single eligibility criterion
 * @param {string} field - The criterion name
 * @param {*} userValue - The user's value
 * @param {*} schemeValue - The scheme's requirement
 * @returns {Object} - { status, reason }
 */
function evaluateCriterion(field, userValue, schemeValue) {
    // If scheme doesn't specify this criterion, it's not applicable
    if (schemeValue === null || schemeValue === undefined) {
        return { status: 'NOT_APPLICABLE', reason: `${field}: Not specified by scheme` };
    }

    // If user hasn't provided this info
    if (userValue === null || userValue === undefined || userValue === '') {
        return { status: 'INSUFFICIENT_INFORMATION', reason: `${field}: Information not provided` };
    }

    switch (field) {
        case 'age':
            return evaluateAge(userValue, schemeValue);
        case 'gender':
            return evaluateArrayMatch(field, userValue, schemeValue);
        case 'income':
            return evaluateIncome(userValue, schemeValue);
        case 'category':
            return evaluateArrayMatch('Social Category', userValue, schemeValue);
        case 'occupation':
            return evaluateArrayMatch('Occupation', userValue, schemeValue);
        case 'area':
            return evaluateArrayMatch('Area', userValue, schemeValue);
        case 'state':
            return evaluateState(userValue, schemeValue);
        case 'maritalStatus':
            return evaluateArrayMatch('Marital Status', userValue, schemeValue);
        case 'education':
            return evaluateArrayMatch('Education', userValue, schemeValue);
        default:
            return { status: 'NOT_APPLICABLE', reason: `${field}: Unknown criterion` };
    }
}

/**
 * Evaluate age criterion
 */
function evaluateAge(userAge, schemeAge) {
    const age = parseInt(userAge);
    if (isNaN(age)) {
        return { status: 'INSUFFICIENT_INFORMATION', reason: 'Age: Could not parse age' };
    }

    const minAge = schemeAge.minAge || 0;
    const maxAge = schemeAge.maxAge || 100;

    if (age >= minAge && age <= maxAge) {
        return { status: 'MATCHED', reason: `Age: ✓ ${age} years (required: ${minAge}-${maxAge})` };
    }

    return { status: 'NOT_ELIGIBLE', reason: `Age: ✗ ${age} years (required: ${minAge}-${maxAge})` };
}

/**
 * Evaluate array-based match (gender, occupation, category, area)
 */
function evaluateArrayMatch(fieldName, userValue, schemeValues) {
    if (!Array.isArray(schemeValues)) {
        schemeValues = [schemeValues];
    }

    const normalizedUser = String(userValue).toLowerCase().trim();
    const normalizedScheme = schemeValues.map(v => String(v).toLowerCase().trim());

    if (normalizedScheme.includes(normalizedUser) || normalizedScheme.includes('all')) {
        return { status: 'MATCHED', reason: `${fieldName}: ✓ ${userValue}` };
    }

    return { status: 'NOT_ELIGIBLE', reason: `${fieldName}: ✗ ${userValue} (required: ${schemeValues.join(', ')})` };
}

/**
 * Evaluate income criterion
 */
function evaluateIncome(userIncome, schemeIncome) {
    if (!Array.isArray(schemeIncome) || schemeIncome.length === 0) {
        return { status: 'NOT_APPLICABLE', reason: 'Income: No specific requirement' };
    }

    const income = parseFloat(userIncome);
    if (isNaN(income)) {
        return { status: 'INSUFFICIENT_INFORMATION', reason: 'Income: Could not parse income' };
    }

    // Map income range labels to numeric ranges
    const incomeRanges = {
        'below-1l': { min: 0, max: 100000 },
        '1l-2.5l': { min: 100000, max: 250000 },
        '2.5l-5l': { min: 250000, max: 500000 },
        '5l-8l': { min: 500000, max: 800000 },
        '8l-10l': { min: 800000, max: 1000000 },
        'above-10l': { min: 1000000, max: Infinity }
    };

    // Check if user's income falls in any of the eligible ranges
    for (const rangeLabel of schemeIncome) {
        const range = incomeRanges[rangeLabel];
        if (range && income >= range.min && income < range.max) {
            return { status: 'MATCHED', reason: `Income: ✓ ₹${formatIncome(income)} (within ${rangeLabel})` };
        }
    }

    return { status: 'POTENTIALLY_ELIGIBLE', reason: `Income: ⚠ ₹${formatIncome(income)} — verify with scheme office` };
}

/**
 * Evaluate state criterion
 */
function evaluateState(userState, schemeState) {
    if (!schemeState) {
        return { status: 'NOT_APPLICABLE', reason: 'State: Not specified' };
    }

    const normalizedUser = String(userState).toLowerCase().trim();
    const normalizedScheme = String(schemeState).toLowerCase().trim();

    if (normalizedScheme === 'all india' || normalizedScheme === '') {
        return { status: 'MATCHED', reason: `State: ✓ Available in all of India` };
    }

    if (normalizedScheme === normalizedUser) {
        return { status: 'MATCHED', reason: `State: ✓ ${userState}` };
    }

    return { status: 'NOT_ELIGIBLE', reason: `State: ✗ Your state (${userState}) — scheme is for ${schemeState}` };
}

/**
 * Format income for display
 */
function formatIncome(amount) {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Crore`;
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)} Lakh`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
    return String(amount);
}

module.exports = {
    evaluateCriterion,
    formatIncome
};
