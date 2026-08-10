const { errorResponse } = require('../utils/responseHandler');

const errorMiddleware = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err.message);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, status);
};

module.exports = errorMiddleware;
