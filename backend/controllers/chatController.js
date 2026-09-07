/* ============================================================
   Controller: Chat (RAG-Powered — Unified Pipeline)
   Delegates to backend/services/rag/pipeline.js
   ============================================================ */

'use strict';

require('dotenv').config();

const pipeline = require('../services/rag/pipeline');

// For debug endpoint
const vectorStore = require('../services/rag/vectorStore');
const { retrieve } = require('../services/rag/retriever');
const { rerank } = require('../services/rag/reranker');
const { buildContext } = require('../services/rag/contextBuilder');
const { validateGrounding } = require('../services/rag/grounding');
const { detectIntent } = require('../services/chatbot/intentDetector');
const { rewriteQuery } = require('../services/chatbot/queryRewriter');
const { extractProfile } = require('../services/chatbot/profileExtractor');
const { generateResponse, detectLanguage } = require('../services/chatbot/responseGenerator');

const TOP_K_RETRIEVAL = parseInt(process.env.TOP_K_RETRIEVAL) || 15;
const TOP_K_CONTEXT = parseInt(process.env.TOP_K_CONTEXT) || 5;
const RAG_DEBUG = process.env.RAG_DEBUG === 'true';

const ragService = require('../services/ragService');

// ── POST /api/chat ────────────────────────────────────────────
exports.chat = async (req, res) => {
    const { message, sessionId, language: preferredLanguage } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    try {
        const result = await pipeline.process({
            query: message.trim(),
            language: preferredLanguage || 'auto',
            sessionId,
            source: 'chat'
        });

        // Map pipeline output to the existing chat response format
        // so existing frontend code keeps working without changes
        return res.json({
            success: result.success,
            message: result.answer,          // Frontend reads `message`
            language: result.language,
            intent: result.intent,
            schemes: (result.schemes || []).map(s => ({
                // Keep old keys the frontend uses
                id: s.scheme_id,
                title: s.scheme_name,
                category: s.category,
                state: s.state,
                applyLink: s.official_source_url,
                verified: s.verified,
                relevanceScore: s.relevance_score,
                // NEW fields for eligibility display
                eligibility_status: s.eligibility_status,
                matched_criteria: s.matched_criteria,
                missing_information: s.missing_information,
                failed_criteria: s.failed_criteria
            })),
            sources: result.sources,
            follow_up_questions: result.follow_up_questions,
            confidence: result.confidence,
            grounded: result.grounded,
            sessionId: result.sessionId,
            profile: result.profile,
            timestamp: new Date().toISOString(),
            ...(RAG_DEBUG ? { debug: result.debug } : {})
        });

    } catch (err) {
        console.error('[ChatController] Error:', err);

        return res.json({
            success: true,
            message: "I'm temporarily unable to process your request. Please try again shortly.",
            language: 'en',
            intent: 'ERROR',
            schemes: [],
            sources: [],
            follow_up_questions: [],
            sessionId,
            confidence: 0,
            timestamp: new Date().toISOString(),
            ...(RAG_DEBUG ? { debug: { error: err.message } } : {})
        });
    }
};

// ── POST /api/chat/debug — Development RAG diagnostic ─────────
exports.debugChat = async (req, res) => {
    const message = (req.body.message || req.body.query || '').trim();
    const preferredLang = req.body.language;
    const sessionId = req.body.sessionId || 'debug_session';

    if (!message) {
        return res.status(400).json({ error: 'Query or message is required' });
    }

    try {
        const detectedLanguage = preferredLang || detectLanguage(message);
        const { session } = extractProfile(message, sessionId);
        const intentResult = detectIntent(message, detectedLanguage, session);
        const structuredQuery = rewriteQuery(message, intentResult.intent, detectedLanguage, session);

        const retrievalResults = await retrieve(structuredQuery, TOP_K_RETRIEVAL);
        const rerankedResults = rerank(retrievalResults, structuredQuery, session.profile, TOP_K_CONTEXT);
        const { systemPrompt } = buildContext(rerankedResults, structuredQuery, detectedLanguage, session.profile);
        const llmResponse = await generateResponse(systemPrompt, message, session.conversationHistory, detectedLanguage);
        const groundingResult = validateGrounding(llmResponse, rerankedResults, structuredQuery);

        const uniqueSchemes = [...new Set(rerankedResults.map(r => r.metadata?.title).filter(Boolean))];

        return res.json({
            originalQuery: message,
            detectedLanguage,
            intent: intentResult.intent,
            extractedFilters: structuredQuery.filters || {},
            rewrittenQuery: structuredQuery.text,
            keywordResults: retrievalResults.filter(r => r.source === 'keyword' || r.source === 'catalog')
                .map(r => ({ title: r.metadata?.title, score: r.score })),
            vectorResults: retrievalResults.filter(r => r.source === 'semantic')
                .map(r => ({ title: r.metadata?.title, score: r.score })),
            mergedResults: retrievalResults.map(r => ({ title: r.metadata?.title, score: r.score, source: r.source })),
            rerankedResults: rerankedResults.map(r => ({ title: r.metadata?.title, score: r.rerankScore })),
            uniqueSchemes,
            finalContext: systemPrompt,
            groundingCheck: {
                isGrounded: groundingResult.isGrounded,
                warnings: groundingResult.warnings
            },
            finalAnswer: groundingResult.cleanedResponse
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
