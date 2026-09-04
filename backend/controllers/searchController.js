/* ============================================================
   Controller: Search
   Full-text search across scheme title, ministry, tags, benefits
   ============================================================ */

const path    = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

// ── GET /api/search?q=query ───────────────────────────────────
exports.search = (req, res) => {
    const query = (req.query.q || '').trim().toLowerCase();

    if (!query || query.length < 2) {
        return res.status(400).json({
            success: false,
            error: 'Search query must be at least 2 characters long'
        });
    }

    const results = schemes.filter(scheme => {
        return (
            scheme.title.toLowerCase().includes(query)           ||
            scheme.ministry.toLowerCase().includes(query)        ||
            (scheme.state && scheme.state.toLowerCase().includes(query)) ||
            scheme.category.toLowerCase().includes(query)        ||
            scheme.benefits.toLowerCase().includes(query)        ||
            scheme.eligibility_summary.toLowerCase().includes(query) ||
            scheme.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    res.json({
        success: true,
        query,
        total:   results.length,
        data:    results
    });
};
