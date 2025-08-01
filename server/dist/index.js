"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = require("winston");
// Import routes
const inventory_1 = __importDefault(require("./routes/inventory"));
const production_1 = __importDefault(require("./routes/production"));
const demand_1 = __importDefault(require("./routes/demand"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const auth_1 = __importDefault(require("./routes/auth"));
const oos_1 = __importDefault(require("./routes/oos"));
const wholesalers_1 = __importDefault(require("./routes/wholesalers"));
const skus_1 = __importDefault(require("./routes/skus"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Logger setup
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    defaultMeta: { service: 'abi-supply-chain' },
    transports: [
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        })
    ]
});
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/oos', oos_1.default);
app.use('/api/wholesalers', wholesalers_1.default);
app.use('/api/skus', skus_1.default);
app.use('/api/inventory', inventory_1.default);
app.use('/api/production', production_1.default);
app.use('/api/demand', demand_1.default);
app.use('/api/analytics', analytics_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// Root endpoint - API information
app.get('/', (req, res) => {
    res.status(200).json({
        name: 'ABI OOS Copilot API',
        version: '1.0.0',
        status: 'Running',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            auth: '/api/auth/*',
            oos: '/api/oos/*',
            wholesalers: '/api/wholesalers/*',
            skus: '/api/skus/*',
            inventory: '/api/inventory/*',
            production: '/api/production/*',
            demand: '/api/demand/*',
            analytics: '/api/analytics/*'
        }
    });
});
// Error handling middleware
app.use((error, req, res, next) => {
    logger.error('Unhandled error:', error);
    res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(PORT, () => {
    logger.info(`ABI Supply Chain Server running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
//# sourceMappingURL=index.js.map