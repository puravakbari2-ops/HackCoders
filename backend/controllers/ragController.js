/* ============================================================
   Controller: RAG
   Unified RAG controller handling:
   1. Profile-based scheme recommendation with deterministic pre-filters
   2. Conversational natural language & voice RAG queries
   3. Pipeline health and index stats

   POST /api/rag/query   → recommendation (profile/filters) OR unified query (text/voice)
   POST /api/rag/chat    → natural language chat
   GET  /api/rag/status  → pipeline health check and vector stats
   ============================================================ */

'use strict';

require('dotenv').config();
const path = require('path');
const pipeline = require('../services/rag/pipeline');
const ragService = require('../services/ragService');
const { filterSchemes } = require('../services/filterService');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

// ── POST /api/rag/query ───────────────────────────────────────
// Unified endpoint supporting both:
// - Profile-based recommendation with pre-filters: { profile, filters?, query?, options? }
// - Natural language / voice queries: { query/message, language?, user_profile?, sessionId? }
exports.query = async (req, res) => {
    const {
        query,
        message,               // Alias used by voice.js
        language,
        user_profile,          // Optional profile override
        conversation_id,       // Session ID alias
        sessionId,             // Direct session ID
        profile,               // Profile object for scheme recommendations
        filters,               // Deterministic pre-filters
        options
    } = req.body;

    const userMessage = (query || message || '').trim();

    // ── Branch A: Profile-based Recommendation with Scheme Filters ──
    // Active when a profile object is supplied and request is for recommendations/filters
    if (profile && typeof profile === 'object' && (!userMessage || filters || options)) {
        try {
            // Step 1: Apply deterministic filters BEFORE RAG
            let preFilteredIds = null;
            let filterStats = null;

            if (filters && typeof filters === 'object' && Object.keys(filters).length > 0) {
                const filterResult = filterSchemes(schemes, filters);
                preFilteredIds = filterResult.schemeIds;
                filterStats = {
                    filtersApplied: true,
                    totalSchemes: schemes.length,
                    afterFilter: filterResult.count,
                    activeFilters: Object.keys(filters).filter(k => filters[k] !== null && filters[k] !== undefined && filters[k] !== '')
                };
            }

            // Step 2: Run RAG pipeline (restricted to filtered IDs)
            const result = await ragService.query(profile, {
                topK: options?.topK || 10,
                includeExplanations: options?.includeExplanations !== false,
                userQuery: userMessage || '',
                preFilteredIds,
                filters: filters || null,
                filterStats
            });

            // Step 3: Return with filter stats
            return res.json({
                ...result,
                filterStats: filterStats || { filtersApplied: false, totalSchemes: schemes.length }
            });

        } catch (err) {
            console.error('[RagController] RAG query error:', err);
            return res.status(500).json({
                success: false,
                error: 'RAG pipeline error: ' + err.message
            });
        }
    }

    // ── Branch B: Conversational / Voice RAG Query ──────────────
    // Unified endpoint for text and voice queries using RAG pipeline orchestrator
    if (userMessage) {
        try {
            const result = await pipeline.process({
                query: userMessage,
                language: language || 'auto',
                userProfile: user_profile || profile || null,
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
    }

    // Neither profile nor user message provided
    return res.status(400).json({
        success: false,
        error: 'Either "profile" object (for scheme recommendation) or "query"/"message" string (for conversational RAG) is required.'
    });
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
            success: true,
            message: result.answer,
            mentionedSchemes: result.mentionedSchemes || [],
            suggestFindSchemes: result.suggestFindSchemes || false,
            source: result.source || 'rag-pipeline',
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('[RagController] RAG chat error:', err);
        res.status(500).json({
            success: false,
            error: 'Chat processing error: ' + err.message
        });
    }
};

// ── GET /api/rag/status ───────────────────────────────────────
// Health check and stats for both vector store and RAG service
exports.status = (req, res) => {
    try {
        const vectorStore = require('../services/rag/vectorStore');
        const { getSchemeCount } = require('../services/eligibility/eligibilityEngine');
        const stats = vectorStore.getStats();

        let serviceStatus = {};
        try {
            serviceStatus = ragService.getStatus();
        } catch (_) {}

        res.json({
            success: true,
            pipeline: 'active',
            ...serviceStatus,
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
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
