function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

function sendSuccess(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function sendError(res, statusCode, message, details) {
  const response = { message };

  if (details && process.env.NODE_ENV !== 'production') {
    response.details = details;
  }

  return res.status(statusCode).json(response);
}

module.exports = {
  normalizeRole,
  sendSuccess,
  sendError,
};
