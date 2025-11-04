import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already exists', 400);

  const user = await User.create({ name, email, password, role });

  const token = signToken(user._id);
  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('Invalid email or password', 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  const token = signToken(user._id);
  return { user, token };
};
