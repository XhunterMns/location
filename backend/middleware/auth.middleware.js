const jwt = require('jsonwebtoken');
const { APP_CONFIG } = require('../config/app.config');
const { sendError } = require('../utils/api-response');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendError(res, 401, 'No token');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return sendError(res, 401, 'Invalid auth format');
  }

  try {
    const decoded = jwt.verify(parts[1], APP_CONFIG.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(res, 403, 'Invalid token');
  }
}

module.exports = {
  verifyToken,
};
