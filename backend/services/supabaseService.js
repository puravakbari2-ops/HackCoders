/* ============================================================
   JanSahay AI — Supabase Service
   Centralized Supabase client for feedback, queries & analytics.
   Uses service-role key for server-side writes (safe — server only).
   ============================================================ */

const fs = require('fs');
const path = require('path');
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

// ── Citizen Authentication (Supabase Primary + Local JSON Fallback) ──
const crypto = require('crypto');
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

function readLocalUsers() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
        }
    } catch (e) {
        console.warn('[Users] Error reading local users file:', e.message);
    }
    return [];
}

function saveLocalUsers(users) {
    try {
        const dir = path.dirname(USERS_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (e) {
        console.error('[Users] Error saving local users file:', e.message);
    }
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(String(password)).digest('hex');
}

async function registerUser({ name, email, mobile, state, password, role, avatar }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
        return { success: false, error: 'Email and password are required.' };
    }

    const localUsers = readLocalUsers();
    if (localUsers.some(u => (u.email || '').toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email already exists.' };
    }

    const client = getAdminClient();
    if (client) {
        try {
            const { data: existing } = await client
                .from('users')
                .select('id, email')
                .eq('email', cleanEmail)
                .maybeSingle();

            if (existing) {
                return { success: false, error: 'An account with this email already exists.' };
            }
        } catch (e) {
            // users table may not exist yet in Supabase; proceed with local storage
        }
    }

    const passwordHash = hashPassword(password);
    const defaultAvatar = avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || cleanEmail)}`;

    const newUser = {
        id: Date.now(),
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        mobile: mobile || null,
        state: state || null,
        password: password,
        passwordHash: passwordHash,
        role: role || 'Verified Citizen',
        avatar: defaultAvatar,
        created_at: new Date().toISOString()
    };

    // Save to local JSON first (instant resilience)
    localUsers.push(newUser);
    saveLocalUsers(localUsers);

    // Also attempt Supabase insert if client configured
    if (client) {
        try {
            const { data: inserted, error: insertErr } = await client
                .from('users')
                .insert({
                    name: newUser.name,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    state: newUser.state,
                    password: passwordHash,
                    role: newUser.role,
                    avatar: newUser.avatar,
                    created_at: newUser.created_at
                })
                .select('id, name, email, mobile, state, role, avatar, created_at')
                .maybeSingle();

            if (!insertErr && inserted) {
                return { success: true, user: inserted, storage: 'supabase' };
            }
        } catch (err) {
            console.warn('[Supabase] Note: Supabase users table not active yet, user stored in local users.json');
        }
    }

    const { password: _, passwordHash: __, ...safeUser } = newUser;
    return { success: true, user: safeUser, storage: 'local' };
}

async function loginUser({ email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
        return { success: false, error: 'Email and password are required.' };
    }

    const passwordHash = hashPassword(password);

    // 1. Try Supabase first if available
    const client = getAdminClient();
    if (client) {
        try {
            const { data: user, error } = await client
                .from('users')
                .select('id, name, email, mobile, state, password, role, avatar, created_at')
                .eq('email', cleanEmail)
                .maybeSingle();

            if (!error && user) {
                const isMatch = (user.password === passwordHash || user.password === password);
                if (isMatch) {
                    const { password: _, ...safeUser } = user;
                    return { success: true, user: safeUser, source: 'supabase' };
                } else {
                    return { success: false, error: 'Incorrect password. Please enter the password you created during registration.' };
                }
            }
        } catch (err) {
            console.warn('[Supabase] Login check fallback to local users:', err.message);
        }
    }

    // 2. Check local users.json fallback
    const localUsers = readLocalUsers();
    const matched = localUsers.find(u => (u.email || '').toLowerCase() === cleanEmail);

    if (matched) {
        const isMatch = (
            matched.password === password ||
            matched.passwordHash === passwordHash ||
            matched.password === passwordHash
        );

        if (isMatch) {
            const { password: _, passwordHash: __, ...safeUser } = matched;
            return { success: true, user: safeUser, source: 'local' };
        } else {
            return { success: false, error: 'Incorrect password. Please enter the password you created during registration.' };
        }
    }

    return { success: false, error: 'No citizen account found with this email. Please register first under New Citizen Register.' };
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