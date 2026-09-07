/* ============================================================
   JanSahay AI - Multilingual Voice Assistant (Frontend Engine)
   Supports English, Hindi, and Gujarati (including Hinglish & Gujlish)
   Features: Real-time STT, TTS, Visual Soundwaves, Multi-turn Flow,
   Direct Scheme Cards, & Smart Audio Feedback.
   ============================================================ */

(function () {
    'use strict';

    class JanSahayVoiceAssistant {
        constructor() {
            // Configuration & State - unified with text chat
            let existingSid = null;
            try { existingSid = sessionStorage.getItem('jansahay_chat_sid'); } catch (e) {}
            this.sessionId = existingSid || ('js_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));
            try { sessionStorage.setItem('jansahay_chat_sid', this.sessionId); } catch (e) {}

            this.selectedLanguage = 'auto'; // 'auto' | 'en' | 'hi' | 'gu' (user's explicit preference)
            this.detectedLanguage = 'en';   // Last detected language from assistant or user text
            this.currentLanguage = 'auto';  // Backward compatibility alias
            this.isProcessingSpeech = false; // Lock to prevent duplicate calls from onresult
            this.state = 'idle'; // 'idle' | 'listening' | 'thinking' | 'speaking'
            this.recognition = null;
            this.isRecognizing = false;
            this.synth = window.speechSynthesis || null;
            this.currentUtterance = null;
            this.audioCtx = null;
            this.availableVoices = [];
            this.transcriptHistory = [];
            this.selectedVoiceLangCode = 'en-IN';

            // TTS language support tracking
            // Populated after voices load. null = not yet checked.
            this.ttsSupport = { en: null, hi: null, gu: null };

            // Locale map: internal lang code → BCP-47 locale for utterance.lang
            this.LANG_LOCALE = { en: 'en-IN', hi: 'hi-IN', gu: 'gu-IN' };

            // Google Cloud TTS Audio Playback
            this.activeAudio = null;
            this._audioPlayCounter = 0;
            this.googleTTSAudio = null;
            this._gttsChunkQueue = [];
            this._gttsPlaying = false;

            // API Endpoint resolution
            this.apiBase = (window.AppData && window.AppData.apiBase) ? window.AppData.apiBase : '';
            if (!this.apiBase) {
                const hostname = window.location.hostname;
                const protocol = window.location.protocol;
                if (hostname === 'localhost' || hostname === '127.0.0.1' || !hostname || protocol === 'file:') {
                    // Always talk to the JanSahay backend on port 5000
                    // regardless of what port Live Server / dev server serves the page from
                    this.apiBase = 'http://localhost:5000';
                }
            }

            // Bind methods
            this.initSpeechRecognition = this.initSpeechRecognition.bind(this);
            this.startListening = this.startListening.bind(this);
            this.stopListening = this.stopListening.bind(this);
            this.speak = this.speak.bind(this);
            this.stopSpeaking = this.stopSpeaking.bind(this);
            this.handleUserSpeech = this.handleUserSpeech.bind(this);

            // Initialize
            this.init();
        }

        init() {
            this.loadVoices();
            if (this.synth && this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => this.loadVoices();
            }

            this.createVoiceUI();
            this.initSpeechRecognition();
            this.bindGlobalTriggers();
        }

        loadVoices() {
            if (!this.synth) return;
            this.availableVoices = this.synth.getVoices();
            // Re-evaluate TTS support after voices load
            this._checkTTSSupport();
        }

        // ── Check which languages have native TTS voices ────────────────
        _checkTTSSupport() {
            const voices = this.availableVoices;
            this.ttsSupport.gu = voices.some(v =>
                v.lang.toLowerCase().startsWith('gu') ||
                v.name.toLowerCase().includes('gujarati')
            );
            this.ttsSupport.hi = voices.some(v =>
                v.lang.toLowerCase().startsWith('hi') ||
                v.name.toLowerCase().includes('hindi')
            );
            this.ttsSupport.en = voices.some(v =>
                v.lang.toLowerCase().startsWith('en')
            );
        }

        // ── Strict per-language voice selection ─────────────────────────
        // RULE: NEVER cross language boundaries.
        // Returns { voice: SpeechSynthesisVoice|null, supported: boolean }
        getBestVoice(langCode) {
            if (!this.availableVoices || this.availableVoices.length === 0) {
                this.loadVoices();
            }

            const lang = langCode || 'en';

            if (lang === 'gu') {
                // 1. Exact gu-IN voice
                let v = this.availableVoices.find(v => v.lang === 'gu-IN');
                // 2. Any voice starting with 'gu'
                if (!v) v = this.availableVoices.find(v => v.lang.toLowerCase().startsWith('gu'));
                // 3. Voice with 'gujarati' in name
                if (!v) v = this.availableVoices.find(v => v.name.toLowerCase().includes('gujarati'));
                // STOP HERE — do NOT fall back to Hindi or English for Gujarati
                return { voice: v || null, supported: Boolean(v) };
            }

            if (lang === 'hi') {
                let v = this.availableVoices.find(v => v.lang === 'hi-IN');
                if (!v) v = this.availableVoices.find(v => v.lang.toLowerCase().startsWith('hi'));
                if (!v) v = this.availableVoices.find(v => v.name.toLowerCase().includes('hindi'));
                // STOP HERE — do NOT fall back to English for Hindi! If no real Hindi voice is installed,
                // supported = false ensures it uses our clear backend Google TTS proxy.
                return { voice: v || null, supported: Boolean(v) };
            }

            // English
            let v = this.availableVoices.find(v => v.lang === 'en-IN');
            if (!v) v = this.availableVoices.find(v => v.lang.startsWith('en-IN') || v.name.includes('India'));
            if (!v) v = this.availableVoices.find(v => v.lang.startsWith('en')) || this.availableVoices[0];
            return { voice: v || null, supported: Boolean(v) };
        }

        // ── Web Audio Feedback ─────────────────────────────────────────
        playChime(type) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                if (!this.audioCtx) this.audioCtx = new AudioContext();

                if (this.audioCtx.state === 'suspended') {
                    this.audioCtx.resume();
                }

                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);

                const now = this.audioCtx.currentTime;

                if (type === 'start') {
                    // Soft ascending chime
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                } else if (type === 'success') {
                    // Two soft positive tones
                    osc.frequency.setValueAtTime(523.25, now); // C5
                    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                } else if (type === 'stop') {
                    // Descending soft tone
                    osc.frequency.setValueAtTime(550, now);
                    osc.frequency.exponentialRampToValueAtTime(370, now + 0.15);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                }
            } catch (e) {
                // AudioContext not allowed without user gesture; silently ignore
            }
        }

        // ── Speech-to-Text Initialization ─────────────────────────────
        initSpeechRecognition() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                console.warn('[JanSahay Voice] Web Speech Recognition API not supported in this browser.');
                this.updateLiveStatus('Microphone not supported in browser. You can type below!');
                return;
            }

            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;

            this.setRecognitionLanguage();

            this.recognition.onstart = () => {
                this.isRecognizing = true;
                this.isProcessingSpeech = false;
                this.setState('listening');
                this.playChime('start');
                this.updateLiveStatus('Listening... Speak now in English, Hindi, or Gujarati');
            };

            this.recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const res = event.results[i];
                    if (res.isFinal) {
                        finalTranscript += res[0].transcript;
                    } else {
                        interimTranscript += res[0].transcript;
                    }
                }

                const liveText = finalTranscript || interimTranscript;
                if (liveText) {
                    this.setTranscriptPreview(liveText, Boolean(finalTranscript));
                }

                // Guard against duplicate final emissions
                if (finalTranscript.trim() && !this.isProcessingSpeech) {
                    this.isProcessingSpeech = true;
                    this.stopListening();
                    this.handleUserSpeech(finalTranscript.trim());
                }
            };

            this.recognition.onerror = (event) => {
                console.warn('[JanSahay Voice] Speech error:', event.error);
                this.isRecognizing = false;
                this.isProcessingSpeech = false;

                if (event.error === 'not-allowed') {
                    this.setState('idle');
                    this.updateLiveStatus('Microphone permission denied. Please allow mic access in your browser settings.');
                } else if (event.error === 'no-speech') {
                    this.setState('idle');
                    this.updateLiveStatus('No speech detected. Click the microphone to try again.');
                } else {
                    this.setState('idle');
                    this.updateLiveStatus(`Mic status: ${event.error}. Tap mic to retry.`);
                }
            };

            this.recognition.onend = () => {
                this.isRecognizing = false;
                if (this.state === 'listening') {
                    this.setState('idle');
                }
            };
        }

        setRecognitionLanguage() {
            if (!this.recognition) return;

            const langMap = { hi: 'hi-IN', gu: 'gu-IN', en: 'en-IN' };
            if (this.selectedLanguage && this.selectedLanguage !== 'auto' && langMap[this.selectedLanguage]) {
                this.recognition.lang = langMap[this.selectedLanguage];
            } else {
                // Auto mode: adapt to last detected language or default to 'hi-IN' which recognizes multilingual Indian speech
                this.recognition.lang = langMap[this.detectedLanguage] || 'hi-IN';
            }
        }

        startListening() {
            if (!this.recognition) {
                this.initSpeechRecognition();
                if (!this.recognition) {
                    alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or a modern mobile browser.');
                    return;
                }
            }

            if (this.synth && this.synth.speaking) {
                this.synth.cancel();
            }

            this.setRecognitionLanguage();

            try {
                this.recognition.start();
            } catch (err) {
                // Already started or restarting
                console.log('[JanSahay Voice] Recognition start caught:', err.message);
            }
        }

        stopListening() {
            if (this.recognition && this.isRecognizing) {
                try {
                    this.recognition.stop();
                } catch (e) {}
                this.isRecognizing = false;
            }
        }

        // ── TTS Unavailability Warning Banner ────────────────────────
        // Shows a dismissible banner inside the voice modal
        showTTSWarning(lang) {
            const container = document.getElementById('jsVoiceMessages');
            if (!container) return;

            // Don't stack duplicate warnings
            if (document.getElementById('jsTTSWarningBanner')) return;

            const langNames = { gu: 'Gujarati (gu-IN)', hi: 'Hindi (hi-IN)', en: 'English (en-IN)' };
            const langName  = langNames[lang] || lang;

            let warningMsg = '';
            if (lang === 'gu') {
                warningMsg = `⚠️ <strong>Gujarati voice unavailable</strong> — Your browser does not have a <code>gu-IN</code> Gujarati TTS voice installed. The Gujarati text response is displayed above, but audio playback is disabled to prevent incorrect Hindi/English pronunciation.<br/><small>To enable Gujarati voice: install a Gujarati TTS voice in your OS/browser settings, or try Chrome on Android which supports <code>gu-IN</code>.</small>`;
            } else {
                warningMsg = `⚠️ <strong>${langName} voice unavailable</strong> — No matching TTS voice found in your browser. Text response is shown above, but audio is disabled.`;
            }

            const banner = document.createElement('div');
            banner.id = 'jsTTSWarningBanner';
            banner.style.cssText = `
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                border: 1px solid #f0a500;
                border-left: 4px solid #e67e00;
                border-radius: 10px;
                padding: 12px 14px;
                margin: 8px 0;
                font-size: 0.82rem;
                color: #7a4100;
                line-height: 1.5;
                position: relative;
                animation: fadeInUp 0.3s ease;
            `;
            banner.innerHTML = `
                ${warningMsg}
                <button onclick="this.parentElement.remove()" style="
                    position:absolute; top:8px; right:10px;
                    background:none; border:none; cursor:pointer;
                    font-size:1rem; color:#a06000; font-weight:bold;
                    " title="Dismiss">✕</button>
            `;
            container.appendChild(banner);
            container.scrollTop = container.scrollHeight;

            // Auto-dismiss after 12 seconds
            setTimeout(() => { if (banner.parentElement) banner.remove(); }, 12000);
        }

        // ── Backend-Proxied TTS (Gujarati & Hindi) ─────────────────────────────
        unlockAudio() {
            try {
                if (!this._audioUnlocked) {
                    const silent = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
                    silent.play().then(() => {
                        this._audioUnlocked = true;
                    }).catch(() => {});
                }
                if (this.audioCtx && this.audioCtx.state === 'suspended') {
                    this.audioCtx.resume();
                }
            } catch (e) {}
        }

        // ── Official Google Cloud Text-to-Speech Output ────────────────
        // Sends text to backend /api/tts which synthesizes speech using
        // official @google-cloud/text-to-speech with Indian locales (en-IN, hi-IN, gu-IN).
        speak(text, lang = 'en') {
            this.unlockAudio();
            // 1. Stop any currently playing speech immediately
            this.stopSpeaking();

            if (!text || !text.trim()) {
                this.setState('idle');
                return;
            }

            const normalizedLang = (['en', 'hi', 'gu'].includes(lang)) ? lang : 'en';
            const locale = this.LANG_LOCALE[normalizedLang] || 'en-IN';

            this.setState('speaking');

            const readyMsgs = {
                en: 'Ready. Click the mic to speak or ask another question.',
                hi: 'तैयार है। माइक दबाएं और कोई भी सवाल पूछें।',
                gu: 'તૈયાર છે. માઇક પર ક્લિક કરો અને કોઈ પણ સવાલ પૂછો.'
            };

            const loadingMsgs = {
                en: 'Synthesizing voice response...',
                hi: 'आवाज तैयार हो रही है...',
                gu: 'અવાજ તૈયાર થઈ રહ્યો છે...'
            };

            this.updateLiveStatus(loadingMsgs[normalizedLang] || loadingMsgs.en);

            // Increment playback counter to invalidate stale asynchronous audio responses
            const playId = ++this._audioPlayCounter;

            const ttsUrl = `${this.apiBase}/api/tts?lang=${encodeURIComponent(normalizedLang)}&text=${encodeURIComponent(text.trim())}`;

            console.group('[JanSahay Google Cloud TTS]');
            console.log('  Response language :', normalizedLang);
            console.log('  TTS Locale        :', locale);
            console.log('  Text Preview      :', text.substring(0, 60) + (text.length > 60 ? '...' : ''));
            console.log('  Backend Endpoint  :', `${this.apiBase}/api/tts?lang=${normalizedLang}&text=<encoded>`);
            console.groupEnd();

            const audio = new Audio();
            this.activeAudio = audio;
            this.googleTTSAudio = audio;

            audio.src = ttsUrl;
            audio.preload = 'auto';

            audio.oncanplaythrough = () => {
                if (this._audioPlayCounter !== playId) return;
                const speakingMsgs = {
                    en: 'Speaking... 🔊',
                    hi: 'हिंदी आवाज चल रही है... 🔊',
                    gu: 'ગુજરાતી અવાજ ચાલુ છે... 🔊'
                };
                this.updateLiveStatus(speakingMsgs[normalizedLang] || speakingMsgs.en);
            };

            audio.onended = () => {
                if (this._audioPlayCounter !== playId) return;
                this.activeAudio = null;
                this.googleTTSAudio = null;
                this.setState('idle');
                this.updateLiveStatus(readyMsgs[normalizedLang] || readyMsgs.en);
            };

            audio.onerror = (e) => {
                if (this._audioPlayCounter !== playId) return;
                console.warn('[JanSahay TTS] Audio playback error:', e);
                this.activeAudio = null;
                this.googleTTSAudio = null;
                this.setState('idle');
                this.updateLiveStatus('Audio unavailable. Click "🔊 Listen" to retry.');
            };

            audio.play().catch(err => {
                if (this._audioPlayCounter !== playId) return;
                console.warn('[JanSahay TTS] Autoplay blocked by browser policy:', err.message);
                this.setState('idle');
                this.updateLiveStatus('Audio ready. Click "🔊 Listen" on the response to play.');
            });
        }

        // Backward compatibility alias for any legacy callers
        speakViaGoogleTTS(text, langCode) {
            this.speak(text, langCode);
        }

        stopSpeaking() {
            // Cancel active audio play token
            this._audioPlayCounter++;

            // Stop and release HTML Audio element
            if (this.activeAudio) {
                try {
                    this.activeAudio.pause();
                    this.activeAudio.currentTime = 0;
                    this.activeAudio.src = '';
                } catch (e) {}
                this.activeAudio = null;
            }
            if (this.googleTTSAudio) {
                try {
                    this.googleTTSAudio.pause();
                    this.googleTTSAudio.currentTime = 0;
                    this.googleTTSAudio.src = '';
                } catch (e) {}
                this.googleTTSAudio = null;
            }

            // Stop any residual browser SpeechSynthesis if still active
            if (this.synth) {
                try { this.synth.cancel(); } catch (e) {}
            }

            this._gttsPlaying = false;
            this._gttsChunkQueue = [];
            this.setState('idle');
            this.updateLiveStatus('Speech paused. Click mic to speak.');
        }

        // ── State Machine UI Handler ──────────────────────────────────
        setState(newState) {
            this.state = newState;
            const modal = document.getElementById('jsVoiceModal');
            const fab = document.getElementById('jsVoiceFab');
            const statePill = document.getElementById('jsVoiceStateBadge');
            const soundwave = document.getElementById('jsVoiceSoundwave');
            const micBtn = document.getElementById('jsVoiceMicBtn');

            if (!modal) return;

            modal.setAttribute('data-state', newState);
            if (fab) fab.setAttribute('data-state', newState);

            if (statePill) {
                let badgeText = 'Ready';
                let badgeIcon = '🟢';
                if (newState === 'listening') {
                    badgeText = 'Listening...';
                    badgeIcon = '🎙️';
                } else if (newState === 'thinking') {
                    badgeText = 'Finding schemes...';
                    badgeIcon = '⚡';
                } else if (newState === 'speaking') {
                    badgeText = 'Speaking...';
                    badgeIcon = '🔊';
                }
                statePill.innerHTML = `<span>${badgeIcon}</span> <span>${badgeText}</span>`;
            }

            if (soundwave) {
                if (newState === 'listening' || newState === 'speaking') {
                    soundwave.classList.add('active');
                } else {
                    soundwave.classList.remove('active');
                }
            }

            if (micBtn) {
                if (newState === 'listening') {
                    micBtn.classList.add('recording');
                    micBtn.title = 'Listening... Click to stop';
                } else {
                    micBtn.classList.remove('recording');
                    micBtn.title = 'Click to speak';
                }
            }
        }

        // ── Send Utterance to Backend Intelligence Engine ────────────
        async handleUserSpeech(text) {
            if (!text || !text.trim()) {
                this.isProcessingSpeech = false;
                return;
            }

            this.appendChatMessage('user', text);
            this.setState('thinking');
            this.updateLiveStatus('Analyzing your request & matching verified schemes...');

            try {
                // If user selected Auto, do NOT force a hardcoded language so backend dynamically detects it per-utterance
                const langPayload = (this.selectedLanguage && this.selectedLanguage !== 'auto')
                    ? this.selectedLanguage
                    : undefined;

                const response = await fetch(`${this.apiBase}/api/voice/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        sessionId: this.sessionId,
                        language: langPayload
                    })
                });

                if (!response.ok) {
                    throw new Error(`Server returned HTTP ${response.status}`);
                }

                const data = await response.json();
                this.playChime('success');

                // ── Dynamic Language State Sync ──────────────────────────
                // Keep selectedLanguage intact ('auto' stays 'auto') while updating detectedLanguage
                if (data.language && ['en', 'hi', 'gu'].includes(data.language)) {
                    this.detectedLanguage = data.language;
                    if (this.selectedLanguage === 'auto') {
                        this.currentLanguage = data.language; // For STT or TTS reference
                        this.setRecognitionLanguage();

                        // Indicate detected language on the Auto pill without deselecting it
                        const autoPill = document.querySelector('.js-lang-pill[data-lang="auto"]');
                        if (autoPill) {
                            const badge = data.language === 'gu' ? 'Auto (ગુ)' : data.language === 'hi' ? 'Auto (हि)' : 'Auto (EN)';
                            autoPill.textContent = `${badge} 🌐`;
                        }
                    } else {
                        this.currentLanguage = this.selectedLanguage;
                    }
                }

                // ── Session Sync with Text Chat ─────────────────────────
                if (data.sessionId) {
                    this.sessionId = data.sessionId;
                    try { sessionStorage.setItem('jansahay_chat_sid', data.sessionId); } catch (e) {}
                }

                // Render assistant response
                const schemesToRender = data.schemes || data.matchedSchemes || [];
                this.appendChatMessage('assistant', data.reply, schemesToRender, data.spokenText, data.language, data.followUpQuestions);

                // Speak response aloud via TTS — language MUST match response language
                if (data.spokenText) {
                    this.speak(data.spokenText, data.language);
                } else {
                    this.setState('idle');
                }

            } catch (err) {
                console.warn('[JanSahay Voice API Network Fallback]:', err.message);
                const targetLang = (this.selectedLanguage && this.selectedLanguage !== 'auto') ? this.selectedLanguage : (this.detectedLanguage || 'en');
                const offlineData = this.getOfflineFallbackResponse(text, targetLang);

                this.updateLiveStatus('Offline Mode • Verified Schemes');
                const schemesToRender = offlineData.schemes || [];
                this.appendChatMessage('assistant', offlineData.reply, schemesToRender, offlineData.spokenText, offlineData.language, offlineData.followUpQuestions);

                if (offlineData.spokenText) {
                    this.speak(offlineData.spokenText, offlineData.language);
                } else {
                    this.setState('idle');
                }
            } finally {
                // Always unlock processing lock so future voice and text inputs can proceed
                this.isProcessingSpeech = false;
            }
        }

        getOfflineFallbackResponse(text, lang = 'en') {
            const rawSchemes = (window.AppData && window.AppData.SAMPLE_SCHEMES) || window.ALL_SCHEMES || [];
            const query = (text || '').toLowerCase();
            const tokens = query.split(/\s+/).filter(w => w.length > 2);

            const scored = rawSchemes.map(s => {
                let score = 0;
                const title = (s.title || '').toLowerCase();
                const cat = (s.category || '').toLowerCase();
                const desc = (s.briefDescription || s.benefits || '').toLowerCase();
                const tags = Array.isArray(s.tags) ? s.tags.join(' ').toLowerCase() : '';

                for (const t of tokens) {
                    if (title.includes(t)) score += 10;
                    if (cat.includes(t)) score += 6;
                    if (tags.includes(t)) score += 4;
                    if (desc.includes(t)) score += 2;
                }
                return { scheme: s, score };
            }).filter(x => x.score > 0);

            scored.sort((a, b) => b.score - a.score);
            const top = scored.slice(0, 4).map(x => x.scheme);

            if (top.length > 0) {
                const schemeList = top.map((s, idx) => `${idx + 1}. **${s.title}**\n   • **Ministry:** ${s.ministry || 'Government of India'}\n   • **Benefits:** ${s.benefits || s.briefDescription || 'Direct financial/scholarship assistance'}`).join('\n\n');

                let reply = `Here are verified government schemes matched for your request:\n\n${schemeList}`;
                let spoken = `I found ${top.length} verified government schemes for you: ${top.map(s => s.title).join(', ')}.`;

                if (lang === 'hi') {
                    reply = `आपकी मांग के अनुसार सत्यापित सरकारी योजनाएं:\n\n${schemeList}`;
                    spoken = `मुझे आपके लिए ${top.length} सरकारी योजनाएं मिली हैं।`;
                } else if (lang === 'gu') {
                    reply = `તમારી વિનંતી માટે ચકાસાયેલ સરકારી યોજનાઓ:\n\n${schemeList}`;
                    spoken = `મને તમારા માટે ${top.length} સરકારી યોજનાઓ મળી છે.`;
                }

                return {
                    reply,
                    spokenText: spoken,
                    schemes: top,
                    language: lang,
                    followUpQuestions: [
                        'What are the eligibility criteria?',
                        'What documents do I need to apply?'
                    ]
                };
            }

            return {
                reply: `I searched the verified knowledge base but could not find an exact match for "${text}". You can ask about education scholarships, farmer schemes, healthcare, or business loans.`,
                spokenText: `I could not find an exact match for "${text}". Please try asking about scholarships, farmers, or loans.`,
                schemes: [],
                language: lang,
                followUpQuestions: [
                    'Show education scholarships',
                    'Show schemes for farmers',
                    'Show women empowerment schemes'
                ]
            };
        }

        // ── Conversation UI Helpers ────────────────────────────────────
        updateLiveStatus(statusText) {
            const statusEl = document.getElementById('jsVoiceLiveStatus');
            if (statusEl) {
                statusEl.textContent = statusText;
            }
        }

        setTranscriptPreview(text, isFinal) {
            const transcriptEl = document.getElementById('jsVoiceTranscriptPreview');
            if (!transcriptEl) return;
            transcriptEl.textContent = text;
            if (isFinal) {
                transcriptEl.classList.add('final');
            } else {
                transcriptEl.classList.remove('final');
            }
        }

        appendChatMessage(role, markdownText, schemes = [], spokenText = '', lang = 'en', followUpQuestions = []) {
            const messagesContainer = document.getElementById('jsVoiceMessages');
            if (!messagesContainer) return;

            const msgDiv = document.createElement('div');
            msgDiv.className = `js-voice-msg js-voice-msg-${role}`;

            const avatar = role === 'user' ? '👤' : '🇮🇳';
            const formatted = this.formatMarkdown(markdownText);

            let schemesHtml = '';
            if (schemes && schemes.length > 0) {
                schemesHtml = `
                    <div class="js-voice-schemes-grid">
                        ${schemes.map(s => {
                            let badgeClass = 'likely';      // default: amber/green (not 'unverified' red)
                            let badgeLabel = 'Likely Eligible'; // human-friendly default
                            if (s.eligibility_status === 'ELIGIBLE') {
                                badgeClass = 'eligible';
                                badgeLabel = '✅ Eligible';
                            } else if (s.eligibility_status === 'LIKELY_ELIGIBLE') {
                                badgeClass = 'likely';
                                badgeLabel = '🟡 Likely Eligible';
                            } else if (s.eligibility_status === 'NEEDS_MORE_INFORMATION') {
                                badgeClass = 'needs-info';
                                badgeLabel = 'ℹ️ Provide Details';
                            } else if (s.eligibility_status === 'NOT_ELIGIBLE') {
                                badgeClass = 'not-eligible';
                                badgeLabel = '❌ Not Eligible';
                            } else if (s.eligibility_status === 'UNVERIFIED') {
                                badgeClass = 'likely'; // Show as likely, not red unverified
                                badgeLabel = '🔍 Under Review';
                            }

                            return `
                            <div class="js-voice-scheme-card">
                                <div class="js-vcard-header">
                                    <span class="js-vcard-cat">${s.category || 'Government Scheme'}</span>
                                    <div class="js-vcard-badges">
                                        <span class="js-vcard-eligibility js-badge-${badgeClass}">${badgeLabel}</span>
                                        ${s.matchScore ? `<span class="js-vcard-score">${s.matchScore}</span>` : ''}
                                    </div>
                                </div>
                                <h4 class="js-vcard-title">${s.title}</h4>
                                <p class="js-vcard-benefit">${s.benefits || ''}</p>
                                <div class="js-vcard-footer">
                                    <a href="${s.applyLink || 'https://www.myscheme.gov.in/'}" target="_blank" rel="noopener noreferrer" class="js-vcard-link">
                                        Apply on Official Portal ↗
                                    </a>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            let followUpHtml = '';
            if (followUpQuestions && followUpQuestions.length > 0) {
                followUpHtml = `
                    <div class="js-voice-followups">
                        ${followUpQuestions.map(q => `
                            <button class="js-followup-chip" onclick="window.JanSahayVoice && window.JanSahayVoice.handleUserSpeech('${q.replace(/'/g, "\\'")}')">${q}</button>
                        `).join('')}
                    </div>
                `;
            }

            let replayBtnHtml = '';
            if (role === 'assistant' && spokenText) {
                replayBtnHtml = `
                    <button class="js-voice-replay-btn" title="Read this aloud" data-spoken="${encodeURIComponent(spokenText)}" data-lang="${lang}">
                        🔊 Listen
                    </button>
                `;
            }

            msgDiv.innerHTML = `
                <div class="js-msg-avatar">${avatar}</div>
                <div class="js-msg-body">
                    <div class="js-msg-content">${formatted}</div>
                    ${schemesHtml}
                    ${followUpHtml}
                    ${replayBtnHtml}
                </div>
            `;

            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Clear preview
            if (role === 'user') {
                this.setTranscriptPreview('', true);
            }

            // Wire up listen replay button
            const replayBtn = msgDiv.querySelector('.js-voice-replay-btn');
            if (replayBtn) {
                replayBtn.addEventListener('click', (e) => {
                    const textToRead = decodeURIComponent(e.currentTarget.getAttribute('data-spoken'));
                    const readLang = e.currentTarget.getAttribute('data-lang') || 'en';
                    this.speak(textToRead, readLang);
                });
            }
        }

        formatMarkdown(text) {
            if (!text) return '';
            let html = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>')
                .replace(/\n\n/g, '<p></p>')
                .replace(/\n/g, '<br/>');
            return html;
        }

        resetSession() {
            this.stopSpeaking();
            this.stopListening();
            this.isProcessingSpeech = false;
            this.selectedLanguage = 'auto';
            this.currentLanguage = 'auto';
            this.detectedLanguage = 'en';
            this.setRecognitionLanguage();

            // Reset pill active state and label
            document.querySelectorAll('.js-lang-pill').forEach(p => {
                const isAuto = p.getAttribute('data-lang') === 'auto';
                p.classList.toggle('active', isAuto);
                if (isAuto) p.textContent = 'Auto 🌐';
            });

            this.sessionId = 'js_voice_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
            
            const messagesContainer = document.getElementById('jsVoiceMessages');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
            }

            // Call backend reset
            fetch(`${this.apiBase}/api/voice/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: this.sessionId })
            }).catch(() => {});

            this.appendChatMessage(
                'assistant',
                '🙏 **Namaste! Welcome to JanSahay Multilingual Voice AI.**\n\nI can help you find government schemes in **English**, **हिंदी (Hindi)**, and **ગુજરાતી (Gujarati)**.\n\n*Tap the microphone and ask a question!*',
                [],
                'Namaste! Welcome to JanSahay Voice Assistant. Tap the microphone and ask any question in English, Hindi, or Gujarati.',
                'en'
            );
            this.updateLiveStatus('Session reset. Tap the mic to speak.');
            this.setState('idle');
        }

        openModal() {
            const modal = document.getElementById('jsVoiceModal');
            if (!modal) return;
            modal.classList.add('open');
            document.body.classList.add('js-voice-modal-active');

            // If empty, show welcome message
            const messagesContainer = document.getElementById('jsVoiceMessages');
            if (messagesContainer && messagesContainer.children.length === 0) {
                this.appendChatMessage(
                    'assistant',
                    '🙏 **Namaste! Welcome to JanSahay Voice AI.**\n\nSpeak naturally in **English**, **हिंदी**, or **ગુજરાતી**.\n\nTry saying:\n- *"I am a farmer, are there any schemes for me?"*\n- *"Mujhe students ke liye scholarship chahiye"*\n- *"MYSY yojana vishe mahiti aapo"*',
                    [],
                    'Namaste! I am JanSahay Voice Assistant. You can speak with me in English, Hindi, or Gujarati.',
                    'en'
                );
            }
        }

        closeModal() {
            const modal = document.getElementById('jsVoiceModal');
            if (!modal) return;
            modal.classList.remove('open');
            document.body.classList.remove('js-voice-modal-active');
            this.stopSpeaking();
            this.stopListening();
        }

        // ── Construct Voice UI DOM Elements ──────────────────────────
        createVoiceUI() {
            // 1. Floating Action Button (FAB)
            const fab = document.createElement('button');
            fab.id = 'jsVoiceFab';
            fab.className = 'js-voice-fab';
            fab.setAttribute('aria-label', 'Open Multilingual Voice Assistant');
            fab.innerHTML = `
                <span class="js-fab-pulse"></span>
                <span class="js-fab-icon">🎙️</span>
                <span class="js-fab-badge">AI Voice</span>
            `;
            document.body.appendChild(fab);

            // 2. Full Voice Assistant Modal
            const modal = document.createElement('div');
            modal.id = 'jsVoiceModal';
            modal.className = 'js-voice-modal';
            modal.innerHTML = `
                <div class="js-voice-backdrop"></div>
                <div class="js-voice-dialog" role="dialog" aria-modal="true" aria-labelledby="jsVoiceTitle">
                    <!-- Header -->
                    <div class="js-voice-header">
                        <div class="js-voice-brand">
                            <div class="js-voice-avatar-ring">🎙️</div>
                            <div>
                                <h3 id="jsVoiceTitle" class="js-voice-title">JanSahay Voice AI</h3>
                                <div id="jsVoiceStateBadge" class="js-voice-state-pill">
                                    <span>🟢</span> <span>Ready</span>
                                </div>
                            </div>
                        </div>

                        <!-- Language Selector Pills -->
                        <div class="js-voice-lang-pills" id="jsVoiceLangPills">
                            <button type="button" class="js-lang-pill active" data-lang="auto">Auto 🌐</button>
                            <button type="button" class="js-lang-pill" data-lang="en">English</button>
                            <button type="button" class="js-lang-pill" data-lang="hi">हिंदी</button>
                            <button type="button" class="js-lang-pill" data-lang="gu">ગુજરાતી</button>
                        </div>

                        <!-- Close Button -->
                        <div class="js-voice-actions">
                            <button type="button" id="jsVoiceResetBtn" class="js-voice-icon-btn" title="Start New Conversation">🔄</button>
                            <button type="button" id="jsVoiceCloseBtn" class="js-voice-icon-btn" title="Close Voice Assistant">✕</button>
                        </div>
                    </div>

                    <!-- Visualizer & Real-Time Waveform -->
                    <div class="js-voice-visualizer-container">
                        <div class="js-voice-orb" id="jsVoiceOrb">
                            <div class="js-orb-glow"></div>
                            <div class="js-voice-soundwave" id="jsVoiceSoundwave">
                                <span></span><span></span><span></span><span></span>
                                <span></span><span></span><span></span><span></span>
                                <span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                        <div class="js-voice-transcript-preview" id="jsVoiceTranscriptPreview">Tap the microphone to speak...</div>
                        <div class="js-voice-live-status" id="jsVoiceLiveStatus">Supports English, हिंदी, and ગુજરાતી</div>
                    </div>

                    <!-- Messages Scroll Container -->
                    <div class="js-voice-messages" id="jsVoiceMessages"></div>

                    <!-- Footer Controls -->
                    <div class="js-voice-footer">
                        <div class="js-voice-controls-row">
                            <button type="button" id="jsVoiceStopSpeakBtn" class="js-ctrl-action-btn" title="Stop Assistant Speaking">
                                ⏹️ Stop Speaking
                            </button>

                            <!-- Big Main Microphone Button -->
                            <button type="button" id="jsVoiceMicBtn" class="js-voice-big-mic" aria-label="Toggle Microphone">
                                <span class="js-mic-ring"></span>
                                <span class="js-mic-icon">🎙️</span>
                            </button>

                            <button type="button" id="jsVoiceClearBtn" class="js-ctrl-action-btn" title="Clear Chat">
                                🗑️ Clear
                            </button>
                        </div>

                        <!-- Text Fallback Input Row -->
                        <form class="js-voice-input-form" id="jsVoiceInputForm" onsubmit="return false;">
                            <input type="text" id="jsVoiceTextInput" placeholder="Or type your scheme question here..." autocomplete="off" />
                            <button type="submit" id="jsVoiceSendBtn" aria-label="Send Message">
                                ➔
                            </button>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Wire up event listeners
            fab.addEventListener('click', () => this.openModal());

            const closeBtn = document.getElementById('jsVoiceCloseBtn');
            if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

            const backdrop = modal.querySelector('.js-voice-backdrop');
            if (backdrop) backdrop.addEventListener('click', () => this.closeModal());

            const resetBtn = document.getElementById('jsVoiceResetBtn');
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetSession());

            const clearBtn = document.getElementById('jsVoiceClearBtn');
            if (clearBtn) clearBtn.addEventListener('click', () => this.resetSession());

            const stopSpeakBtn = document.getElementById('jsVoiceStopSpeakBtn');
            if (stopSpeakBtn) stopSpeakBtn.addEventListener('click', () => this.stopSpeaking());

            const micBtn = document.getElementById('jsVoiceMicBtn');
            if (micBtn) {
                micBtn.addEventListener('click', () => {
                    this.unlockAudio();
                    if (this.state === 'listening') {
                        this.stopListening();
                        this.setState('idle');
                        this.updateLiveStatus('Microphone stopped. Click to speak.');
                    } else {
                        this.startListening();
                    }
                });
            }

            // Language selector pills
            const langPills = modal.querySelectorAll('.js-lang-pill');
            langPills.forEach(pill => {
                pill.addEventListener('click', (e) => {
                    this.unlockAudio();
                    langPills.forEach(p => p.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.selectedLanguage = e.currentTarget.getAttribute('data-lang');
                    this.currentLanguage = this.selectedLanguage;
                    this.setRecognitionLanguage();

                    // If user manually re-selects Auto, reset the pill label
                    const autoPill = modal.querySelector('.js-lang-pill[data-lang="auto"]');
                    if (autoPill && this.selectedLanguage === 'auto') {
                        autoPill.textContent = 'Auto 🌐';
                    }

                    const langNames = { auto: 'Auto-detect 🌐', en: 'English', hi: 'हिंदी (Hindi)', gu: 'ગુજરાતી (Gujarati)' };
                    this.updateLiveStatus(`Language set to ${langNames[this.selectedLanguage] || this.selectedLanguage}`);
                });
            });

            // Text Fallback Form
            const form = document.getElementById('jsVoiceInputForm');
            const textInput = document.getElementById('jsVoiceTextInput');
            if (form && textInput) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.unlockAudio();
                    const val = textInput.value.trim();
                    if (val) {
                        textInput.value = '';
                        this.handleUserSpeech(val);
                    }
                });
            }
        }

        // ── Bind to Navigation & Hero Triggers on Existing Page ───────
        bindGlobalTriggers() {
            // Find any button with class or id for voice
            document.querySelectorAll('.js-trigger-voice, [data-action="voice-search"], #voiceAssistantBtn, #navVoiceBtn').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal();
                    // Optionally auto-start listening after short delay
                    setTimeout(() => this.startListening(), 400);
                });
            });

            // Also attach a mic icon into existing chatbot input if present
            const chatForm = document.getElementById('chatForm');
            const chatInput = document.getElementById('chatInput');
            if (chatForm && chatInput && !document.getElementById('chatMicBtn')) {
                const micBtn = document.createElement('button');
                micBtn.type = 'button';
                micBtn.id = 'chatMicBtn';
                micBtn.className = 'chat-mic-btn';
                micBtn.title = 'Speak using Multilingual AI Voice Assistant';
                micBtn.innerHTML = '🎙️';
                micBtn.style.cssText = 'background:none; border:none; font-size:1.2rem; cursor:pointer; padding:0 8px; display:inline-flex; align-items:center;';

                micBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal();
                    setTimeout(() => this.startListening(), 350);
                });

                // Insert before submit button
                const sendBtn = chatForm.querySelector('button[type="submit"]');
                if (sendBtn) {
                    chatForm.insertBefore(micBtn, sendBtn);
                } else {
                    chatForm.appendChild(micBtn);
                }
            }
        }
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.JanSahayVoice = new JanSahayVoiceAssistant();
        });
    } else {
        window.JanSahayVoice = new JanSahayVoiceAssistant();
    }
})();
