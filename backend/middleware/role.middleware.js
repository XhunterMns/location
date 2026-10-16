const { sendError, normalizeRole } = require('../utils/api-response');

function requireRole(expectedRole) {
  return (req, res, next) => {
    const role = normalizeRole(req.user?.role);

    if (role !== expectedRole) {
      return sendError(res, 403, 'Access denied');
    }

    return next();
  };
}

function requireAnyRole(roles) {
  return (req, res, next) => {
    const role = normalizeRole(req.user?.role);

    if (!roles.includes(role)) {
      return sendError(res, 403, 'Access denied');
    }

    return next();
  };
}

module.exports = {
  requireRole,
  requireAnyRole,
};
