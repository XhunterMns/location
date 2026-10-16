const { pool } = require('../db_config/database');

async function createLocal({ title, address, city, delegation, phone_number, description, price, availability, is_colocation = 0, room_type, available_places, gender_preference, colocation_rules, userId, status = 'published' }) {
  const [result] = await pool.query(
    'INSERT INTO locals (title, address, city, delegation, phone_number, description, price, availability, is_colocation, room_type, available_places, gender_preference, colocation_rules, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      title,
      address,
      city || null,
      delegation || null,
      phone_number || null,
      description,
      price,
      availability ? 1 : 1,
      is_colocation ? 1 : 0,
      room_type || null,
      available_places ?? null,
      gender_preference || null,
      colocation_rules || null,
      userId,
      status,
    ]
  );

  return { id: result.insertId };
}

async function getLocalsByUserId(userId) {
  const [rows] = await pool.query(
    `
      SELECT 
        l.*,
        EXISTS(SELECT 1 FROM reservations r WHERE r.local_id = l.id AND r.status = 'reserved') as is_reserved,
        (
          SELECT li.image_url
          FROM local_images li
          WHERE li.local_id = l.id
          ORDER BY li.id DESC
          LIMIT 1
        ) AS cover_image,
        (
          SELECT AVG(e.rating)
          FROM evaluations e
          WHERE e.local_id = l.id
        ) AS evaluation,
        (
          SELECT COUNT(*)
          FROM evaluations e
          WHERE e.local_id = l.id
        ) AS total_reviews
      FROM locals l
      WHERE l.user_id = ?
      ORDER BY l.id DESC
    `,
    [userId]
  );

  return rows;
}

async function getLocalById(id) {
  const [rows] = await pool.query('SELECT * FROM locals WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function getOwnedLocalById(id, userId) {
  const [rows] = await pool.query('SELECT * FROM locals WHERE id = ? AND user_id = ? LIMIT 1', [id, userId]);
  return rows[0] || null;
}

async function updateLocalByOwner(id, userId, payload) {
  const {
    title,
    address,
    description,
    price,
    availability,
    is_colocation,
    room_type,
    available_places,
    gender_preference,
    colocation_rules,
  } = payload;

  const [result] = await pool.query(
    'UPDATE locals SET title = ?, address = ?, description = ?, price = ?, availability = ?, is_colocation = ?, room_type = ?, available_places = ?, gender_preference = ?, colocation_rules = ? WHERE id = ? AND user_id = ?',
    [
      title,
      address,
      description,
      price,
      availability ? 1 : 0,
      is_colocation ? 1 : 0,
      room_type || null,
      available_places ?? null,
      gender_preference || null,
      colocation_rules || null,
      id,
      userId,
    ]
  );

  return { affectedRows: result.affectedRows };
}

async function deleteLocalByOwner(id, userId) {
  const [result] = await pool.query('DELETE FROM locals WHERE id = ? AND user_id = ?', [id, userId]);
  return { affectedRows: result.affectedRows };
}

async function getAvailableLocalsForRenter(userId) {
  const [rows] = await pool.query(
    `
      SELECT
        l.*,
        COALESCE(NULLIF(u.email, ''), CONCAT('Owner #', l.user_id)) AS landlord_name,
        (
          SELECT li.image_url
          FROM local_images li
          WHERE li.local_id = l.id
          ORDER BY li.id DESC
          LIMIT 1
        ) AS cover_image,
        (
          SELECT AVG(e.rating)
          FROM evaluations e
          WHERE e.local_id = l.id
        ) AS evaluation,
        (
          SELECT COUNT(*)
          FROM evaluations e
          WHERE e.local_id = l.id
        ) AS total_reviews
      FROM locals l
      LEFT JOIN users u ON u.id = l.user_id
      WHERE l.availability = 1 AND l.user_id != ?
      ORDER BY l.id DESC
    `,
    [userId]
  );

  return rows;
}

async function getLocalImagesByLocalId(localId) {
  const [rows] = await pool.query(
    'SELECT id, image_url FROM local_images WHERE local_id = ? ORDER BY id DESC',
    [localId]
  );

  return rows;
}

async function getPublicLocalImages(localId) {
  const [rows] = await pool.query(
    `
      SELECT li.id, li.image_url
      FROM local_images li
      INNER JOIN locals l ON l.id = li.local_id
      WHERE li.local_id = ? AND l.availability = 1
      ORDER BY li.id DESC
    `,
    [localId]
  );

  return rows;
}

async function insertLocalImages(localId, images) {
  if (!images.length) return { affectedRows: 0 };

  const values = images
    .filter((image) => typeof image === 'string' && image.trim().length > 0)
    .map((image) => [localId, image]);

  if (!values.length) return { affectedRows: 0 };

  const [result] = await pool.query('INSERT INTO local_images (local_id, image_url) VALUES ?', [values]);
  return { affectedRows: result.affectedRows };
}

async function deleteLocalImages(localId) {
  await pool.query('DELETE FROM local_images WHERE local_id = ?', [localId]);
}

async function deleteLocalEvaluations(localId) {
  await pool.query('DELETE FROM evaluations WHERE local_id = ?', [localId]);
}

async function deleteLocalReservations(localId) {
  await pool.query('DELETE FROM reservations WHERE local_id = ?', [localId]);
}

async function getAdminLocals() {
  const [rows] = await pool.query(
    `
      SELECT l.*, u.email as landlord_email,
             EXISTS(SELECT 1 FROM reservations r WHERE r.local_id = l.id AND r.status = 'reserved') as is_reserved,
             (SELECT li.image_url
              FROM local_images li
              WHERE li.local_id = l.id
              ORDER BY li.id DESC
              LIMIT 1) AS cover_image
      FROM locals l
      LEFT JOIN users u ON u.id = l.user_id
      ORDER BY l.id DESC
    `
  );

  return rows;
}

async function updateLocalStatusByAdmin(id, status) {
  const [result] = await pool.query('UPDATE locals SET status = ? WHERE id = ?', [status, id]);
  return { affectedRows: result.affectedRows };
}

async function updateLocalByAdmin(id, payload) {
  const { title, address, description, price, availability, status, is_colocation, room_type, available_places, gender_preference, colocation_rules } = payload;
  const [result] = await pool.query(
    'UPDATE locals SET title=?, address=?, description=?, price=?, availability=?, is_colocation=?, room_type=?, available_places=?, gender_preference=?, colocation_rules=?, status=? WHERE id=?',
    [
      title,
      address,
      description,
      price,
      availability ? 1 : 0,
      is_colocation ? 1 : 0,
      room_type || null,
      available_places ?? null,
      gender_preference || null,
      colocation_rules || null,
      status,
      id,
    ]
  );

  return { affectedRows: result.affectedRows };
}

async function deleteLocalByAdmin(id) {
  await deleteLocalEvaluations(id);
  await deleteLocalReservations(id);
  await deleteLocalImages(id);

  const [result] = await pool.query('DELETE FROM locals WHERE id = ?', [id]);
  return { affectedRows: result.affectedRows };
}

module.exports = {
  createLocal,
  getLocalsByUserId,
  getLocalById,
  getOwnedLocalById,
  updateLocalByOwner,
  deleteLocalByOwner,
  getAvailableLocalsForRenter,
  getLocalImagesByLocalId,
  getPublicLocalImages,
  insertLocalImages,
  deleteLocalImages,
  deleteLocalEvaluations,
  deleteLocalReservations,
  getAdminLocals,
  updateLocalStatusByAdmin,
  updateLocalByAdmin,
  deleteLocalByAdmin,
};
