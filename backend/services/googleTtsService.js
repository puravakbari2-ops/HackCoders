/* ============================================================
   JanSahay AI - Google Cloud Text-to-Speech Service
   Official @google-cloud/text-to-speech integration.
   Supports Indian multilingual locales (en-IN, hi-IN, gu-IN)
   with natural text cleaning, safe sentence chunking,
   reliable voice fallbacks, and seamless MP3 concatenation.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');

// ── Voice Configuration & Fallbacks ───────────────────────────
// Preferred Indian voices with graceful within-language fallbacks
const VOICE_CONFIG = {
    'en-IN': {
        languageCode: 'en-IN',
        preferredVoice: process.env.GOOGLE_TTS_EN_VOICE || 'en-IN-Neural2-A',
        fallbacks: [
            'en-IN-Neural2-A',
            'en-IN-Wavenet-A',
            'en-IN-Standard-A',
            'en-IN-Neural2-B',
            'en-IN-Wavenet-B',
            'en-IN-Standard-B'
        ]
    },
    'hi-IN': {
        languageCode: 'hi-IN',
        preferredVoice: process.env.GOOGLE_TTS_HI_VOICE || 'hi-IN-Neural2-A',
        fallbacks: [
            'hi-IN-Neural2-A',
            'hi-IN-Wavenet-A',
            'hi-IN-Standard-A',
            'hi-IN-Neural2-B',
            'hi-IN-Wavenet-B',
            'hi-IN-Standard-B'
        ]
    },
    'gu-IN': {
        languageCode: 'gu-IN',
        preferredVoice: process.env.GOOGLE_TTS_GU_VOICE || 'gu-IN-Wavenet-A',
        fallbacks: [
            'gu-IN-Wavenet-A',
            'gu-IN-Standard-A',
            'gu-IN-Wavenet-B',
            'gu-IN-Standard-B'
        ]
    }
};

// Language normalization map
const LANG_MAP = {
    'en': 'en-IN',
    'en-in': 'en-IN',
    'en-us': 'en-IN',
    'hi': 'hi-IN',
    'hi-in': 'hi-IN',
    'gu': 'gu-IN',
    'gu-in': 'gu-IN'
};

// ── Client Singleton & Initialization ─────────────────────────
let _ttsClient = null;
let _clientInitError = null;

/**
 * Checks whether Google credentials appear to be configured.
 * Supports GOOGLE_APPLICATION_CREDENTIALS path or standard ADC.
 */
function getCredentialStatus() {
    const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (credPath) {
        const resolved = path.isAbsolute(credPath) ? credPath : path.resolve(process.cwd(), credPath);
        if (fs.existsSync(resolved)) {
            return {
                configured: true,
                source: 'GOOGLE_APPLICATION_CREDENTIALS',
                fileFound: true
            };
        }
        return {
            configured: false,
            source: 'GOOGLE_APPLICATION_CREDENTIALS',
            fileFound: false,
            detail: `File specified in GOOGLE_APPLICATION_CREDENTIALS not found at: ${resolved}`
        };
    }

    // Check if gcloud application-default credentials file exists on Windows or Linux
    const userHome = process.env.USERPROFILE || process.env.HOME || '';
    const gcloudAdcPath = path.join(userHome, 'AppData', 'Roaming', 'gcloud', 'application_default_credentials.json');
    const gcloudAdcUnix = path.join(userHome, '.config', 'gcloud', 'application_default_credentials.json');

    if (fs.existsSync(gcloudAdcPath) || fs.existsSync(gcloudAdcUnix)) {
        return {
            configured: true,
            source: 'Application Default Credentials (ADC)',
            fileFound: true
        };
    }

    return {
        configured: false,
        source: 'none',
        fileFound: false,
        detail: 'Neither GOOGLE_APPLICATION_CREDENTIALS nor gcloud ADC was detected.'
    };
}

/**
 * Returns a reusable TextToSpeechClient instance.
 * Throws a clean error if credentials cannot be initialized.
 */
