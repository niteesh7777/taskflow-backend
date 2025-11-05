import express from 'express';
import authRoutes from './auth.routes.js';
import taskRoutes from './task.routes.js';
import testRoutes from './test.routes.js';

const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/task', taskRoutes);
router.use('/v1/test', testRoutes);

export default router;
