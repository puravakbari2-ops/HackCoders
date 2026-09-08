/* ============================================================
   JanSahay AI - RAG-Powered Chat Module
   Handles the floating chat widget with RAG backend integration
   Displays scheme cards, sources, eligibility, and feedback
   ============================================================ */

(function () {
    'use strict';

    const { API_BASE } = window.AppData;

    const aiChatBtn    = document.getElementById('aiChatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const chatClose    = document.getElementById('chatClose');
    const chatInput    = document.getElementById('chatInput');
    const chatSend     = document.getElementById('chatSend');
    const chatMicBtn   = document.getElementById('chatMicBtn');
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

    // ── Session Management ────────────────────────────────────
    let chatSessionId = sessionStorage.getItem('jansahay_chat_sid');
    if (!chatSessionId) {
        chatSessionId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        sessionStorage.setItem('jansahay_chat_sid', chatSessionId);
    }

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

    // ── Render Markdown-like text ─────────────────────────────
    function renderMarkdown(text) {
        if (!text) return '';
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/^• /gm, '◈ ')
            .replace(/^- /gm, '◈ ')
            .replace(/✓/g, '<span style="color:#22c55e">✓</span>')
            .replace(/✗/g, '<span style="color:#ef4444">✗</span>')
            .replace(/\n/g, '<br>');
    }

    // ── Append Message ────────────────────────────────────────
    function appendMessage(text, role, lang = 'en') {
        const safeText = renderMarkdown(text);
        const msgId = `msg-${Date.now()}`;
        const ttsBtn = role === 'bot'
            ? `<button class="chat-tts-btn" onclick="window._jansahaySpeak('${escapeHtml(text).replace(/'/g, "\\'")}', '${lang}')" title="Listen aloud">🔊 Listen</button>`
            : '';

        chatBody.insertAdjacentHTML('beforeend', `
            <div class="chat-message ${role}" id="${msgId}">
                <div class="message-content">
                    <p>${safeText}</p>
                    ${ttsBtn}
                </div>
            </div>
        `);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ── Append Rich Bot Response ──────────────────────────────
    function appendRichResponse(data) {
        const messageId = `msg-${Date.now()}`;
        const lang = data.language || 'en';

        let html = `<div class="chat-message bot" id="${messageId}">
            <div class="message-content">
                <p>${renderMarkdown(data.message)}</p>
                <button class="chat-tts-btn" onclick="window._jansahaySpeak('${escapeHtml(data.message || '').replace(/'/g, "\\'")}', '${lang}')" title="Listen aloud">
                    🔊 Listen
                </button>`;

        // Follow-up Questions
        if (data.follow_up_questions && data.follow_up_questions.length > 0) {
            html += '<div class="chat-followups">';
            for (const q of data.follow_up_questions) {
                html += `<button class="chat-followup-chip" onclick="window._jansahayChat('${escapeHtml(q).replace(/'/g, "\\'")}')">${escapeHtml(q)}</button>`;
            }
            html += '</div>';
        }

        // Scheme Cards
        if (data.schemes && data.schemes.length > 0) {
            html += '<div class="scheme-cards">';
            for (const scheme of data.schemes) {
                const status = scheme.eligibility_status || '';
                let statusBadge = '';
                if (status) {
                    const icon = status === 'ELIGIBLE' ? '🟢' :
                                 status === 'LIKELY_ELIGIBLE' ? '🟡' :
                                 status === 'NEEDS_MORE_INFORMATION' ? '🔵' :
                                 status === 'NOT_ELIGIBLE' ? '🔴' : '⚪';
                    statusBadge = `<span class="eligibility-badge eligibility-${status.toLowerCase()}">${icon} ${status.replace(/_/g, ' ')}</span>`;
                }

                html += `
                    <div class="scheme-card-mini">
                        <div class="scheme-card-header">
                            <strong>${escapeHtml(scheme.title || '')}</strong>
                            ${statusBadge}
                            ${scheme.verified ? '<span class="verified-badge" title="Verified">✓</span>' : ''}
                        </div>
                        <div class="scheme-card-meta">
                            ${scheme.category ? `<span class="chip">${escapeHtml(scheme.category)}</span>` : ''}
                            ${scheme.state ? `<span class="chip">${escapeHtml(scheme.state)}</span>` : ''}
                        </div>
                        <div class="scheme-card-actions">
                            ${scheme.applyLink ? `<a href="${escapeHtml(scheme.applyLink)}" target="_blank" rel="noopener" class="btn-action btn-apply">Apply Official ↗</a>` : ''}
                            <button class="btn-action btn-details" onclick="window._jansahayChat('Tell me more about ${escapeHtml(scheme.title || '')}')">Details</button>
                            <button class="btn-action btn-eligible" onclick="window._jansahayChat('Am I eligible for ${escapeHtml(scheme.title || '')}?')">Eligibility</button>
                        </div>
                    </div>`;
            }
            html += '</div>';
        }

        // Sources
        if (data.sources && data.sources.length > 0) {
            html += '<div class="sources-block"><small><strong>Sources:</strong> ';
            const uniqueSources = data.sources.filter((v, i, a) => a.findIndex(t => t.url === v.url) === i);
            html += uniqueSources.map(s =>
                `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.scheme || 'Official')}</a>`
            ).join(' · ');
            html += '</small></div>';
        }

        // Feedback Buttons
        html += `
            <div class="feedback-block" id="fb-${messageId}">
                <span class="feedback-label">Was this helpful?</span>
                <button class="fb-btn fb-up" onclick="window._jansahayFeedback('${messageId}', 'positive')" title="Yes">👍</button>
                <button class="fb-btn fb-down" onclick="window._jansahayFeedback('${messageId}', 'negative')" title="No">👎</button>
            </div>`;

        html += '</div></div>';

        chatBody.insertAdjacentHTML('beforeend', html);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ── Escape HTML ───────────────────────────────────────────
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Send Message ──────────────────────────────────────────
    async function sendChatMessage(overrideText) {
        const text = (overrideText || chatInput.value).trim();
        if (!text) return;

        if (!overrideText) {
            appendMessage(text, 'user');
            chatInput.value = '';
        }

        const typingId = showTypingIndicator();

        try {
            const res = await fetch(`${API_BASE}/chat`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                    message: text,
                    sessionId: chatSessionId
                })
            });

            removeTypingIndicator(typingId);

            if (res.ok) {
                const data = await res.json();

                // Update session ID if returned
                if (data.sessionId) {
                    chatSessionId = data.sessionId;
                    sessionStorage.setItem('jansahay_chat_sid', chatSessionId);
                }

                // Render rich response if we have scheme data
                if ((data.schemes && data.schemes.length > 0) || (data.sources && data.sources.length > 0)) {
                    appendRichResponse(data);
                } else {
                    appendMessage(data.message, 'bot');
                }
            } else {
                throw new Error('Bad response');
            }
        } catch (err) {
            removeTypingIndicator(typingId);
            appendMessage("I'm temporarily unable to connect to JanSahay's server. Please try again shortly.", 'bot');
        }
    }

    // ── Feedback Handler ──────────────────────────────────────
    async function sendFeedback(messageId, rating) {
        const fbBlock = document.getElementById(`fb-${messageId}`);
        if (fbBlock) {
            if (rating === 'positive') {
                fbBlock.innerHTML = '<span class="feedback-thanks">Thanks for your feedback! 👍</span>';
            } else {
                fbBlock.innerHTML = `
                    <span class="feedback-label">What was wrong?</span>
                    <button class="fb-reason" onclick="window._jansahayFeedbackReason('${messageId}', 'wrong_scheme')">Wrong scheme</button>
                    <button class="fb-reason" onclick="window._jansahayFeedbackReason('${messageId}', 'wrong_eligibility')">Wrong eligibility</button>
                    <button class="fb-reason" onclick="window._jansahayFeedbackReason('${messageId}', 'wrong_benefit')">Wrong benefit</button>
                    <button class="fb-reason" onclick="window._jansahayFeedbackReason('${messageId}', 'other')">Other</button>
                `;
            }
        }

        try {
            await fetch(`${API_BASE}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: chatSessionId,
                    messageId,
                    rating
                })
            });
        } catch (e) { /* Silent fail for feedback */ }
    }

    async function sendFeedbackReason(messageId, reason) {
        const fbBlock = document.getElementById(`fb-${messageId}`);
        if (fbBlock) {
            fbBlock.innerHTML = '<span class="feedback-thanks">Thanks for your feedback! We\'ll improve. 🙏</span>';
        }

        try {
            await fetch(`${API_BASE}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: chatSessionId,
                    messageId,
                    rating: 'negative',
                    reason
                })
            });
        } catch (e) { /* Silent fail */ }
    }

    // ── Global Handlers (for inline onclick) ──────────────────
    window._jansahayChat = function(text) {
        appendMessage(text, 'user');
        sendChatMessage(text);
    };

    window._jansahayFeedback = sendFeedback;
    window._jansahayFeedbackReason = sendFeedbackReason;

    // ── TTS Speaker Function ──────────────────────────────────
    window._jansahaySpeak = function(text, lang) {
        if (!text) return;
        if (window.JanSahayVoice && typeof window.JanSahayVoice.speak === 'function') {
            window.JanSahayVoice.speak(text, lang || 'en');
            return;
        }

        const defaultBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') ? 'http://localhost:5000' : '';
        const apiBase = (window.AppData && window.AppData.apiBase) ? window.AppData.apiBase : defaultBase;
        const normLang = (['en', 'hi', 'gu'].includes(lang)) ? lang : 'en';
        const audioUrl = `${apiBase}/api/tts?lang=${normLang}&text=${encodeURIComponent(text.trim())}`;
        try {
            const chatAudio = new Audio(audioUrl);
            chatAudio.play().catch(e => console.warn('[JanSahay Chat] TTS audio playback blocked:', e.message));
        } catch (err) {
            console.warn('[JanSahay Chat] TTS initialization error:', err.message);
        }
    };

    // ── Microphone In-Chat Handler ─────────────────────────────
    if (chatMicBtn) {
        let isChatListening = false;
        let chatRecognition = null;

        chatMicBtn.addEventListener('click', () => {
            // If the advanced multilingual voice assistant is ready, open it
            if (window.JanSahayVoice && typeof window.JanSahayVoice.openModal === 'function') {
                window.JanSahayVoice.openModal();
                setTimeout(() => window.JanSahayVoice.startListening(), 300);
                return;
            }

            // Otherwise, use browser speech recognition directly in the input box
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
                return;
            }

            if (isChatListening && chatRecognition) {
                chatRecognition.stop();
                return;
            }

            chatRecognition = new SpeechRec();
            chatRecognition.lang = 'en-IN';
            chatRecognition.interimResults = true;
            chatRecognition.continuous = false;

            chatRecognition.onstart = () => {
                isChatListening = true;
                chatMicBtn.classList.add('listening');
                chatInput.placeholder = '🎙️ Listening... Speak now';
            };

            chatRecognition.onresult = (e) => {
                const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
                chatInput.value = transcript;
                if (e.results[0].isFinal) {
                    sendChatMessage();
                }
            };

            chatRecognition.onerror = () => {
                isChatListening = false;
                chatMicBtn.classList.remove('listening');
                chatInput.placeholder = 'Type your question or speak...';
            };

            chatRecognition.onend = () => {
                isChatListening = false;
                chatMicBtn.classList.remove('listening');
                chatInput.placeholder = 'Type your question or speak...';
            };

            try {
                chatRecognition.start();
            } catch (e) {
                isChatListening = false;
                chatMicBtn.classList.remove('listening');
            }
        });
    }

    // ── Event Listeners ───────────────────────────────────────
    chatSend.addEventListener('click', () => sendChatMessage());
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendChatMessage();
    });

})();
