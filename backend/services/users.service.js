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
  };
}

async function updateUser({ userId, payload }) {
  const { name, email, role, password } = payload || {};
  const safePayload = {
    ...(name !== undefined ? { name } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(role !== undefined ? { role } : {}),
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
