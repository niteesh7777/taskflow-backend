// src/utils/catchAsync.js
const asyncHandelr = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandelr;
