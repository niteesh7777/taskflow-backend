import jwt from 'jsonwebtoken';
import {config } from '../config/env'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpriresIn,
  });
};
