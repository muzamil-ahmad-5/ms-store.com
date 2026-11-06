"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = (0, app_1.createApp)();
async function startServer() {
    try {
        // Verify database connection
        await db_1.prisma.$connect();
        console.log('[Database] Connected successfully to Prisma database.');
        app.listen(PORT, () => {
            console.log(`[Server] MS COLLECTION Backend API is listening on port ${PORT}`);
            console.log(`[Server] API Base: http://localhost:${PORT}/api`);
            console.log(`[Server] Health Check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error('[Fatal] Failed to connect to database or start server:', error);
        process.exit(1);
    }
}
startServer();
