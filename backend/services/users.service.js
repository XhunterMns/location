const bcrypt = require('bcrypt');
const { APP_CONFIG } = require('../config/app.config');
const {
  getAllUsers,
  updateUserById,
  deleteUserById,
  findUserById,
} = require('../repositories/users.repository');

async function listUsers() {
  return getAllUsers();
}

async function getProfileById(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    agency_id: user.agency_id ?? null,
    agency_role: user.agency_role ?? null,
  };
}

async function updateUser({ userId, payload }) {
  const { name, email, role, agency_id, agency_role, password, old_password } = payload || {};

  if (password) {
    const currentUser = await findUserById(userId);
    if (!currentUser) {
      throw Object.assign(new Error('User not found'), { statusCode: 404 });
    }

    const passwordMatches = await bcrypt.compare(old_password || '', currentUser.password);
    if (!passwordMatches) {
      throw Object.assign(new Error('Current password is incorrect'), { statusCode: 401 });
    }
  }

  const safePayload = {
    ...(name !== undefined ? { name } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(role !== undefined ? { role } : {}),
    ...(agency_id !== undefined ? { agency_id } : {}),
    ...(agency_role !== undefined ? { agency_role } : {}),
    ...(password ? { password: await bcrypt.hash(password, APP_CONFIG.bcryptRounds) } : {}),
  };

  const result = await updateUserById(userId, safePayload);

  if (result.affectedRows === 0) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  return { message: 'User updated' };
}

async function deleteUser({ userId }) {
  const result = await deleteUserById(userId);

  if (result.affectedRows === 0) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  return { message: 'User deleted' };
}

module.exports = {
  listUsers,
  getProfileById,
  updateUser,
  deleteUser,
};
