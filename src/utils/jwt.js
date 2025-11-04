import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpriresIn,
  });
};
