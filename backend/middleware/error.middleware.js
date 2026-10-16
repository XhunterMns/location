function notFoundMiddleware(req, res) {
  return res.status(404).json({ message: 'Route not found' });
}

function errorMiddleware(err, req, res, next) {
  console.error(err);

  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Unexpected server error';

  return res.status(statusCode).json({ message });
}

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
