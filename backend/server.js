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
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/schemes', schemesRouter);
app.use('/api/chat',    chatRouter);
app.use('/api/search',  searchRouter);

// ── Catch-all: serve frontend for any non-API route ─────────
app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 JanSahay AI Backend running on http://localhost:${PORT}`);
    console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🌐 Frontend:   http://localhost:${PORT}\n`);
});

module.exports = app;
