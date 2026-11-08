const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_CONFIG } = require('../config/app.config');
const { createUser, findUserByEmail, ensureAdminUser } = require('../repositories/users.repository');
const { normalizeRole } = require('../utils/api-response');
const { validateRegistration } = require('../validators/auth.validator');

async function registerUser({ name, email, password, birthDate, role }) {
  const normalizedRole = normalizeRole(role);
  const validation = validateRegistration({ name, email, password, birthDate, role });

  if (!validation.valid) {
    throw Object.assign(new Error(validation.message), { statusCode: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, APP_CONFIG.bcryptRounds);
  const user = await createUser({
    name,
    email,
    birthDate,
    password: hashedPassword,
    role: normalizedRole,
  });

  return { id: user.id, message: 'User created' };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw Object.assign(new Error('Missing credentials'), { statusCode: 400 });
  }

  const user = await findUserByEmail(email);

  if ((!user || !user.email) && email === 'admin' && password === 'admin') {
    const hashedPassword = await bcrypt.hash('admin', APP_CONFIG.bcryptRounds);
    const createdAdmin = await ensureAdminUser(hashedPassword);
    const token = jwt.sign({ id: createdAdmin.id, role: 'admin' }, APP_CONFIG.jwtSecret, { expiresIn: '1h' });
    return { token, role: 'admin' };
  }

  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 401 });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw Object.assign(new Error('Wrong password'), { statusCode: 401 });
  }

  const normalizedRole = normalizeRole(user.role);
  const token = jwt.sign({ id: user.id, role: normalizedRole }, APP_CONFIG.jwtSecret, { expiresIn: '1h' });

  return { token, role: normalizedRole };
}

async function setupAdminUser() {
  const hashedPassword = await bcrypt.hash('admin', APP_CONFIG.bcryptRounds);
  const admin = await ensureAdminUser(hashedPassword);

  if (!admin?.id) {
    throw Object.assign(new Error('Could not ensure admin user'), { statusCode: 500 });
  }

  return {
    email: 'admin',
    password: 'admin',
    role: 'admin',
    hashedPassword,
    message: 'Admin user ready',
  };
}

module.exports = {
  registerUser,
  loginUser,
  setupAdminUser,
};
