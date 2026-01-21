import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        service: 'BuyAI Gateway',
        timestamp: new Date().toISOString()
    });
});

// API routes (we'll add these next)
app.get('/api', (req: Request, res: Response) => {
    res.json({
        message: 'BuyAI Gateway API',
        version: '0.1.0',
        endpoints: [
            'POST /api/search',
            'POST /api/order/create',
            'GET /api/order/:id'
        ]
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.method} ${req.path} not found`
        }
    });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 BuyAI Gateway started');
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔌 API endpoint: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});