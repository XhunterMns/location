const { pool } = require('../db_config/database');

async function createNotification({ userId, title, message, type = 'reservation', referenceId = null, referenceType = null }) {
  const [result] = await pool.query(
    `
      INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type, is_read)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `,
    [userId, title, message, type, referenceId, referenceType]
  );

  return { id: result.insertId };
}

async function getNotificationsByUserId(userId) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC, id DESC
    `,
    [userId]
  );

  return rows;
}

module.exports = {
  createNotification,
  getNotificationsByUserId,
};
