import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/user.model.js';

const authUser = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in. Please log in to continue.', 401));
  }

  try {
    const decodedPayload = jwt.verify(token, config.jwtSecret);

    const currentuser = await User.findById(decodedPayload.id);

    if (!currentuser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentuser;

    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token. Unauthorized access.', 401));
  }
});

export default authUser;
