import express from 'express';
import { register, login } from '../../controllers/auth.controller.js';
import authUser from '../../middlewares/authentication.middleware.js';
import restrictTo from '../../middlewares/restrictTo.middleware.js';
import { userProfile, adminProfile } from '../../controllers/profile.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../../validators/auth.validators.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/user', authUser, restrictTo("user"), userProfile);
router.get('/admin', authUser, restrictTo("admin"), adminProfile);

export default router;
