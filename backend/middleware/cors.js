/* ============================================================
   Middleware: CORS Configuration
   ============================================================ */

const cors = require('cors');

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5500',
    'http://127.0.0.1:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',  // VS Code Live Server
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin or 'null' (mobile apps, curl, Postman, file://)
        if (!origin || origin === 'null') return callback(null, true);

        // Allow any localhost / 127.0.0.1 port in development
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }

        // Allow any onrender.com domain
        if (/^https:\/\/[\w-]+\.onrender\.com$/.test(origin)) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

module.exports = cors(corsOptions);
