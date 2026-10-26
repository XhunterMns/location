const { listNotificationsForUser } = require('../services/notifications.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';

  return sendError(res, statusCode, message, error?.details || undefined);
}

async function listMyNotifications(req, res) {
  try {
    const payload = await listNotificationsForUser(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  listMyNotifications,
};
