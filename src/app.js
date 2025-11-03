import express from 'express';
import cors from 'cors';
import AppError from './utils/AppError.js';
import globalErrorHandler from './middlewares/error.middleware.js';
import authrouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', authrouter);

app.use(globalErrorHandler);

export default app;
