"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const createApp = () => {
    const app = (0, express_1.default)();
    const allowedOrigins = [
        process.env.CLIENT_URL || 'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
    ];
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, or server-to-server)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(null, true); // Allow all in development
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    // Mount API endpoints
    app.use('/api', routes_1.default);
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
        });
    });
    // Global Error Handler
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
