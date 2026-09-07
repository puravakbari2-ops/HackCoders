/* ============================================================
   Routes: Official Google Cloud Text-to-Speech
   Provides streaming MP3 speech synthesis and health diagnostic.
   ============================================================ */

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ttsController');

// GET /api/tts/health → TTS service & credential diagnostic
router.get('/health', ctrl.health);

// GET /api/tts?text=<encoded text>&lang=en|hi|gu
// POST /api/tts { text: "...", lang: "..." }
// Returns: audio/mpeg stream
router.get('/', ctrl.speak);
router.post('/', ctrl.speak);

module.exports = router;
