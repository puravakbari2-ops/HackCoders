/* ============================================================
   Routes: Chat
   ============================================================ */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/chatController');

// POST /api/chat   → send a message, get AI response
router.post('/', ctrl.chat);

module.exports = router;
