/* ============================================================
   JanSahay AI - AI Chat Module
   Handles the floating chat widget and API-backed responses
   ============================================================ */

(function () {
    'use strict';

    const { API_BASE } = window.AppData;

    const aiChatBtn    = document.getElementById('aiChatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const chatClose    = document.getElementById('chatClose');
    const chatInput    = document.getElementById('chatInput');
    const chatSend     = document.getElementById('chatSend');
    const chatBody     = document.getElementById('chatBody');

    if (!aiChatBtn) return;

    // ── Toggle Chat Window ────────────────────────────────────
    aiChatBtn.addEventListener('click', () => {
        const isOpen = aiChatWindow.style.display !== 'none';
        aiChatWindow.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) chatInput.focus();
    });

    chatClose.addEventListener('click', () => {
        aiChatWindow.style.display = 'none';
    });

    // ── Typing Indicator ──────────────────────────────────────
    function showTypingIndicator() {
        const id = `typing-${Date.now()}`;
        chatBody.insertAdjacentHTML('beforeend', `
            <div class="chat-message bot typing-indicator" id="${id}">
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `);
        chatBody.scrollTop = chatBody.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // ── Append Message ────────────────────────────────────────
    function appendMessage(text, role, mentionedSchemes = []) {
        let safeText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/\*(.*?)\*/g, '<em>$1</em>')
                           .replace(/\n/g, '<br>');

        let schemesHtml = '';
        if (mentionedSchemes && mentionedSchemes.length > 0) {
            schemesHtml = `
                <div class="chat-schemes-chips" style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                    ${mentionedSchemes.map(s => `
                        <a href="scheme-details.html?id=${s.schemeId}" target="_blank" style="display:inline-flex; align-items:center; gap:4px; font-size:0.75rem; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 8px; border-radius:12px; text-decoration:none; font-weight:600; border:1px solid rgba(99,102,241,0.25);">
                            <i class="fas fa-circle-info"></i> ${s.title.length > 28 ? s.title.substring(0, 26) + '...' : s.title}
                        </a>
                    `).join('')}
                </div>
            `;
        }

        chatBody.insertAdjacentHTML('beforeend', `
            <div class="chat-message ${role}">
                <div class="message-content">
                    <p>${safeText}</p>
                    ${schemesHtml}
                </div>
            </div>
        `);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ── Send Message ──────────────────────────────────────────
    async function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';

        const typingId = showTypingIndicator();
        const profile  = (window.AppData && window.AppData._fd) ? window.AppData._fd : null;

        // 1. Try RAG Chat endpoint first
        try {
            const controller = new AbortController();
            const timeoutId  = setTimeout(() => controller.abort(), 20000);
            const res = await fetch(`${API_BASE}/rag/chat`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ message: text, profile }),
                signal:  controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                removeTypingIndicator(typingId);
                appendMessage(data.message, 'bot', data.mentionedSchemes || []);
                return;
            }
        } catch (e) {
            console.info('RAG chat unreachable or timed out, trying standard chat endpoint:', e.message);
        }

        // 2. Fallback to standard chat endpoint
        try {
            const res = await fetch(`${API_BASE}/chat`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ message: text, profile })
            });

            removeTypingIndicator(typingId);

            if (res.ok) {
                const data = await res.json();
                appendMessage(data.message, 'bot', data.mentionedSchemes || []);
                return;
            }
        } catch {
            // Both endpoints failed
        }

        removeTypingIndicator(typingId);
        // 3. Fallback local response
        appendMessage(localFallback(text), 'bot');
    }

    // ── Local Fallback Responses (if backend is down) ─────────
    const fallbackResponses = [
        "I can help you find the right government schemes! Try clicking the **Find Schemes For You** button to get personalized recommendations based on your profile. 🎯",
        "There are over **4,700** Central and State Government schemes available. Tell me about yourself and I'll help narrow down the best options for you! 📋",
        "The most popular schemes include **PM-KISAN** for farmers (₹6,000/year), **Ayushman Bharat** for health coverage (₹5 lakh), and **PM Awas Yojana** for housing assistance.",
        "To check your eligibility, I'd need to know your age, gender, state, income level, occupation, and education. Use our **Find Schemes** feature for personalized results! 📝",
        "Common documents required include Aadhaar Card, Income Certificate, Domicile Certificate, Bank Passbook, and Passport Photos. Specific requirements vary by scheme. 📄"
    ];
    let fallbackIdx = 0;

    function localFallback(msg) {
        const lower = msg.toLowerCase();
        if (lower.includes('kisan') || lower.includes('farmer')) return fallbackResponses[1];
        if (lower.includes('health') || lower.includes('ayushman')) return fallbackResponses[2];
        if (lower.includes('document') || lower.includes('aadhaar')) return fallbackResponses[4];
        const resp = fallbackResponses[fallbackIdx % fallbackResponses.length];
        fallbackIdx++;
        return resp;
    }

    // ── Event Listeners ───────────────────────────────────────
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendChatMessage();
    });

})();
