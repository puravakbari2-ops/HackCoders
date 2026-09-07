/* ============================================================
   JanSahay AI - Google Cloud Text-to-Speech Controller
   Replaces translate.googleapis.com with official Google Cloud
   Text-to-Speech Node.js API (@google-cloud/text-to-speech).
   Handles audio synthesis streaming and health diagnostics.
   ============================================================ */

const googleTtsService = require('../services/googleTtsService');

// Maximum allowed character length for a single request (protect against abuse)
const MAX_REQUEST_CHARS = 5000;

/**
 * GET /api/tts?text=<encoded text>&lang=<en|hi|gu|en-IN|hi-IN|gu-IN>
 * Also supports POST with { text, lang } in request body.
 * Returns: audio/mpeg stream
 */
exports.speak = async (req, res) => {
    try {
        const text = (req.query.text || (req.body && req.body.text) || '').trim();
        const lang = req.query.lang || (req.body && req.body.lang) || 'en';

        // 1. Validation: reject empty text
        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Bad Request',
                message: 'The "text" parameter is required and cannot be empty.'
            });
        }

        // 2. Length check to protect backend resources
        if (text.length > MAX_REQUEST_CHARS) {
            return res.status(400).json({
                success: false,
                error: 'Payload Too Large',
                message: `Text length exceeds maximum allowed limit of ${MAX_REQUEST_CHARS} characters.`
            });
        }

        // 3. Optional audio rate/pitch query params
        const options = {};
        if (req.query.rate) options.speakingRate = parseFloat(req.query.rate);
        if (req.query.pitch) options.pitch = parseFloat(req.query.pitch);

        // 4. Synthesize speech using Google Cloud TTS
        const result = await googleTtsService.synthesizeSpeech(text, lang, options);

        // 5. Send audio stream with proper response headers
        res.setHeader('Content-Type', result.contentType || 'audio/mpeg');
        res.setHeader('Content-Length', result.audioBuffer.length);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('X-TTS-Voice', result.voiceUsed);
        res.setHeader('X-TTS-Locale', result.languageCode);
        res.setHeader('X-TTS-Chunks', result.chunks);

        return res.end(result.audioBuffer);

    } catch (err) {
        console.error('[TTS Controller Error]:', err.message);

        // Determine appropriate HTTP status code
        const statusCode = err.statusCode || (err.code === 'CREDENTIALS_MISSING' ? 503 : 500);

        // Never return HTTP 200 with invalid audio
        return res.status(statusCode).json({
            success: false,
            error: err.code || 'TTS_SYNTHESIS_FAILED',
            message: err.message || 'An error occurred during Google Cloud speech synthesis.'
        });
    }
};

/**
 * GET /api/tts/health
 * Reports Google Cloud TTS status without exposing sensitive credentials or keys.
 */
exports.health = (req, res) => {
    try {
        const healthData = googleTtsService.checkHealth();
        return res.json({
            success: true,
            status: healthData.credentialsConfigured ? 'HEALTHY' : 'NEEDS_CONFIGURATION',
            ...healthData,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 'ERROR',
            message: err.message
        });
    }
};
