/* ============================================================
   Routes: RAG
   RAG-powered scheme recommendation & chat endpoints
   ============================================================ */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/ragController');

// POST /api/rag/query    → profile-based AI recommendation
router.post('/query', ctrl.query);

// POST /api/rag/chat     → natural language chat with RAG
router.post('/chat',  ctrl.chat);

// GET  /api/rag/status   → pipeline health check
router.get('/status', ctrl.status);

module.exports = router;
