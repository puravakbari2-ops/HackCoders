/* ============================================================
   Controller: Schemes
   Handles scheme listing, detail, categories & AI recommendation
   ============================================================ */

const path    = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

let RuleEngine;
try {
    const ruleEngineModule = require(path.join(__dirname, '..', '..', 'rule-engine.js'));
    RuleEngine = ruleEngineModule.RuleEngine || ruleEngineModule;
} catch (e) {
    console.warn('RuleEngine module could not be loaded, using fallback scoring:', e.message);
}

// ── GET /api/schemes ─────────────────────────────────────────
// List all schemes with optional pagination
exports.getAllSchemes = (req, res) => {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end   = start + limit;

    const paginated = schemes.slice(start, end);

    res.json({
        success: true,
        data: paginated,
        pagination: {
            total:       schemes.length,
            page,
            limit,
            totalPages:  Math.ceil(schemes.length / limit)
        }
    });
};

// ── GET /api/schemes/categories ──────────────────────────────
// Returns distinct categories with counts
exports.getCategories = (req, res) => {
    const categoryMap = {};

    schemes.forEach(s => {
        if (!categoryMap[s.category]) {
            categoryMap[s.category] = { name: s.category, count: 0, type: s.type };
        }
        categoryMap[s.category].count++;
    });

    res.json({
        success: true,
        data: Object.values(categoryMap).sort((a, b) => b.count - a.count)
    });
};

// ── GET /api/schemes/:id ─────────────────────────────────────
// Get a single scheme by ID
exports.getSchemeById = (req, res, next) => {
    const scheme = schemes.find(s => String(s.id) === String(req.params.id));

    if (!scheme) {
        const err = new Error(`Scheme with ID ${req.params.id} not found`);
        err.statusCode = 404;
        return next(err);
    }

    res.json({ success: true, data: scheme });
};

// ── POST /api/schemes/recommend ──────────────────────────────
// AI-powered scheme matching based on user profile
exports.recommendSchemes = (req, res) => {
    const profile = req.body || {};

    if (RuleEngine && typeof RuleEngine.matchSchemes === 'function') {
        const minScore = parseInt(req.query.minScore) || 40;
        const limit = parseInt(req.query.limit) || 100;
        const matched = RuleEngine.matchSchemes(profile, schemes, {
            minScore,
            maxResults: limit
        });

        return res.json({
            success: true,
            total: matched.length,
            profileSummary: RuleEngine.getProfileSummary ? RuleEngine.getProfileSummary(profile) : '',
            profile,
            data: matched
        });
    }

    // Fallback if RuleEngine is not loaded
    const {
        gender,
        age,
        state,
        area,
        category,
        disability,
        income,
        occupation,
        education,
        maritalStatus
    } = profile;

    const ageNum = parseInt(age) || 25;

    const scored = schemes.map(scheme => {
        let score = 0;
        const e   = scheme.eligibility;
        if (!e) return { ...scheme, matchScore: 50, matchQuality: 'Partial Match' };

        if (ageNum >= e.minAge && ageNum <= e.maxAge) score += 25;
        if (gender && e.gender && e.gender.includes(gender.toLowerCase())) score += 15;
        if (area && e.area && e.area.includes(area.toLowerCase())) score += 10;
        if (category && e.category && e.category.includes(category.toLowerCase())) score += 15;
        if (income && e.income && e.income.includes(income)) score += 15;
        if (occupation && e.occupation && e.occupation.includes(occupation.toLowerCase())) score += 15;

        if (maritalStatus && e.maritalStatus) {
            if (e.maritalStatus.includes(maritalStatus.toLowerCase())) score += 5;
        } else {
            score += 5;
        }

        if (education && e.education) {
            if (e.education.includes(education.toLowerCase())) score += 10;
        } else {
            score += 5;
        }

        if (disability === 'yes') score += 5;

        const matchPercent = Math.min(Math.round((score / 105) * 100), 99);
        const quality = matchPercent >= 85 ? 'Excellent Match' : (matchPercent >= 65 ? 'Good Match' : (matchPercent >= 50 ? 'Partial Match' : 'Low Match'));

        return {
            ...scheme,
            matchScore: matchPercent,
            matchQuality: quality
        };
    });

    const recommended = scored
        .filter(s => s.matchScore >= 40)
        .sort((a, b) => b.matchScore - a.matchScore);

    res.json({
        success:      true,
        total:        recommended.length,
        profile:      { gender, age: ageNum, state, area, category, income, occupation },
        data:         recommended
    });
};
