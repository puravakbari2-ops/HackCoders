/* ============================================================
   JanSahay AI — Supabase Service
   Centralized Supabase client for feedback, queries & analytics.
   Uses service-role key for server-side writes (safe — server only).
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

// ── Environment variable resolution (with backwards-compatible aliases) ──
function getConfig() {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY || 
                    process.env.SUPABASE_PUBLISHABLE_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                       process.env.SUPABASE_SECRET_KEY || 
                       process.env.SUPABASE_KEY;

    return { url, anonKey, serviceKey };
}

let _adminClient = null;
let _anonClient  = null;

function getAdminClient() {
    const { url, serviceKey } = getConfig();
    if (!url || !serviceKey) return null;
    if (!_adminClient) {
        try {
            _adminClient = createClient(url, serviceKey, {
                auth: { persistSession: false, autoRefreshToken: false }
            });
        } catch (err) {
            console.error('[Supabase] Failed to create admin client:', err.message);
            return null;
        }
    }
    return _adminClient;
}

function getAnonClient() {
    const { url, anonKey } = getConfig();
    if (!url || !anonKey) return null;
    if (!_anonClient) {
        try {
            _anonClient = createClient(url, anonKey, {
                auth: { persistSession: false, autoRefreshToken: false }
            });
        } catch (err) {
            console.error('[Supabase] Failed to create anon client:', err.message);
            return null;
        }
    }
    return _anonClient;
}

// ── Helper: safe insert ───────────────────────────────────────
async function safeInsert(table, data) {
    const client = getAdminClient();
    if (!client) return { success: false, reason: 'supabase_not_configured' };
    try {
        const { data: result, error } = await client.from(table).insert(data).select();
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
async function saveRecommendations({ sessionId, profile, schemes, recommendations }) {
    const list = schemes || recommendations || [];
    const rows = list.slice(0, 10).map((s, idx) => ({
        session_id:  sessionId || null,
        scheme_id:   String(s.id || s.scheme_id || ''),
        scheme_name: s.name || s.title || s.scheme_name || null,
        rank:        idx + 1,
        score:       s.score || s.relevance_score || s.matchScore || null,
        profile:     profile ? JSON.stringify(profile) : null,
        created_at:  new Date().toISOString()
    }));
    if (!rows.length) return { success: true, data: [] };
    return safeInsert('scheme_recommendations', rows);
}

// ── Feedback Stats ────────────────────────────────────────────
async function getFeedbackStats() {
    const client = getAdminClient();
    if (!client) return null;
    try {
        const { data, error } = await client.from('feedback').select('rating, reason');
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

// ── Citizen Authentication (Supabase) ─────────────────────────
const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(String(password)).digest('hex');
}

async function registerUser({ name, email, mobile, state, password, role, avatar }) {
    const client = getAdminClient();
    if (!client) return { success: false, reason: 'supabase_not_configured' };

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
        return { success: false, error: 'Email and password are required.' };
    }

    try {
        const { data: existing } = await client
            .from('users')
            .select('id, email')
            .eq('email', cleanEmail)
            .maybeSingle();

        if (existing) {
            return { success: false, error: 'An account with this email already exists.' };
        }

        const passwordHash = hashPassword(password);
        const defaultAvatar = avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || cleanEmail)}`;

        const newUser = {
            name: name || cleanEmail.split('@')[0],
            email: cleanEmail,
            mobile: mobile || null,
            state: state || null,
            password: passwordHash,
            role: role || 'Verified Citizen',
            avatar: defaultAvatar,
            created_at: new Date().toISOString()
        };

        const { data: inserted, error: insertErr } = await client
            .from('users')
            .insert(newUser)
            .select('id, name, email, mobile, state, role, avatar, created_at')
            .single();

        if (insertErr) throw insertErr;
        return { success: true, user: inserted };
    } catch (err) {
        console.error('[Supabase] User registration error:', err.message);
        return { success: false, error: err.message };
    }
}

async function loginUser({ email, password }) {
    const client = getAdminClient();
    if (!client) return { success: false, reason: 'supabase_not_configured' };

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
        return { success: false, error: 'Email and password are required.' };
    }

    try {
        const { data: user, error } = await client
            .from('users')
            .select('id, name, email, mobile, state, password, role, avatar, created_at')
            .eq('email', cleanEmail)
            .maybeSingle();

        if (error) throw error;
        if (!user) {
            return { success: false, error: 'No citizen account found with this email address.' };
        }

        const passwordHash = hashPassword(password);
        const isMatch = (user.password === passwordHash || user.password === password);

        if (!isMatch) {
            return { success: false, error: 'Incorrect password. Please check and try again.' };
        }

        const { password: _, ...safeUser } = user;
        return { success: true, user: safeUser };
    } catch (err) {
        console.error('[Supabase] User login error:', err.message);
        return { success: false, error: err.message };
    }
}

// ── Health Check ──────────────────────────────────────────────
async function healthCheck() {
    const { url, serviceKey } = getConfig();
    if (!url || !serviceKey) {
        return {
            connected: false,
            configured: false,
            status: 'not_configured',
            reason: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set in environment'
        };
    }

    const client = getAdminClient();
    if (!client) {
        return {
            connected: false,
            configured: true,
            status: 'init_failed',
            reason: 'Supabase client initialization failed'
        };
    }

    try {
        const { error: fbErr } = await client.from('feedback').select('id').limit(1);
        const { error: userErr } = await client.from('users').select('id').limit(1);

        const feedbackTableExists = !fbErr;
        const usersTableExists = !userErr;

        if (fbErr) {
            const isTableMissing = fbErr.code === 'PGRST204' ||
                fbErr.code === 'PGRST205' ||
                (fbErr.message && (
                    fbErr.message.includes('schema cache') ||
                    fbErr.message.includes('relation') ||
                    fbErr.message.includes('does not exist')
                ));

            if (isTableMissing) {
                return {
                    connected: false,
                    configured: true,
                    status: 'tables_missing',
                    tables: {
                        feedback: false,
                        users: usersTableExists
                    },
                    reason: 'Connected to Supabase project, but SQL tables not created yet. Run schema SQL in Supabase SQL editor.'
                };
            }

            return {
                connected: false,
                configured: true,
                status: 'query_error',
                reason: fbErr.message
            };
        }

        return {
            connected: true,
            configured: true,
            status: 'ready',
            url: url,
            tables: {
                feedback: feedbackTableExists,
                users: usersTableExists
            }
        };
    } catch (err) {
        return {
            connected: false,
            configured: true,
            status: 'connection_failed',
            reason: err.message
        };
    }
}

module.exports = {
    getAdminClient,
    getAnonClient,
    saveFeedback,
    logRagQuery,
    saveRecommendations,
    getFeedbackStats,
    registerUser,
    loginUser,
    healthCheck
};