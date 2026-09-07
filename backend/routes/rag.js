/* ============================================================
   Routes: RAG Query (Unified Text + Voice Pipeline)
   ============================================================ */

'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ragController');

// POST /api/rag/query  → unified RAG pipeline (text + voice)
router.post('/query', ctrl.query);

// GET  /api/rag/status → pipeline health and index stats
router.get('/status', ctrl.status);

module.exports = router;
