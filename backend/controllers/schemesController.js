/* ============================================================
   Controller: Schemes
   Handles scheme listing, detail, categories & AI recommendation
   ============================================================ */

const path    = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

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
    const scheme = schemes.find(s => s.id === req.params.id);

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
    } = req.body;

    const ageNum = parseInt(age) || 25;

    // Score each scheme against the user profile
    const scored = schemes.map(scheme => {
        let score = 0;
        const e   = scheme.eligibility;

        // Age check
        if (ageNum >= e.minAge && ageNum <= e.maxAge) score += 25;

        // Gender match
        if (gender && e.gender && e.gender.includes(gender.toLowerCase())) score += 15;

        // Area match
        if (area && e.area && e.area.includes(area.toLowerCase())) score += 10;

        // Category/Caste match
        if (category && e.category && e.category.includes(category.toLowerCase())) score += 15;

        // Income match
        if (income && e.income && e.income.includes(income)) score += 15;

        // Occupation match
        if (occupation && e.occupation && e.occupation.includes(occupation.toLowerCase())) score += 15;

        // Marital status match (optional)
        if (maritalStatus && e.maritalStatus) {
            if (e.maritalStatus.includes(maritalStatus.toLowerCase())) score += 5;
        } else {
            score += 5; // No restriction on marital status
        }

        // Education match (optional)
        if (education && e.education) {
            if (e.education.includes(education.toLowerCase())) score += 10;
        } else {
            score += 5;
        }

        // Disability bonus
        if (disability === 'yes') score += 5;

        // Normalize to 0–100
        const matchPercent = Math.min(Math.round((score / 105) * 100), 99);

        return {
            ...scheme,
            matchScore: matchPercent + '%'
        };
    });

    // Filter > 40% match and sort descending
    const recommended = scored
        .filter(s => parseInt(s.matchScore) >= 40)
        .sort((a, b) => parseInt(b.matchScore) - parseInt(a.matchScore));

    res.json({
        success:      true,
        total:        recommended.length,
        profile:      { gender, age: ageNum, state, area, category, income, occupation },
        data:         recommended
    });
};
