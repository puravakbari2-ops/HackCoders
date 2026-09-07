/* ============================================================
   JanSahay AI — Rule Engine & Citizen Profiling
   Comprehensive eligibility matching for government schemes
   ============================================================ */

(function (global) {
    'use strict';

    // ════════════════════════════════════════════════════════════
    // ENHANCED FORM STEPS — 7-step citizen profiling
    // ════════════════════════════════════════════════════════════

    const ENHANCED_FORM_STEPS = [
        // ── Step 1: Personal Identity ──────────────────────────
        {
            label: '<i class="fas fa-user-circle" style="margin-right:6px; color:var(--violet);"></i> Tell us about yourself',
            type: 'options',
            field: 'gender',
            options: [
                { label: 'Male', icon: 'fas fa-mars', value: 'male' },
                { label: 'Female', icon: 'fas fa-venus', value: 'female' },
                { label: 'Transgender', icon: 'fas fa-transgender', value: 'transgender' }
            ],
            extra: {
                label: '<i class="fas fa-calendar-days" style="margin-right:6px; color:var(--cyan);"></i> Your age is',
                type: 'select',
                field: 'age',
                options: Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 })),
                suffix: 'years'
            }
        },

        // ── Step 2: Location ───────────────────────────────────
        {
            label: '<i class="fas fa-map-location-dot" style="margin-right:6px; color:var(--emerald);"></i> Where do you reside?',
            type: 'select',
            field: 'state',
            options: [
                "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
                "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
                "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
                "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
                "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
                "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
                "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ].map(s => ({ label: s, value: s.toLowerCase() })),
            extra: {
                label: '<i class="fas fa-house-chimney" style="margin-right:6px; color:var(--amber);"></i> Your area of residence',
                type: 'options',
                field: 'area',
                options: [
                    { label: 'Urban', icon: 'fas fa-city', value: 'urban' },
                    { label: 'Rural', icon: 'fas fa-tree', value: 'rural' }
                ]
            }
        },

        // ── Step 3: Social Profile ─────────────────────────────
        {
            label: '<i class="fas fa-people-group" style="margin-right:6px; color:var(--rose);"></i> Your social category',
            type: 'options',
            field: 'category',
            options: [
                { label: 'General', icon: 'fas fa-user', value: 'general' },
                { label: 'SC', icon: 'fas fa-users', value: 'sc' },
                { label: 'ST', icon: 'fas fa-users', value: 'st' },
                { label: 'OBC', icon: 'fas fa-users', value: 'obc' },
                { label: 'EWS', icon: 'fas fa-hand-holding-heart', value: 'ews' }
            ],
            extra: {
                label: '<i class="fas fa-mosque" style="margin-right:6px; color:var(--teal);"></i> Do you belong to a minority community?',
                type: 'options',
                field: 'minority',
                options: [
                    { label: 'Yes', icon: 'fas fa-check', value: 'yes' },
                    { label: 'No', icon: 'fas fa-xmark', value: 'no' }
                ]
            }
        },

        // ── Step 4: Ability & Health ───────────────────────────
        {
            label: '<i class="fas fa-heart-pulse" style="margin-right:6px; color:var(--red-400);"></i> Are you differently abled?',
            type: 'options',
            field: 'disability',
            options: [
                { label: 'Yes', icon: 'fas fa-wheelchair', value: 'yes' },
                { label: 'No', icon: 'fas fa-check-circle', value: 'no' }
            ],
            extra: {
                label: '<i class="fas fa-stethoscope" style="margin-right:6px; color:var(--blue);"></i> If yes, type of disability',
                type: 'select',
                field: 'disabilityType',
                options: [
                    { label: 'Not Applicable', value: 'none' },
                    { label: 'Visual Impairment', value: 'visual' },
                    { label: 'Hearing Impairment', value: 'hearing' },
                    { label: 'Locomotor Disability', value: 'locomotor' },
                    { label: 'Intellectual Disability', value: 'intellectual' },
                    { label: 'Mental Illness', value: 'mental' },
                    { label: 'Multiple Disabilities', value: 'multiple' },
                    { label: 'Other', value: 'other' }
                ]
            }
        },

        // ── Step 5: Education & Employment ─────────────────────
        {
            label: '<i class="fas fa-graduation-cap" style="margin-right:6px; color:var(--indigo);"></i> Your education level',
            type: 'select',
            field: 'education',
            options: [
                { label: 'No formal education', value: 'no-formal' },
                { label: 'Below 10th', value: 'below-10th' },
                { label: '10th Pass', value: '10th' },
                { label: '12th Pass', value: '12th' },
                { label: 'ITI / Diploma', value: 'diploma' },
                { label: 'Graduate (UG)', value: 'graduate' },
                { label: 'Post Graduate (PG)', value: 'post-graduate' },
                { label: 'Doctorate / PhD', value: 'doctorate' }
            ],
            extra: {
                label: '<i class="fas fa-briefcase" style="margin-right:6px; color:var(--orange);"></i> Your employment status',
                type: 'select',
                field: 'occupation',
                options: [
                    { label: 'Student', value: 'student' },
                    { label: 'Farmer / Agricultural Worker', value: 'farmer' },
                    { label: 'Self-employed / Freelancer', value: 'self-employed' },
                    { label: 'Salaried Employee', value: 'salaried' },
                    { label: 'Business Owner', value: 'business-owner' },
                    { label: 'Daily Wage / Unorganized Labour', value: 'daily-wage' },
                    { label: 'Unemployed', value: 'unemployed' },
                    { label: 'Retired / Pensioner', value: 'retired' },
                    { label: 'Homemaker', value: 'homemaker' }
                ]
            }
        },

        // ── Step 6: Financial Profile ──────────────────────────
        {
            label: '<i class="fas fa-indian-rupee-sign" style="margin-right:6px; color:var(--emerald);"></i> Your annual family income',
            type: 'select',
            field: 'income',
            options: [
                { label: 'Below ₹1 Lakh', value: 'below-1l' },
                { label: '₹1 Lakh – ₹2.5 Lakh', value: '1l-2.5l' },
                { label: '₹2.5 Lakh – ₹5 Lakh', value: '2.5l-5l' },
                { label: '₹5 Lakh – ₹8 Lakh', value: '5l-8l' },
                { label: '₹8 Lakh – ₹10 Lakh', value: '8l-10l' },
                { label: 'Above ₹10 Lakh', value: 'above-10l' }
            ],
            extra: {
                label: '<i class="fas fa-id-card" style="margin-right:6px; color:var(--yellow);"></i> Do you hold a BPL / Ration Card?',
                type: 'options',
                field: 'bplCard',
                options: [
                    { label: 'Yes (BPL)', icon: 'fas fa-id-badge', value: 'bpl' },
                    { label: 'Yes (APL)', icon: 'fas fa-id-badge', value: 'apl' },
                    { label: 'No', icon: 'fas fa-xmark', value: 'no' }
                ]
            }
        },

        // ── Step 7: Family Details ─────────────────────────────
        {
            label: '<i class="fas fa-ring" style="margin-right:6px; color:var(--pink);"></i> Your marital status',
            type: 'options',
            field: 'maritalStatus',
            options: [
                { label: 'Single', icon: 'fas fa-user', value: 'single' },
                { label: 'Married', icon: 'fas fa-ring', value: 'married' },
                { label: 'Widowed', icon: 'fas fa-user-minus', value: 'widowed' },
                { label: 'Divorced', icon: 'fas fa-heart-crack', value: 'divorced' },
                { label: 'Separated', icon: 'fas fa-user-slash', value: 'separated' }
            ],
            extra: {
                label: '<i class="fas fa-children" style="margin-right:6px; color:var(--sky);"></i> Number of dependents / children',
                type: 'select',
                field: 'dependents',
                options: [
                    { label: 'None', value: '0' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4 or more', value: '4+' }
                ]
            }
        }
    ];


    // ════════════════════════════════════════════════════════════
    // INCOME HIERARCHY — for "at most" comparisons
    // Lower index = lower income bracket
    // ════════════════════════════════════════════════════════════

    const INCOME_HIERARCHY = [
        'below-1l',   // 0
        '1l-2.5l',    // 1
        '2.5l-5l',    // 2
        '5l-8l',      // 3
        '8l-10l',     // 4
        'above-10l'   // 5
    ];

    function getIncomeIndex(val) {
        const idx = INCOME_HIERARCHY.indexOf(val);
        return idx >= 0 ? idx : -1;
    }


    // ════════════════════════════════════════════════════════════
    // EDUCATION HIERARCHY — for "at least" comparisons
    // Lower index = lower education level
    // ════════════════════════════════════════════════════════════

    const EDUCATION_HIERARCHY = [
        'no-formal',    // 0
        'below-10th',   // 1
        '10th',         // 2
        '12th',         // 3
        'diploma',      // 4
        'graduate',     // 5
        'post-graduate', // 6
        'doctorate'     // 7
    ];

    function getEducationIndex(val) {
        const idx = EDUCATION_HIERARCHY.indexOf(val);
        return idx >= 0 ? idx : -1;
    }


    // ════════════════════════════════════════════════════════════
    // OCCUPATION MAPPING — maps new occupation values to legacy
    // The scheme data uses: student, farmer, self-employed,
    // unemployed, homemaker, retired, salaried, business-owner
    // ════════════════════════════════════════════════════════════

    const OCCUPATION_ALIASES = {
        'daily-wage': ['self-employed', 'farmer', 'unemployed'],
        'salaried': ['salaried', 'self-employed'],
        'business-owner': ['business-owner', 'self-employed'],
        'student': ['student'],
        'farmer': ['farmer'],
        'self-employed': ['self-employed'],
        'unemployed': ['unemployed'],
        'retired': ['retired'],
        'homemaker': ['homemaker']
    };

    function getOccupationAliases(userOccupation) {
        return OCCUPATION_ALIASES[userOccupation] || [userOccupation];
    }


    // ════════════════════════════════════════════════════════════
    // STATE NORMALIZATION
    // ════════════════════════════════════════════════════════════

    function normalizeState(val) {
        if (!val) return '';
        return val.toLowerCase().trim();
    }

    function schemeAppliesToState(scheme, userState) {
        if (!userState) return true; // no state selected = match all
        const schemeState = (scheme.state || '').toLowerCase().trim();
        if (schemeState === 'all india' || schemeState === '') return true;
        return schemeState === userState;
    }


    // ════════════════════════════════════════════════════════════
    // MATCH QUALITY LABELS
    // ════════════════════════════════════════════════════════════

    function getMatchQuality(score) {
        if (score >= 90) return { label: 'Excellent Match', icon: '⭐', cssClass: 'match-excellent', color: '#10b981' };
        if (score >= 70) return { label: 'Good Match', icon: '🟢', cssClass: 'match-good', color: '#22c55e' };
        if (score >= 50) return { label: 'Partial Match', icon: '🟡', cssClass: 'match-partial', color: '#eab308' };
        return { label: 'Low Match', icon: '🔴', cssClass: 'match-low', color: '#ef4444' };
    }


    // ════════════════════════════════════════════════════════════
    // RULE ENGINE — Two-Phase Scheme Matching
    // ════════════════════════════════════════════════════════════

    /**
     * Phase 1: Hard Eligibility Gates
     * Returns true if the user passes all mandatory eligibility checks.
     * A failure here means the scheme is NOT shown to the user at all.
     */
    function passesHardGates(scheme, profile) {
        const e = scheme.eligibility;
        if (!e) return true; // no eligibility data = assume eligible

        const ageNum = parseInt(profile.age) || 25;

        // ── Gate 1: Age Range ──
        if (e.minAge != null && e.maxAge != null) {
            if (ageNum < e.minAge || ageNum > e.maxAge) return false;
        }

        // ── Gate 2: Gender Inclusion ──
        if (profile.gender && e.gender && Array.isArray(e.gender)) {
            if (!e.gender.includes(profile.gender.toLowerCase())) return false;
        }

        // ── Gate 3: State Restriction ──
        if (scheme.type === 'state') {
            if (!schemeAppliesToState(scheme, normalizeState(profile.state))) return false;
        }

        return true;
    }


    /**
     * Phase 2: Weighted Relevance Scoring
     * Scores a scheme against the user profile on a 0-100 scale.
     * Only called for schemes that pass hard gates.
     */
    function calculateRelevanceScore(scheme, profile) {
        const e = scheme.eligibility;
        if (!e) return 75; // no eligibility data = default decent score

        let score = 0;
        let maxPossible = 0;

        // ── Income Match (20 pts) ──────────────────────────────
        maxPossible += 20;
        if (profile.income && e.income && Array.isArray(e.income)) {
            if (e.income.includes(profile.income)) {
                score += 20;
            } else {
                // Partial credit if user income is close to eligible brackets
                const userIdx = getIncomeIndex(profile.income);
                const closestEligible = e.income.map(v => getIncomeIndex(v)).filter(i => i >= 0);
                if (closestEligible.length > 0) {
                    const minDist = Math.min(...closestEligible.map(ei => Math.abs(ei - userIdx)));
                    if (minDist === 1) score += 8; // adjacent bracket
                }
            }
        } else {
            score += 15; // no income restriction on scheme
        }

        // ── Social Category Match (15 pts) ─────────────────────
        maxPossible += 15;
        if (profile.category && e.category && Array.isArray(e.category)) {
            if (e.category.includes(profile.category.toLowerCase())) {
                score += 15;
            }
            // EWS maps to general in many schemes
            if (profile.category === 'ews' && e.category.includes('general')) {
                score += 12;
            }
        } else {
            score += 12; // no category restriction
        }

        // ── Occupation Match (15 pts) ──────────────────────────
        maxPossible += 15;
        if (profile.occupation && e.occupation && Array.isArray(e.occupation)) {
            const aliases = getOccupationAliases(profile.occupation.toLowerCase());
            const matched = aliases.some(a => e.occupation.includes(a));
            if (matched) {
                score += 15;
            }
        } else {
            score += 12; // no occupation restriction
        }

        // ── State-specific Bonus (15 pts) ─────────────────────
        maxPossible += 15;
        if (scheme.type === 'state' && profile.state) {
            if (schemeAppliesToState(scheme, normalizeState(profile.state))) {
                score += 15; // state scheme matches user's state
            }
        } else if (scheme.type === 'central') {
            score += 10; // central schemes get moderate state bonus
        }

        // ── Area Match (10 pts) ───────────────────────────────
        maxPossible += 10;
        if (profile.area && e.area && Array.isArray(e.area)) {
            if (e.area.includes(profile.area.toLowerCase())) {
                score += 10;
            }
        } else {
            score += 8; // no area restriction
        }

        // ── Education Level Match (10 pts) ────────────────────
        maxPossible += 10;
        if (profile.education && e.education && Array.isArray(e.education)) {
            if (e.education.includes(profile.education)) {
                score += 10;
            } else {
                // Check if user's education meets minimum threshold
                const userEduIdx = getEducationIndex(profile.education);
                const schemeEduIndices = e.education.map(v => getEducationIndex(v)).filter(i => i >= 0);
                if (schemeEduIndices.length > 0) {
                    const minRequired = Math.min(...schemeEduIndices);
                    if (userEduIdx >= minRequired) score += 6;
                }
            }
        } else {
            score += 8; // no education restriction
        }

        // ── Disability Bonus (10 pts) ─────────────────────────
        maxPossible += 10;
        if (profile.disability === 'yes') {
            // Check if scheme specifically supports disabled
            const schemeText = [
                scheme.title || '',
                scheme.benefits || '',
                scheme.eligibility_summary || '',
                (scheme.tags || []).join(' ')
            ].join(' ').toLowerCase();

            if (schemeText.includes('disab') || schemeText.includes('divyang') ||
                schemeText.includes('handicap') || schemeText.includes('pwbd') ||
                schemeText.includes('differently abled')) {
                score += 10; // scheme explicitly supports disability
            } else {
                score += 5; // general scheme, mild disability bonus
            }
        } else {
            score += 7; // not disabled, neutral
        }

        // ── Marital Status Match (5 pts) ──────────────────────
        maxPossible += 5;
        if (profile.maritalStatus && e.maritalStatus && Array.isArray(e.maritalStatus)) {
            if (e.maritalStatus.includes(profile.maritalStatus.toLowerCase())) {
                score += 5;
            }
        } else {
            score += 4; // no marital restriction
        }

        // ── Normalize to 0-100 ────────────────────────────────
        const percentage = maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 50;
        return Math.min(percentage, 99);
    }


    /**
     * Main matching function — combines both phases.
     * Returns sorted array of eligible schemes with match scores.
     *
     * @param {Object} profile - User profile from form data
     * @param {Array} schemes - Array of scheme objects
     * @param {Object} [options] - Optional settings
     * @param {number} [options.minScore=40] - Minimum score threshold
     * @param {number} [options.maxResults=100] - Max results to return
     * @returns {Array} Sorted array of { scheme, score, quality }
     */
    function matchSchemes(profile, schemes, options = {}) {
        const minScore = options.minScore ?? 40;
        const maxResults = options.maxResults ?? 100;

        if (!profile || !schemes || !Array.isArray(schemes)) return [];

        const results = [];

        for (const scheme of schemes) {
            // Phase 1: Hard gates
            if (!passesHardGates(scheme, profile)) continue;

            // Phase 2: Weighted scoring
            const score = calculateRelevanceScore(scheme, profile);

            if (score >= minScore) {
                results.push({
                    ...scheme,
                    matchScore: score,
                    matchQuality: getMatchQuality(score)
                });
            }
        }

        // Sort by score descending, then by title alphabetically for ties
        results.sort((a, b) => {
            if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
            return (a.title || '').localeCompare(b.title || '');
        });

        return results.slice(0, maxResults);
    }


    /**
     * Generate a human-readable profile summary for the results header.
     */
    function getProfileSummary(profile) {
        const parts = [];
        if (profile.age) parts.push(`${profile.age} years`);
        if (profile.gender) parts.push(profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1));
        if (profile.state) {
            // Capitalize state name
            const stateName = profile.state.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            parts.push(stateName);
        }
        if (profile.area) parts.push(profile.area.charAt(0).toUpperCase() + profile.area.slice(1));
        if (profile.category) parts.push(profile.category.toUpperCase());
        if (profile.occupation) {
            const occLabel = profile.occupation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            parts.push(occLabel);
        }
        if (profile.income) {
            const incomeLabels = {
                'below-1l': 'Below ₹1L',
                '1l-2.5l': '₹1L–₹2.5L',
                '2.5l-5l': '₹2.5L–₹5L',
                '5l-8l': '₹5L–₹8L',
                '8l-10l': '₹8L–₹10L',
                'above-10l': 'Above ₹10L'
            };
            parts.push(incomeLabels[profile.income] || profile.income);
        }
        return parts.join(' · ');
    }


    // ════════════════════════════════════════════════════════════
    // EXPORT to global scope
    // ════════════════════════════════════════════════════════════

    global.ENHANCED_FORM_STEPS = ENHANCED_FORM_STEPS;

    global.RuleEngine = {
        matchSchemes,
        passesHardGates,
        calculateRelevanceScore,
        getMatchQuality,
        getProfileSummary,
        getIncomeIndex,
        getEducationIndex,
        getOccupationAliases,
        INCOME_HIERARCHY,
        EDUCATION_HIERARCHY
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            RuleEngine: global.RuleEngine,
            ENHANCED_FORM_STEPS,
            ...global.RuleEngine
        };
    }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
