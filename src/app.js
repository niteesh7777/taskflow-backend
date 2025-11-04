import express from 'express';
import cors from 'cors';
// import AppError from './utils/AppError.js';
import globalErrorHandler from './middlewares/error.middleware.js';
import routes from './routes/v1/index.js'

const app = express();

//common middlewares
app.use(express.json());
app.use(cors());

//routing
app.use('/api', routes);

app.use(globalErrorHandler);

export default app;
