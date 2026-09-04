/* ============================================================
   Routes: Schemes
   ============================================================ */

const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/schemesController');

// GET  /api/schemes                → list all (paginated)
router.get('/',              ctrl.getAllSchemes);

// GET  /api/schemes/categories     → list categories
router.get('/categories',    ctrl.getCategories);

// POST /api/schemes/recommend      → AI-match user profile
router.post('/recommend',    ctrl.recommendSchemes);

// GET  /api/schemes/:id            → single scheme
router.get('/:id',           ctrl.getSchemeById);

module.exports = router;
