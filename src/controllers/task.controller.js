import * as taskService from '../services/task.service.js';
import catchAsync from '../utils/catchAsync.js';

export const createTask = catchAsync(async (req, res, next) => {
  const task = await taskService.createTask(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: { task },
  });
});

export const getTasks = catchAsync(async (req, res, next) => {
  const tasks = await taskService.getTasks(req.user);

  res.status(200).json({
    success: true,
    results: tasks.length,
    data: { tasks },
  });
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const task = await taskService.getTaskById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: { task },
  });
});

export const updateTask = catchAsync(async (req, res, next) => {
  const task = await taskService.updateTask(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: { task },
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const result = await taskService.deleteTask(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});
