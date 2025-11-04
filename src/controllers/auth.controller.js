import * as authService from '../services/auth.service.js'
import catchAsync from '../utils/catchAsync.js';

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const { user, token } = await authService.registerUser({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: { user },
    token,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser({
    email,
    password,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    data: { user },
    token,
  });
});