function getClient() {
    if (_ttsClient) {
        return _ttsClient;
    }

    try {
        // Initializing the client uses GOOGLE_APPLICATION_CREDENTIALS or ADC automatically
        _ttsClient = new textToSpeech.TextToSpeechClient();
        _clientInitError = null;
        return _ttsClient;
    } catch (err) {
        _clientInitError = err;
        console.error('[Google TTS Service] Failed to initialize TextToSpeechClient:', err.message);
        throw new Error(`Google Cloud Text-to-Speech Client initialization failed: ${err.message}`);
    }
}

/**
 * Normalizes input language string into an Indian locale code (en-IN, hi-IN, gu-IN).
 */
function normalizeLanguage(lang) {
    if (!lang) return 'en-IN';
    const normalized = String(lang).trim().toLowerCase();
    return LANG_MAP[normalized] || 'en-IN';
}

/**
 * Safe text-cleaning before speech synthesis:
 * - Strips markdown headers, bold/italic symbols, bullet points, emojis, HTML.
 * - Converts raw URLs to natural portal announcements.
 * - Preserves scheme names, numbers, amounts (₹, rupees), eligibility details, and document names.
 */
function cleanTextForSpeech(text, targetLocale = 'en-IN') {
    if (!text || typeof text !== 'string') return '';

    let cleaned = text;

    // 1. Remove code blocks & inline code
    cleaned = cleaned.replace(/```[\s\S]*?```/g, ' ');
    cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

    // 2. Remove HTML tags
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');

    // 3. Handle markdown links: [Title](url) → Title + Portal Notice
    cleaned = cleaned.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, url) => {
        // Keep the descriptive label
        return label;
    });

    // 4. Handle remaining raw URLs
    const urlNotice = targetLocale === 'gu-IN'
        ? 'તમે સત્તાવાર પોર્ટલ પર અરજી લિંક જોઈ શકો છો.'
        : targetLocale === 'hi-IN'
            ? 'आप आधिकारिक पोर्टल पर आवेदन लिंक देख सकते हैं।'
            : 'You can view the official application link on the portal.';

    cleaned = cleaned.replace(/https?:\/\/[^\s]+/gi, ` ${urlNotice} `);

    // 5. Remove markdown formatting markers
    cleaned = cleaned
        .replace(/^#{1,6}\s+/gm, '')        // Markdown headers
        .replace(/\*\*([^*]+)\*\*/g, '$1')  // Bold **text**
        .replace(/__([^_]+)__/g, '$1')      // Bold __text__
        .replace(/\*([^*]+)\*/g, '$1')      // Italic *text*
        .replace(/_([^_]+)_/g, '$1')        // Italic _text_
        .replace(/~~([^~]+)~~/g, '$1');     // Strikethrough

    // 6. Remove bullet symbols and decorative list markers
    cleaned = cleaned.replace(/^[\s]*[•●▪*+-]\s+/gm, '');

    // 7. Strip emojis and variation selectors while preserving currency symbols (₹, $, €), punctuation, and Indic scripts
    cleaned = cleaned.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '');

    // 8. Replace excessive linebreaks with sentence pauses
    cleaned = cleaned.replace(/[\r\n]+/g, '. ');

    // 9. Normalize multiple spaces and multiple periods
    cleaned = cleaned
        .replace(/\.{2,}/g, '.')
        .replace(/\s+/g, ' ')
        .trim();

    return cleaned;
}

/**
 * Splits long text into safe chunks for Google TTS without breaking words,
 * numbers, currency figures, or scheme names.
 * Maximum chunk target: 900 characters (well within Google's 5000-char limit).
 */
