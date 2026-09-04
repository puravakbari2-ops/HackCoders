/* ============================================================
   Middleware: Global Error Handler
   ============================================================ */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message    = err.message    || 'Internal Server Error';

    console.error(`[ERROR] ${req.method} ${req.url} → ${statusCode}: ${message}`);
    if (process.env.NODE_ENV === 'development' && err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code:    statusCode,
            message: message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
}

module.exports = errorHandler;
