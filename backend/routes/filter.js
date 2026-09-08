/* ============================================================
   Routes: Filter
   Exposes filter options and applies pre-RAG deterministic filtering
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { filterSchemes, getFilterOptions } = require('../services/filterService');
const path    = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

// GET /api/filter/options  → returns all filter option values from scheme data
router.get('/options', (req, res) => {
    try {
        const options = getFilterOptions();
        res.json({ success: true, data: options });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/filter/apply   → count how many schemes pass the filters (no RAG)
router.post('/apply', (req, res) => {
    try {
        const filters = req.body || {};
        const result  = filterSchemes(schemes, filters);
        res.json({
            success:   true,
            count:     result.count,
            schemeIds: result.schemeIds,
            total:     schemes.length
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