function splitTextForSpeech(text, maxChunkLen = 900) {
    if (!text || text.length <= maxChunkLen) {
        return text ? [text] : [];
    }

    // Split primarily on sentence boundaries:
    // Purna viram (।), period followed by space, question mark, exclamation mark
    const sentenceRegex = /([.?!।]|\n+)/;
    const tokens = text.split(sentenceRegex);
    const sentences = [];

    for (let i = 0; i < tokens.length; i += 2) {
        const part = tokens[i] || '';
        const punct = tokens[i + 1] || '';
        const combined = (part + punct).trim();
        if (combined) {
            sentences.push(combined);
        }
    }

    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if (!sentence) continue;

        if ((currentChunk + ' ' + sentence).length <= maxChunkLen) {
            currentChunk = currentChunk ? (currentChunk + ' ' + sentence) : sentence;
        } else {
            if (currentChunk) {
                chunks.push(currentChunk.trim());
            }

            // If a single sentence exceeds maxChunkLen, split at comma or semicolon
            if (sentence.length > maxChunkLen) {
                const subParts = sentence.split(/([,;،])/);
                let subChunk = '';
                for (let j = 0; j < subParts.length; j += 2) {
                    const sp = subParts[j] || '';
                    const sc = subParts[j + 1] || '';
                    const subCombined = (sp + sc).trim();
                    if ((subChunk + ' ' + subCombined).length <= maxChunkLen) {
                        subChunk = subChunk ? (subChunk + ' ' + subCombined) : subCombined;
                    } else {
                        if (subChunk) chunks.push(subChunk.trim());
                        subChunk = subCombined;
                    }
                }
                if (subChunk) chunks.push(subChunk.trim());
                currentChunk = '';
            } else {
                currentChunk = sentence;
            }
        }
    }

    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    return chunks.length > 0 ? chunks : [text];
}

/**
 * Synthesizes a single chunk using Google Cloud Text-to-Speech client.
 * Tries the preferred voice first, then gracefully attempts fallback voices for the same locale.
 */
async function synthesizeSingleChunk(client, chunkText, localeConfig, audioConfig) {
    const candidateVoices = [
        localeConfig.preferredVoice,
        ...localeConfig.fallbacks.filter(v => v !== localeConfig.preferredVoice)
    ];

    let lastError = null;

    for (const voiceName of candidateVoices) {
        try {
            const request = {
                input: { text: chunkText },
                voice: {
                    languageCode: localeConfig.languageCode,
                    name: voiceName
                },
                audioConfig: {
                    audioEncoding: 'MP3',
                    speakingRate: audioConfig.speakingRate,
                    pitch: audioConfig.pitch
                }
            };

            const [response] = await client.synthesizeSpeech(request);

            if (response && response.audioContent) {
                return {
                    buffer: Buffer.isBuffer(response.audioContent)
                        ? response.audioContent
                        : Buffer.from(response.audioContent),
                    voiceUsed: voiceName
                };
            }
        } catch (err) {
            lastError = err;
            console.warn(`[Google TTS] Voice "${voiceName}" failed for ${localeConfig.languageCode}: ${err.message}. Trying next fallback voice...`);
        }
    }

    // If specific named voices failed, try default locale voice without specifying voice name
    try {
        console.warn(`[Google TTS] All specified voices failed. Trying generic locale fallback for ${localeConfig.languageCode}...`);
        const defaultReq = {
            input: { text: chunkText },
            voice: { languageCode: localeConfig.languageCode },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: audioConfig.speakingRate,
                pitch: audioConfig.pitch
            }
        };
        const [response] = await client.synthesizeSpeech(defaultReq);
        if (response && response.audioContent) {
            return {
                buffer: Buffer.isBuffer(response.audioContent)
                    ? response.audioContent
                    : Buffer.from(response.audioContent),
                voiceUsed: 'default-' + localeConfig.languageCode
            };
        }
    } catch (genericErr) {
        lastError = genericErr;
    }

    throw lastError || new Error(`Google TTS failed to synthesize speech for locale ${localeConfig.languageCode}`);
}

/**
 * Main speech synthesis entry point.
 * Cleans text, splits into chunks, calls Google Cloud TTS,
 * and concatenates MP3 audio buffers into a single playable MP3.
 *
 * @param {string} rawText - Uncleaned response text from AI / RAG system
 * @param {string} lang - Language code ('en', 'hi', 'gu', 'en-IN', etc.)
 * @param {object} [customOptions] - Optional overrides (speakingRate, pitch)
 * @returns {Promise<{ audioBuffer: Buffer, contentType: string, voiceUsed: string, languageCode: string, chunks: number }>}
 */
