import AppError from '../utils/AppError.js';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.safeParse(req.body);

      if (!parsed.success) {
        const errors = parsed.error.errors.map((err) => err.message);
        return next(new AppError(`Validation error: ${errors.join(', ')}`, 400));
      }

      // ✅ Replace req.body with parsed, sanitized data
      req.body = parsed.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};
