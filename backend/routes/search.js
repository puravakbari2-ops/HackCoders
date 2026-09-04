/* ============================================================
   Routes: Search
   ============================================================ */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/searchController');

// GET /api/search?q=query   → full-text scheme search
router.get('/', ctrl.search);

module.exports = router;
