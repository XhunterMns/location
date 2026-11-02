const { pool } = require('../db_config/database');

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createUser({ name, email, password, role, agency_id, agency_role }) {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, agency_id, agency_role) VALUES (?, ?, ?, ?, ?, ?)',
      [name || null, email, password, role, agency_id ?? null, agency_role ?? null]
    );
    return { id: result.insertId };
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      throw Object.assign(new Error('Email already registered'), { statusCode: 409 });
    }
    throw error;
  }
}

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, name, email, role FROM users ORDER BY id DESC');
  return rows;
}

async function updateUserById(id, payload) {
  const fields = [];
  const values = [];

  if (payload?.name !== undefined) {
    fields.push('name = ?');
    values.push(payload.name ?? null);
  }

  if (payload?.email !== undefined) {
    fields.push('email = ?');
    values.push(payload.email ?? null);
  }

  if (payload?.role !== undefined) {
    fields.push('role = ?');
    values.push(payload.role ?? null);
  }

  if (payload?.agency_id !== undefined) {
    fields.push('agency_id = ?');
    values.push(payload.agency_id ?? null);
  }

  if (payload?.agency_role !== undefined) {
    fields.push('agency_role = ?');
    values.push(payload.agency_role ?? null);
  }

  if (payload?.password !== undefined) {
    fields.push('password = ?');
    values.push(payload.password ?? null);
  }

  if (!fields.length) {
    return { affectedRows: 0 };
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return { affectedRows: result.affectedRows };
}

async function deleteUserById(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return { affectedRows: result.affectedRows };
}

async function ensureAdminUser(passwordHash) {
  const existing = await findUserByEmail('admin');
  if (existing) {
    return existing;
  }

  const userPassword = passwordHash || 'admin';
  const { id } = await createUser({
    name: 'admin',
    email: 'admin',
    password: userPassword,
    role: 'admin',
  });

  return { id, email: 'admin', role: 'admin' };
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  ensureAdminUser,
};
