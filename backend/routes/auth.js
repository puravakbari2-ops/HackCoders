/* ============================================================
   JanSahay AI — Citizen Authentication Routes
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/auth/status
   ============================================================ */

const express = require('express');
const router  = express.Router();
const supabase = require('../services/supabaseService');

// ── POST /api/auth/register ───────────────────────────────────
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, state, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required.'
            });
        }

        const result = await supabase.registerUser({
            name,
            email,
            mobile,
            state,
            password
        });

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
    } catch (err) {
        console.error('[AuthRoute] Register error:', err.message);
        return res.status(500).json({
            success: false,
            error: 'Server error during registration: ' + err.message
        });
    }
});

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required.'
            });
        }

        const result = await supabase.loginUser({ email, password });

        if (!result.success) {
            return res.status(401).json(result);
        }

        return res.json(result);
    } catch (err) {
        console.error('[AuthRoute] Login error:', err.message);
        return res.status(500).json({
            success: false,
            error: 'Server error during login: ' + err.message
        });
    }
});

// ── GET /api/auth/status ──────────────────────────────────────
router.get('/status', async (req, res) => {
    const health = await supabase.healthCheck();
    return res.json({
        authProvider: 'supabase',
        databaseStatus: health
    });
});

module.exports = router;
