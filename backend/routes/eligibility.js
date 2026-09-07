/* ============================================================
   Routes: Eligibility
   ============================================================ */

const express = require('express');
const router = express.Router();
const { checkEligibility, checkMultipleSchemes, getSchemeById } = require('../services/eligibility/eligibilityEngine');

// POST /api/eligibility/check — Check eligibility for specific scheme(s)
router.post('/check', (req, res) => {
    const { profile, schemeId } = req.body;

    if (!profile) {
        return res.status(400).json({ success: false, error: 'User profile is required' });
    }

    try {
        if (schemeId) {
            // Check single scheme
            const result = checkEligibility(profile, schemeId);
            return res.json({ success: true, data: result });
        }

        // Check multiple schemes
        const options = {
            maxResults: parseInt(req.query.limit) || 20,
            minScore: parseInt(req.query.minScore) || 40,
            filterState: profile.state || null,
            filterCategory: req.query.category || null
        };

        const results = checkMultipleSchemes(profile, options);

        res.json({
            success: true,
            total: results.length,
            profile,
            data: results
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
