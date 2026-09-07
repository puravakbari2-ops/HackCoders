/* ============================================================
   Routes: Chat
   ============================================================ */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/chatController');

// POST /api/chat   → send a message, get AI response
router.post('/', ctrl.chat);

// POST /api/chat/debug → development RAG diagnostic debug endpoint
router.post('/debug', ctrl.debugChat);

module.exports = router;
