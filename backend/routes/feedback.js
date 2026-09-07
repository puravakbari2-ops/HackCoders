/* ============================================================
   Routes: Feedback
   ============================================================ */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const FEEDBACK_FILE = path.join(__dirname, '..', 'data', 'feedback.json');

// Initialize feedback file if it doesn't exist
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, '[]');
}

// POST /api/feedback — Submit feedback on a response
router.post('/', (req, res) => {
    const { sessionId, messageId, rating, reason, query, response } = req.body;

    if (!rating) {
        return res.status(400).json({ success: false, error: 'Rating is required (positive/negative)' });
    }

    try {
        const feedback = {
            id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            sessionId,
            messageId,
            rating,        // 'positive' or 'negative'
            reason,        // 'wrong_scheme', 'wrong_eligibility', 'wrong_benefit', etc.
            query,
            response: (response || '').substring(0, 500), // Store truncated response
            timestamp: new Date().toISOString()
        };

        // Append to feedback file
        const existing = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));
        existing.push(feedback);
        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(existing, null, 2));

        res.json({ success: true, message: 'Thank you for your feedback!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/feedback/stats — Get feedback statistics (debug only)
router.get('/stats', (req, res) => {
    try {
        const feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));

        const stats = {
            total: feedbacks.length,
            positive: feedbacks.filter(f => f.rating === 'positive').length,
            negative: feedbacks.filter(f => f.rating === 'negative').length,
            reasons: {}
        };

        feedbacks.filter(f => f.reason).forEach(f => {
            stats.reasons[f.reason] = (stats.reasons[f.reason] || 0) + 1;
        });

        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