async function synthesizeSpeech(rawText, lang = 'en', customOptions = {}) {
    if (!rawText || !rawText.trim()) {
        const err = new Error('Text parameter is required and cannot be empty.');
        err.statusCode = 400;
        throw err;
    }

    // Check if Google Cloud credentials appear configured
    const credStatus = getCredentialStatus();
    if (!credStatus.configured) {
        const error = new Error(
            `Google Cloud credentials are not configured. ${credStatus.detail || ''} ` +
            `Please set GOOGLE_APPLICATION_CREDENTIALS in backend/.env pointing to your service account JSON key file.`
        );
        error.statusCode = 503;
        error.code = 'CREDENTIALS_MISSING';
        throw error;
    }

    const client = getClient();
    const targetLocale = normalizeLanguage(lang);
    const localeConfig = VOICE_CONFIG[targetLocale] || VOICE_CONFIG['en-IN'];

    // Audio parameters from env or custom options
    const speakingRate = customOptions.speakingRate
        ? parseFloat(customOptions.speakingRate)
        : (parseFloat(process.env.GOOGLE_TTS_SPEAKING_RATE) || 0.95);

    const pitch = customOptions.pitch
        ? parseFloat(customOptions.pitch)
        : (parseFloat(process.env.GOOGLE_TTS_PITCH) || 0);

    const audioConfig = { speakingRate, pitch };

    // 1. Clean the text safely for speech
    const cleanedText = cleanTextForSpeech(rawText, targetLocale);
    if (!cleanedText) {
        const err = new Error('Text contains no synthesizable content after cleaning.');
        err.statusCode = 400;
        throw err;
    }

    // 2. Safe chunking
    const chunks = splitTextForSpeech(cleanedText, 900);

    console.log(`[Google TTS] Synthesizing speech: locale=${targetLocale}, chunks=${chunks.length}, length=${cleanedText.length} chars`);

    // 3. Synthesize all chunks sequentially to maintain prosody order
    const audioBuffers = [];
    let voiceUsed = localeConfig.preferredVoice;

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const res = await synthesizeSingleChunk(client, chunk, localeConfig, audioConfig);
        audioBuffers.push(res.buffer);
        voiceUsed = res.voiceUsed;
    }

    // 4. Concatenate MP3 frames into single continuous stream
    const finalAudioBuffer = Buffer.concat(audioBuffers);

    return {
        audioBuffer: finalAudioBuffer,
        contentType: 'audio/mpeg',
        voiceUsed,
        languageCode: targetLocale,
        chunks: chunks.length
    };
}

/**
 * Health check diagnostic for Google Cloud Text-to-Speech.
 * Never exposes private keys or secret values.
 */
function checkHealth() {
    const credStatus = getCredentialStatus();
    const isEnabled = process.env.GOOGLE_TTS_ENABLED !== 'false';

    let clientInitializable = false;
    let initErrorMsg = null;

    if (credStatus.configured) {
        try {
            getClient();
            clientInitializable = true;
        } catch (e) {
            initErrorMsg = e.message;
        }
    }

    return {
        enabled: isEnabled,
        provider: 'Google Cloud Text-to-Speech',
        version: '@google-cloud/text-to-speech',
        languages: ['en', 'hi', 'gu'],
        supportedLocales: ['en-IN', 'hi-IN', 'gu-IN'],
        credentialsConfigured: credStatus.configured,
        credentialsSource: credStatus.source,
        clientInitializable,
        initError: initErrorMsg,
        voices: {
            english: VOICE_CONFIG['en-IN'].preferredVoice,
            hindi: VOICE_CONFIG['hi-IN'].preferredVoice,
            gujarati: VOICE_CONFIG['gu-IN'].preferredVoice
        }
    };
}

module.exports = {
    synthesizeSpeech,
    normalizeLanguage,
    cleanTextForSpeech,
    splitTextForSpeech,
    checkHealth,
    getCredentialStatus,
    VOICE_CONFIG
};
