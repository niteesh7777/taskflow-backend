import Task from '../models/task.model.js';
import AppError from '../utils/AppError.js';

export const createTask = async (data, userId) => {
  const task = await Task.create({ ...data, createdBy: userId });
  return task;
};


export const getTasks = async (user) => {
  const filter = user.role === 'admin' ? {} : { createdBy: user._id };
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return tasks;
};


export const getTaskById = async (id, user) => {
  const task = await Task.findById(id);

  if (!task) throw new AppError('Task not found', 404);

  if (task.createdBy.toString() !== user.id && user.role !== 'admin') {
    throw new AppError('You are not allowed to view this task', 403);
  }

  return task;
};


export const updateTask = async (id, data, user) => {
  const task = await Task.findById(id);
  if (!task) throw new AppError('Task not found', 404);

  if (task.createdBy.toString() !== user.id && user.role !== 'admin') {
    throw new AppError('You are not allowed to update this task', 403);
  }

  Object.assign(task, data);
  const updated = await task.save();
  return updated;
};


export const deleteTask = async (id, user) => {
  const task = await Task.findById(id);
  if (!task) throw new AppError('Task not found', 404);

  if (task.createdBy.toString() !== user.id && user.role !== 'admin') {
    throw new AppError('You are not allowed to delete this task', 403);
  }

  task.deleted = true;
  task.deletedAt = new Date();
  await task.save();

  return { message: 'Task deleted successfully' };
};
