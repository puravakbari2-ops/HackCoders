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
        if (!scheme) return false;
        const e = scheme.eligibility || {};

        const schemeTitle = (scheme.title || '').toLowerCase();
        const schemeSummary = (scheme.eligibility_summary || '').toLowerCase();
        const schemeBenefits = (scheme.benefits || '').toLowerCase();
        const schemeText = schemeTitle + ' ' + schemeSummary + ' ' + schemeBenefits;

        const userGender = (profile.gender || '').toLowerCase().trim();
        const userState = normalizeState(profile.state);
        const userMarital = (profile.maritalStatus || '').toLowerCase().trim();
        const userOcc = (profile.occupation || '').toLowerCase().trim();
        const userDisability = (profile.disability || '').toLowerCase().trim();
        const userCategory = (profile.category || '').toLowerCase().trim();
        const userIncome = (profile.income || '').toLowerCase().trim();

        // ── Gate 1: Age Range ──
        if (profile.age != null && profile.age !== '') {
            const ageNum = parseInt(profile.age);
            if (!isNaN(ageNum)) {
                if (e.minAge != null && ageNum < e.minAge) return false;
                if (e.maxAge != null && ageNum > e.maxAge) return false;
            }
        }

        // ── Gate 2: Gender Inclusion ──
        if (userGender && e.gender && Array.isArray(e.gender) && e.gender.length > 0) {
            const allowedGenders = e.gender.map(g => g.toLowerCase().trim());
            if (!allowedGenders.includes(userGender)) return false;
        }

        // ── Gate 3: State Restriction ──
        if (scheme.type === 'state') {
            const schemeState = normalizeState(scheme.state);
            if (schemeState && userState && schemeState !== userState && schemeState !== 'all india') {
                return false;
            }
        }

        // ── Gate 4: Marital Status & Widow Protection ──
        // Check if scheme is specifically designed for widows / destitute women
        const isWidowScheme = schemeText.includes('widow') ||
            schemeText.includes('destitute women') ||
            (e.maritalStatus && Array.isArray(e.maritalStatus) && e.maritalStatus.includes('widowed') && !e.maritalStatus.includes('single') && !e.maritalStatus.includes('married'));

        if (isWidowScheme) {
            // Males cannot qualify for widow schemes
            if (userGender === 'male') return false;
            // Non-widows cannot qualify
            if (userMarital && userMarital !== 'widowed') return false;
        }

        // Strict marital status mismatch check
        if (userMarital && e.maritalStatus && Array.isArray(e.maritalStatus) && e.maritalStatus.length > 0) {
            const allowedMarital = e.maritalStatus.map(m => m.toLowerCase().trim());
            if (!allowedMarital.includes(userMarital)) {
                return false;
            }
        }

        // ── Gate 5: Occupation Isolation ──
        if (userOcc) {
            const occAliases = getOccupationAliases(userOcc);

            // A. Student-exclusive schemes (Scholarships, Fellowships, Internships)
            const isStudentExclusive = (e.occupation && Array.isArray(e.occupation) && e.occupation.length === 1 && e.occupation[0] === 'student') ||
                ((schemeTitle.includes('scholarship') || schemeTitle.includes('fellowship') || schemeTitle.includes('internship')) &&
                 !schemeTitle.includes('ex-servicemen') && !schemeTitle.includes('war widow') && !schemeTitle.includes('artistes') && !schemeTitle.includes('award of'));

            if (isStudentExclusive && userOcc !== 'student') {
                return false;
            }

            // B. Farmer-exclusive schemes (PM-KISAN, Krishi, Fasal Bima, Soil Health Card)
            const isFarmerExclusive = (e.occupation && Array.isArray(e.occupation) && e.occupation.length === 1 && e.occupation[0] === 'farmer') ||
                schemeTitle.includes('pm-kisan') || schemeTitle.includes('kisan credit') || schemeTitle.includes('fasal bima') ||
                schemeTitle.includes('soil health card') || (schemeTitle.includes('krishi') && !schemeTitle.includes('scholarship'));

            if (isFarmerExclusive && userOcc !== 'farmer') {
                return false;
            }

            // C. Retired/Senior citizen pensions vs young citizens / students
            const isRetiredExclusive = (e.occupation && Array.isArray(e.occupation) && e.occupation.length === 1 && e.occupation[0] === 'retired') ||
                (e.minAge >= 60 && (schemeTitle.includes('old age pension') || schemeTitle.includes('senior citizen')));

            if (isRetiredExclusive && (userOcc === 'student' || (profile.age && parseInt(profile.age) < 50))) {
                return false;
            }

            // D. Specific occupation restricted subset check (<= 4 occupations)
            if (e.occupation && Array.isArray(e.occupation) && e.occupation.length > 0 && e.occupation.length <= 4) {
                const hasOverlap = occAliases.some(a => e.occupation.includes(a));
                if (!hasOverlap) {
                    return false;
                }
            }
        }

        // ── Gate 6: Disability Gate ──
        if (userDisability === 'no') {
            const isExclusivelyDisabled =
                (e.disability === 'yes' && (!e.disabilityType || e.disabilityType !== 'none')) ||
                (Array.isArray(e.disability) && e.disability.length === 1 && e.disability[0] === 'yes') ||
                schemeTitle.includes('divyang') ||
                schemeTitle.includes('disabled') ||
                schemeTitle.includes('disability') ||
                schemeTitle.includes('differently abled') ||
                schemeTitle.includes('specially-abled') ||
                schemeTitle.includes('viklangjan') ||
                schemeTitle.includes('pwds') ||
                schemeTitle.includes('udid') ||
                schemeTitle.includes('swavlamban card') ||
                schemeTitle.includes('aids and appliances') ||
                schemeText.includes('persons with benchmark disabilities') ||
                schemeText.includes('for disabled persons') ||
                schemeText.includes('assistance to disabled');

            // General mass insurance schemes like PMSBY or ESI mention accidental disability compensation, not disability eligibility
            const isMassInsurance = schemeTitle.includes('suraksha bima') ||
                                    schemeTitle.includes('state insurance') ||
                                    schemeTitle.includes('jeevan jyoti');

            if (isExclusivelyDisabled && !isMassInsurance) return false;
        }

        // ── Gate 7: Social Category / Reservation Gate ──
        if (userCategory && e.category && Array.isArray(e.category) && e.category.length > 0) {
            const allowedCats = e.category.map(c => c.toLowerCase().trim());
            if (!allowedCats.includes('all')) {
                if (userCategory === 'general' && !allowedCats.includes('general')) return false;
                if (userCategory === 'obc' && !allowedCats.includes('obc') && !allowedCats.includes('general')) return false;
                if (userCategory === 'sc' && !allowedCats.includes('sc') && !allowedCats.includes('general')) return false;
                if (userCategory === 'st' && !allowedCats.includes('st') && !allowedCats.includes('general')) return false;
            }
        }

        // ── Gate 8: Income Ceiling Gate (Strict Hierarchy Check) ──
        if (userIncome && e.income && Array.isArray(e.income) && e.income.length > 0) {
            const uIdx = getIncomeIndex(userIncome);
            const sIdxs = e.income.map(i => getIncomeIndex(i)).filter(idx => idx >= 0);
            if (uIdx >= 0 && sIdxs.length > 0) {
                const maxAllowedIncomeIdx = Math.max(...sIdxs);
                if (uIdx > maxAllowedIncomeIdx) return false;
            }
        }

        return true;
    }


    /**
     * Phase 2: Weighted Relevance Scoring
     * Scores a scheme against the user profile on a 50-98 scale.
     * Schemes with direct target affinity (widow, student, farmer, employee, etc.)
     * score 75-98% and are prioritized. Generic mass infrastructure schemes score ~50%.
     */
    function calculateRelevanceScore(scheme, profile) {
        const e = scheme.eligibility || {};
        const title = (scheme.title || '').toLowerCase();
        const text = (title + ' ' + (scheme.eligibility_summary || '') + ' ' + (scheme.benefits || '') + ' ' + (scheme.tags || []).join(' ')).toLowerCase();

        const userOcc = (profile.occupation || '').toLowerCase().trim();
        const userMarital = (profile.maritalStatus || '').toLowerCase().trim();
        const userGender = (profile.gender || '').toLowerCase().trim();
        const userState = normalizeState(profile.state);
        const userCategory = (profile.category || '').toLowerCase().trim();

        let affinity = 0;
        let hasTarget = false;

        // 1. Marital / Widow Target Affinity
        if (userMarital === 'widowed' && (text.includes('widow') || text.includes('destitute') || (e.maritalStatus && e.maritalStatus.includes('widowed')))) {
            affinity += 35;
            hasTarget = true;
        }

        // 2. Occupation Specific Affinity
        if (userOcc === 'student' && (title.includes('scholarship') || title.includes('fellowship') || title.includes('internship') || (e.occupation && e.occupation.length <= 2 && e.occupation.includes('student')))) {
            affinity += 35;
            hasTarget = true;
        } else if (userOcc === 'farmer' && (title.includes('kisan') || title.includes('krishi') || title.includes('crop') || (e.occupation && e.occupation.length <= 2 && e.occupation.includes('farmer')))) {
            affinity += 35;
            hasTarget = true;
        } else if (userOcc === 'salaried' && (title.includes('pension') || title.includes('provident') || title.includes('employee') || title.includes('insurance') || title.includes('nps') || (e.occupation && e.occupation.includes('salaried')))) {
            affinity += 30;
            hasTarget = true;
        } else if ((userOcc === 'self-employed' || userOcc === 'business-owner') && (title.includes('mudra') || title.includes('msme') || title.includes('pmegp') || title.includes('loan') || title.includes('credit') || title.includes('stand-up') || title.includes('enterprise'))) {
            affinity += 30;
            hasTarget = true;
        } else if (userOcc === 'homemaker' && (text.includes('ujjwala') || text.includes('mahila') || text.includes('lpg') || (e.occupation && e.occupation.includes('homemaker')))) {
            affinity += 25;
            hasTarget = true;
        } else if (userOcc === 'unemployed' && (title.includes('skill') || title.includes('kaushal') || title.includes('training') || title.includes('rozgar') || (e.occupation && e.occupation.includes('unemployed')))) {
            affinity += 25;
            hasTarget = true;
        }

        // 3. State-Specific Affinity
        if (scheme.type === 'state' && userState && normalizeState(scheme.state) === userState) {
            affinity += 25;
            hasTarget = true;
        }

        // 4. Female / Women Empowerment Affinity
        if (userGender === 'female' && (text.includes('women') || text.includes('mahila') || text.includes('kanya') || text.includes('maternity') || (e.gender && e.gender.length === 1 && e.gender[0] === 'female'))) {
            affinity += 18;
            hasTarget = true;
        }

        // 5. Social Category Affirmative Action Affinity
        if (userCategory && userCategory !== 'general' && e.category && Array.isArray(e.category) && e.category.includes(userCategory) && e.category.length <= 3) {
            affinity += 15;
            hasTarget = true;
        }

        const base = hasTarget ? 65 : 50;
        const score = base + affinity;
        return Math.min(Math.max(score, 60), 98);
    }


    /**
     * Main matching function — combines both phases.
     * Returns sorted array of eligible schemes with match scores.
     *
     * @param {Object} profile - User profile from form data
     * @param {Array} schemes - Array of scheme objects
     * @param {Object} [options] - Optional settings
     * @param {number} [options.minScore=75] - Minimum score threshold for personalized relevance
     * @param {number|null} [options.maxResults=null] - Optional limit (null returns all matching)
     * @returns {Array} Sorted array of { scheme, score, quality }
     */
    function matchSchemes(profile, schemes, options = {}) {
        const minScore = options.minScore ?? 75;
        const maxResults = options.maxResults ?? null;

        if (!profile || !schemes || !Array.isArray(schemes)) return [];

        const results = [];

        for (const scheme of schemes) {
            // Phase 1: Hard gates
            if (!passesHardGates(scheme, profile)) continue;

            // Phase 2: Weighted relevance scoring
            const score = calculateRelevanceScore(scheme, profile);

            if (score >= minScore) {
                results.push({
                    ...scheme,
                    matchScore: score,
                    matchQuality: getMatchQuality(score)
                });
            }
        }

        // Sort by score descending; break ties by prioritizing state/targeted schemes over central generic
        results.sort((a, b) => {
            if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
            // Prefer state-specific schemes over generic central schemes if scores tie
            if (a.type !== b.type) {
                return a.type === 'state' ? -1 : 1;
            }
            return (a.title || '').localeCompare(b.title || '');
        });

        // Only slice if a valid positive maxResults limit was explicitly requested
        if (typeof maxResults === 'number' && maxResults > 0) {
            return results.slice(0, maxResults);
        }

        return results;
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
