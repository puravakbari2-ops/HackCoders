/* ============================================================
   Routes: Knowledge Base
   ============================================================ */

const express = require('express');
const router = express.Router();
const vectorStore = require('../services/rag/vectorStore');
const { getSchemeCount } = require('../services/eligibility/eligibilityEngine');

const fs = require('fs');
const path = require('path');

// GET /api/knowledge-base/status — Get detailed index and database status (Part 3)
router.get('/status', (req, res) => {
    try {
        const stats = vectorStore.getStats();
        const schemesPath = path.join(__dirname, '..', 'data', 'schemes.json');
        let schemes = [];
        if (fs.existsSync(schemesPath)) {
            schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf-8'));
        }

        const categories = {};
        const states = {};
        const seenIds = new Set();
        let duplicates = 0;
        let invalidRecords = 0;

        for (const s of schemes) {
            if (!s.title) {
                invalidRecords++;
                continue;
            }
            if (s.id) {
                if (seenIds.has(s.id)) {
                    duplicates++;
                } else {
                    seenIds.add(s.id);
                }
            }

            const cat = s.category || 'Uncategorized';
            categories[cat] = (categories[cat] || 0) + 1;

            const st = s.state || 'All India';
            states[st] = (states[st] || 0) + 1;
        }

        res.json({
            totalSchemes: schemes.length,
            indexedSchemes: stats.isLoaded ? (stats.schemeCount || schemes.length) : 0,
            totalChunks: stats.vectorCount || 0,
            categories,
            states,
            duplicates,
            invalidRecords
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/knowledge-base/ingest — Trigger re-indexing
router.post('/ingest', async (req, res) => {
    try {
        const { ingest } = require('../services/rag/ingestion');
        const force = req.body.force || false;

        // Run in background-ish (respond immediately, log results)
        res.json({
            success: true,
            message: 'Ingestion started. This may take a few minutes.',
            note: 'Use GET /api/knowledge-base/status to check progress.'
        });

        // Run ingestion after response is sent
        try {
            const results = await ingest({ force });
            console.log('[KnowledgeBase] Ingestion completed:', results);
        } catch (err) {
            console.error('[KnowledgeBase] Ingestion failed:', err.message);
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
