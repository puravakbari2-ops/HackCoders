/* ============================================================
   Controller: RAG
   Handles RAG-powered scheme recommendations and chat queries
   POST /api/rag/query    → profile-based recommendation
   POST /api/rag/chat     → natural language chat
   GET  /api/rag/status   → pipeline health check
   ============================================================ */

const ragService = require('../services/ragService');

// ── POST /api/rag/query ─────────────────────────────────────
// Profile-based scheme recommendation through full RAG pipeline
exports.query = async (req, res) => {
    try {
        const { profile, query: userQuery, options } = req.body;

        if (!profile || typeof profile !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Missing or invalid "profile" object in request body.'
            });
        }

        const result = await ragService.query(profile, {
            topK: options?.topK || 10,
            includeExplanations: options?.includeExplanations !== false,
            userQuery: userQuery || ''
        });

        res.json(result);

    } catch (err) {
        console.error('RAG query error:', err);
        res.status(500).json({
            success: false,
            error: 'RAG pipeline error: ' + err.message
        });
    }
};

// ── POST /api/rag/chat ──────────────────────────────────────
// Natural language chat query with RAG-powered responses
exports.chat = async (req, res) => {
    try {
        const { message, profile } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Message cannot be empty.'
            });
        }

        const result = await ragService.chatQuery(message.trim(), profile || null);

        res.json({
            success:   true,
            message:   result.answer,
            mentionedSchemes: result.mentionedSchemes || [],
            suggestFindSchemes: result.suggestFindSchemes || false,
            source:    result.source || 'rag-pipeline',
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('RAG chat error:', err);
        res.status(500).json({
            success: false,
            error: 'Chat processing error: ' + err.message
        });
    }
};

// ── GET /api/rag/status ─────────────────────────────────────
// Health check for the RAG pipeline
exports.status = (req, res) => {
    try {
        const status = ragService.getStatus();
        res.json({
            success: true,
            ...status
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
