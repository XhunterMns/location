const { getNotificationsByUserId } = require('../repositories/notifications.repository');

async function listNotificationsForUser(userId) {
  return getNotificationsByUserId(userId);
}

module.exports = {
  listNotificationsForUser,
};
