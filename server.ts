import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { prisma } from './config/db';

const PORT = process.env.PORT || 5000;
const app = createApp();

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('[Database] Connected successfully to Prisma database.');

    app.listen(PORT, () => {
      console.log(`[Server] MS COLLECTION Backend API is listening on port ${PORT}`);
      console.log(`[Server] API Base: http://localhost:${PORT}/api`);
      console.log(`[Server] Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('[Fatal] Failed to connect to database or start server:', error);
    process.exit(1);
  }
}

startServer();
