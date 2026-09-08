/* ============================================================
   Routes: Feedback
   Saves feedback to Supabase (primary) with local JSON fallback.
   ============================================================ */

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const supabase = require('../services/supabaseService');

const FEEDBACK_FILE = path.join(__dirname, '..', 'data', 'feedback.json');

// Initialize local fallback file
if (!fs.existsSync(FEEDBACK_FILE)) {
    try { fs.writeFileSync(FEEDBACK_FILE, '[]'); } catch (_) {}
}

// POST /api/feedback — Submit feedback on a response
router.post('/', async (req, res) => {
    const { sessionId, messageId, rating, reason, query, response } = req.body;

    if (!rating) {
        return res.status(400).json({ success: false, error: 'Rating is required (positive/negative)' });
    }

    const feedbackObj = {
        id:        `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        sessionId, messageId, rating, reason, query,
        response:  (response || '').substring(0, 500),
        timestamp: new Date().toISOString()
    };

    // Primary: Supabase
    const sbResult = await supabase.saveFeedback({ sessionId, messageId, rating, reason, query, response });

    // Fallback: local JSON (always write for local dev)
    try {
        const existing = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));
        existing.push(feedbackObj);
        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(existing, null, 2));
    } catch (_) {}

    res.json({
        success: true,
        message: 'Thank you for your feedback!',
        stored:  sbResult.success ? 'supabase' : 'local'
    });
});

// GET /api/feedback/stats — Feedback statistics
router.get('/stats', async (req, res) => {
    // Try Supabase first
    const sbStats = await supabase.getFeedbackStats();
    if (sbStats) {
        return res.json({ success: true, data: sbStats });
    }

    // Fallback: local file
    try {
        const feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));
        const stats = {
            total:    feedbacks.length,
            positive: feedbacks.filter(f => f.rating === 'positive').length,
            negative: feedbacks.filter(f => f.rating === 'negative').length,
            reasons:  {},
            source:   'local'
        };
        feedbacks.filter(f => f.reason).forEach(f => {
            stats.reasons[f.reason] = (stats.reasons[f.reason] || 0) + 1;
        });
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/feedback/health — Supabase connectivity check
router.get('/health', async (req, res) => {
    const health = await supabase.healthCheck();
    res.json({ success: true, supabase: health });
});

module.exports = router;