/* ============================================================
   JanSahay AI - Backend Server Entry Point
   Node.js + Express REST API
   ============================================================ */

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const schemesRouter = require('./routes/schemes');
const chatRouter = require('./routes/chat');
const searchRouter = require('./routes/search');
const ragRouter = require('./routes/rag');

// RAG Service
const ragService = require('./services/ragService');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend Static Files ─────────────────────────────
// Serves static files when backend is running
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');

app.use(express.static(rootPath));
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
}

// ── Health Check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'JanSahay AI Backend is running',
        version: '2.0.0',
        ragEnabled: ragService.isReady,
        timestamp: new Date().toISOString()
    });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/schemes', schemesRouter);
app.use('/api/chat',    chatRouter);
app.use('/api/search',  searchRouter);
app.use('/api/rag',     ragRouter);

// ── Catch-all: serve frontend for any non-API route ─────────
app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Initialize RAG Pipeline & Start Server ───────────────────
(async () => {
    try {
        await ragService.initialize(process.env.GEMINI_API_KEY);
    } catch (err) {
        console.error('⚠️  RAG initialization failed (server will still start):', err.message);
    }

    app.listen(PORT, () => {
        console.log(`\n🚀 JanSahay AI Backend running on http://localhost:${PORT}`);
        console.log(`📋 API Health:  http://localhost:${PORT}/api/health`);
        console.log(`🧠 RAG Status:  http://localhost:${PORT}/api/rag/status`);
        console.log(`🌐 Frontend:    http://localhost:${PORT}\n`);
    });
})();

module.exports = app;

