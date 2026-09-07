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
        const title = (scheme.title || '').toLowerCase();
        const ministry = (scheme.ministry || '').toLowerCase();
        const state = (scheme.state || '').toLowerCase();
        const category = (scheme.category || '').toLowerCase();
        const benefits = (scheme.benefits || '').toLowerCase();
        const elig = (scheme.eligibility_summary || '').toLowerCase();
        const tags = Array.isArray(scheme.tags) ? scheme.tags : [];

        return (
            title.includes(query) ||
            ministry.includes(query) ||
            state.includes(query) ||
            category.includes(query) ||
            benefits.includes(query) ||
            elig.includes(query) ||
            tags.some(tag => (tag || '').toLowerCase().includes(query))
        );
    });

    res.json({
        success: true,
        query,
        total:   results.length,
        data:    results
    });
};
