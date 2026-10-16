const { pool } = require('../db_config/database');

async function getReservationsByUserId(userId) {
  const [rows] = await pool.query(
    `
      SELECT
        r.*,
        r.startDate AS start_date,
        r.endDate AS end_date,
        l.title,
        l.address,
        l.price,
        (
          SELECT li.image_url
          FROM local_images li
          WHERE li.local_id = l.id
          ORDER BY li.id DESC
          LIMIT 1
        ) AS cover_image
      FROM reservations r
      INNER JOIN locals l ON l.id = r.local_id
      WHERE r.user_id = ?
      ORDER BY r.id DESC
    `,
    [userId]
  );

  return rows;
}

async function getReservationById(id) {
  const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function getReservationByLocalAndUser(localId, userId) {
  const [rows] = await pool.query(
    'SELECT id FROM reservations WHERE local_id = ? AND user_id = ? LIMIT 1',
    [localId, userId]
  );

  return rows[0] || null;
}

async function findReservationOverlap(localId, startDate, endDate) {
  const [rows] = await pool.query(
    `
      SELECT id
      FROM reservations
      WHERE local_id = ?
        AND status = 'reserved'
        AND startDate <= ?
        AND endDate >= ?
      LIMIT 1
    `,
    [localId, endDate, startDate]
  );

  return rows[0] || null;
}

async function createReservation({ localId, userId, startDate, endDate }) {
  const [result] = await pool.query(
    `
      INSERT INTO reservations (startDate, endDate, status, user_id, local_id)
      VALUES (?, ?, 'reserved', ?, ?)
    `,
    [startDate, endDate, userId, localId]
  );

  return { id: result.insertId };
}

async function deleteReservationById(id) {
  const [result] = await pool.query('DELETE FROM reservations WHERE id = ?', [id]);
  return { affectedRows: result.affectedRows };
}

async function saveEvaluation({ localId, userId, rating, comment }) {
  const [result] = await pool.query(
    `
      INSERT INTO evaluations (local_id, renter_id, rating, comment)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        comment = VALUES(comment)
    `,
    [localId, userId, rating, comment]
  );

  return { insertId: result.insertId };
}

async function findLocalReservationForUser(localId, userId) {
  const [rows] = await pool.query(
    'SELECT id FROM reservations WHERE local_id = ? AND user_id = ? LIMIT 1',
    [localId, userId]
  );

  return rows[0] || null;
}

module.exports = {
  getReservationsByUserId,
  getReservationById,
  getReservationByLocalAndUser,
  findReservationOverlap,
  createReservation,
  deleteReservationById,
  saveEvaluation,
  findLocalReservationForUser,
};
