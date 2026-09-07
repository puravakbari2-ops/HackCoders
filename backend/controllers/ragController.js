/* ============================================================
   Controller: RAG Query
   Unified endpoint for both text and voice queries.

   POST /api/rag/query
   Body: {
     query: string,           // User's message (required)
     language: 'en'|'hi'|'gu'|'auto',  // Default: 'auto'
     user_profile: Object,   // Optional profile override
     conversation_id: string // Session ID
   }

   Response: {
     language, answer, schemes[], follow_up_questions[], sources[],
     sessionId, confidence, grounded, elapsed_ms
   }
   ============================================================ */

'use strict';

require('dotenv').config();

const pipeline = require('../services/rag/pipeline');

// ── POST /api/rag/query ───────────────────────────────────────
exports.query = async (req, res) => {
    const {
        query,
        message,               // Alias used by voice.js
        language,
        user_profile,          // Optional profile override
        conversation_id,       // Session ID alias
        sessionId              // Direct session ID
    } = req.body;

    const userMessage = (query || message || '').trim();

    if (!userMessage) {
        return res.status(400).json({
            success: false,
            error: 'query (or message) is required and cannot be empty'
        });
    }

    try {
        const result = await pipeline.process({
            query: userMessage,
            language: language || 'auto',
            userProfile: user_profile || null,
            sessionId: sessionId || conversation_id || null,
            source: 'rag_api'
        });

        return res.json(result);

    } catch (err) {
        console.error('[RagController] Pipeline error:', err.message);

        const lang = (language && language !== 'auto') ? language : 'en';

        const errorMessages = {
            en: "I'm temporarily unable to process your request. Please try again shortly.",
            hi: "मैं अभी आपका अनुरोध संसाधित नहीं कर सकता। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
            gu: "હું અત્યારે તમારી વિનંતી પ્રક્રિયા કરી શકતો નથી. કૃપા કરીને થોડીવાર પછી ફરી પ્રયાસ કરો."
        };

        return res.status(500).json({
            success: false,
            language: lang,
            answer: errorMessages[lang] || errorMessages.en,
            error: process.env.NODE_ENV === 'development' ? err.message : undefined,
            schemes: [],
            follow_up_questions: [],
            sources: []
        });
    }
};

// ── GET /api/rag/status ───────────────────────────────────────
exports.status = (req, res) => {
    const vectorStore = require('../services/rag/vectorStore');
    const { getSchemeCount } = require('../services/eligibility/eligibilityEngine');
    const stats = vectorStore.getStats();

    res.json({
        success: true,
        pipeline: 'active',
        vector_index: {
            loaded: stats.isLoaded,
            vector_count: stats.vectorCount || 0,
            last_indexed: stats.lastIndexed || null,
            embedding_model: stats.embeddingModel || process.env.EMBEDDING_MODEL || 'gemini-embedding-001'
        },
        knowledge_base: {
            scheme_count: getSchemeCount(),
            source: 'backend/data/schemes.json'
        },
        llm_model: process.env.LLM_MODEL || 'gemini-3.6-flash',
        languages: ['en', 'hi', 'gu'],
        timestamp: new Date().toISOString()
    });
};
