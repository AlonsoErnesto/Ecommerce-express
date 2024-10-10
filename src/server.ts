import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { openAPIRouter } from '@/api-docs/openAPIRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';
import { brandRouter } from './api/brands/brandRouter';
import { categoryRouter } from './api/categories/categoryRouter';
import { productRouter } from './api/product/productRouter';
import { adminRouter } from './api/user/admin/adminRouter';
import { clientRouter } from './api/user/client/clientRouter';
import { connectDB } from './common/database';
import {
  isAdminMiddleware,
  jwtMiddleware,
} from './common/middleware/authenticateToken';

const logger = pino({ name: 'server start' });
const app: Express = express();

// connect db
connectDB();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/products', jwtMiddleware, isAdminMiddleware, productRouter);
app.use('/category', jwtMiddleware, isAdminMiddleware, categoryRouter);
app.use('/brand', jwtMiddleware, isAdminMiddleware, brandRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
