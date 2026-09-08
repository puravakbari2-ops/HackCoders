/* ============================================================
   JanSahay AI - Backend Server Entry Point
   Node.js + Express REST API with RAG Pipeline
   ============================================================ */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const fs = require('fs');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const schemesRouter = require('./routes/schemes');
const chatRouter = require('./routes/chat');
const searchRouter = require('./routes/search');
const voiceRouter = require('./routes/voice');
const ttsRouter = require('./routes/tts');
const eligibilityRouter = require('./routes/eligibility');
const feedbackRouter = require('./routes/feedback');
const knowledgeBaseRouter = require('./routes/knowledgeBase');
const ragRouter = require('./routes/rag');
const filterRouter = require('./routes/filter');
const authRouter = require('./routes/auth');

// RAG Services
const vectorStore = require('./services/rag/vectorStore');
const { getSchemeCount } = require('./services/eligibility/eligibilityEngine');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enforce UTF-8 Content-Type on all JSON API responses (Part 14)
app.use((req, res, next) => {
    const origJson = res.json;
    res.json = function (data) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return origJson.call(this, data);
    };
    next();
});

// ── Serve Frontend Static Files ─────────────────────────────
// Serves static files when backend is running
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');

app.use(express.static(rootPath));
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
}

// ── Health Check ────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
    const indexStats = vectorStore.getStats();
    const supabase   = require('./services/supabaseService');
    const sbHealth   = await supabase.healthCheck();

    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
    const isIndexed    = Boolean(indexStats.isLoaded && indexStats.vectorCount > 0);

    let ragStatus = 'ready';
    if (!isIndexed) {
        ragStatus = vectorStore.indexExists() ? 'not_loaded' : 'index_empty';
    }

    res.json({
        status: 'OK',
        message: 'JanSahay AI Backend is running',
        version: '2.0.0',
        gemini: {
            configured: hasGeminiKey,
            model: process.env.LLM_MODEL || 'gemini-3.6-flash'
        },
        rag: {
            status:         ragStatus,
            indexed:        isIndexed,
            vectorCount:    indexStats.vectorCount || 0,
            schemeCount:    getSchemeCount(),
            embeddingModel: process.env.EMBEDDING_MODEL || 'gemini-embedding-001',
            llmModel:       process.env.LLM_MODEL || 'gemini-3.6-flash'
        },
        supabase: sbHealth,
        timestamp: new Date().toISOString()
    });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/schemes', schemesRouter);
app.use('/api/chat', chatRouter);
app.use('/api/rag', ragRouter);       // Unified RAG pipeline (text + voice)
app.use('/api/search', searchRouter);
app.use('/api/voice', voiceRouter);
app.use('/api/tts', ttsRouter);
app.use('/api/eligibility', eligibilityRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/knowledge-base', knowledgeBaseRouter);
app.use('/api/filter', filterRouter);
app.use('/api/auth', authRouter);

// ── Catch-all: serve frontend for any non-API route ─────────
app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Initialize RAG Pipeline ─────────────────────────────────
async function initializeRAG() {
    console.log('\n🧠 Initializing RAG Pipeline...');

    // Try to load existing vector index
    let isReady = false;
    if (vectorStore.indexExists()) {
        const loaded = vectorStore.loadIndex();
        if (loaded) {
            const stats = vectorStore.getStats();
            console.log(`✅ Vector index loaded: ${stats.vectorCount} vectors`);
            console.log(`📊 Knowledge base: ${getSchemeCount()} schemes`);
            isReady = true;
        }
    }

    if (!isReady) {
        console.warn('⚠️  No vector index found on disk. Auto-generating index for 1074 schemes...');
        try {
            const { ingest } = require('./services/rag/ingestion');
            await ingest({ force: true });
            vectorStore.loadIndex();
            const stats = vectorStore.getStats();
            console.log(`✅ Auto-ingestion complete: ${stats.vectorCount} vectors loaded.`);
        } catch (err) {
            console.error('❌ Auto-ingestion failed:', err.message);
        }
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  GEMINI_API_KEY not set. RAG chat will not work.');
        console.warn('   Get your key from: https://aistudio.google.com/apikey');
    } else {
        console.log('✅ Gemini API key configured');
    }

    // Initialize RAG Scheme Recommendation + Gemini reasoning pipeline
    const ragService = require('./services/ragService');
    ragService.initialize(process.env.GEMINI_API_KEY || '').catch(err => {
        console.warn('⚠️  RAG Scheme Recommendation pipeline init warning:', err.message);
    });

    console.log(`📝 RAG Debug mode: ${process.env.RAG_DEBUG === 'true' ? 'ON' : 'OFF'}`);
    console.log('');
}

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 JanSahay AI Backend v2.0 running on http://0.0.0.0:${PORT}`);
    console.log(`📋 API Health: http://0.0.0.0:${PORT}/api/health`);
    console.log(`🌐 Frontend:   http://0.0.0.0:${PORT}`);

    initializeRAG();
});

module.exports = app;

