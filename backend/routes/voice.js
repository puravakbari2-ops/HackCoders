/* ============================================================
   Routes: Voice Assistant
   Multilingual Voice AI Assistant endpoints for JanSahay
   ============================================================ */

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/voiceController');

// POST /api/voice/chat  → process user voice/text query and return intelligent response
router.post('/chat', ctrl.chat);

// POST /api/voice/reset → reset conversational session
router.post('/reset', ctrl.resetSession);

// GET  /api/voice/status → voice service metadata
router.get('/status', ctrl.status);

// GET  /api/voice/health → voice pipeline health diagnostic
router.get('/health', ctrl.health);

module.exports = router;
