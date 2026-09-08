/* ============================================================
   JanSahay AI — Supabase Service
   Centralized Supabase client for all DB operations.
   Uses service-role key for server-side writes (safe — server only).
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL          = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY     = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── Validate config ──────────────────────────────────────────
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.warn('⚠️  Supabase not configured. SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing.');
    console.warn('   Supabase features (feedback, analytics) will be disabled.');
}

// ── Clients ──────────────────────────────────────────────────
const adminClient = (SUPABASE_URL && SUPABASE_SERVICE_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false }
    })
    : null;

const anonClient = (SUPABASE_URL && SUPABASE_ANON_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false, autoRefreshToken: false }
    })
    : null;

const isConnected = !!adminClient;

// ── Helper: safe insert ───────────────────────────────────────
async function safeInsert(table, data) {
    if (!adminClient) return { success: false, reason: 'supabase_not_configured' };
    try {
        const { data: result, error } = await adminClient.from(table).insert(data).select();
        if (error) throw error;
        return { success: true, data: result };
    } catch (err) {
        console.error(`[Supabase] Insert error on table "${table}":`, err.message);
        return { success: false, error: err.message };
    }
}

// ── Feedback ─────────────────────────────────────────────────
async function saveFeedback({ sessionId, messageId, rating, reason, query, response }) {
    return safeInsert('feedback', {
        session_id:  sessionId  || null,
        message_id:  messageId  || null,
        rating,
        reason:      reason     || null,
        query:       query      || null,
        response:    response   ? response.substring(0, 500) : null,
        created_at:  new Date().toISOString()
    });
}

// ── RAG Query Log ─────────────────────────────────────────────
async function logRagQuery({ sessionId, query, profile, schemeCount, responseTime, source }) {
    return safeInsert('rag_queries', {
        session_id:     sessionId   || null,
        query:          query       || null,
        profile:        profile     ? JSON.stringify(profile) : null,
        scheme_count:   schemeCount || 0,
        response_time:  responseTime || 0,
        source:         source      || 'web',
        created_at:     new Date().toISOString()
    });
}

// ── Scheme Recommendations ────────────────────────────────────
async function saveRecommendations({ sessionId, profile, schemes }) {
    const rows = (schemes || []).slice(0, 10).map((s, idx) => ({
        session_id:  sessionId || null,
        scheme_id:   s.id      || null,
        scheme_name: s.name    || s.schemeName || null,
        rank:        idx + 1,
        score:       s.score   || s.matchScore || null,
        profile:     profile   ? JSON.stringify(profile) : null,
        created_at:  new Date().toISOString()
    }));
    if (!rows.length) return { success: true, data: [] };
    return safeInsert('scheme_recommendations', rows);
}

// ── Feedback Stats ────────────────────────────────────────────
async function getFeedbackStats() {
    if (!adminClient) return null;
    try {
        const { data, error } = await adminClient.from('feedback').select('rating, reason');
        if (error) throw error;
        const total    = data.length;
        const positive = data.filter(f => f.rating === 'positive').length;
        const negative = data.filter(f => f.rating === 'negative').length;
        const reasons  = {};
        data.filter(f => f.reason).forEach(f => {
            reasons[f.reason] = (reasons[f.reason] || 0) + 1;
        });
        return { total, positive, negative, reasons, source: 'supabase' };
    } catch (err) {
        console.error('[Supabase] Stats error:', err.message);
        return null;
    }
}

// ── Health Check ──────────────────────────────────────────────
async function healthCheck() {
    if (!adminClient) return { connected: false, reason: 'not_configured' };
    try {
        const { error } = await adminClient.from('feedback').select('id').limit(1);
        if (error) throw error;
        return { connected: true, url: SUPABASE_URL };
    } catch (err) {
        return { connected: false, error: err.message };
    }
}

module.exports = {
    adminClient,
    anonClient,
    isConnected,
    saveFeedback,
    logRagQuery,
    saveRecommendations,
    getFeedbackStats,
    healthCheck
};