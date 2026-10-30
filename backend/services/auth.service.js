const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_CONFIG } = require('../config/app.config');
const usersRepo = require('../repositories/users.repository');
const { normalizeRole } = require('../utils/api-response');

async function registerUser({ name, email, password, role }) {
  const normalizedRole = normalizeRole(role);

  if (!email || !password || !normalizedRole) {
    throw Object.assign(new Error('Missing fields'), { statusCode: 400 });
  }

  if (!['landlord', 'renter', 'agency_owner', 'agency_agent'].includes(normalizedRole)) {
    throw Object.assign(new Error('Invalid role'), { statusCode: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, APP_CONFIG.bcryptRounds);
  try {
    const user = await usersRepo.createUser({ name, email, password: hashedPassword, role: normalizedRole });
    return { id: user.id, message: 'User created' };
  } catch (err) {
    // Propagate repository errors (e.g., duplicate email)
      if (err && err.code === 'ER_DUP_ENTRY') { throw Object.assign(new Error('Email already registered'), { statusCode: 409 }); } throw err;
  }
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw Object.assign(new Error('Missing credentials'), { statusCode: 400 });
  }

  const user = await usersRepo.findUserByEmail(email);

  // Insecure admin auto‑creation removed – login now only authenticates existing users.


  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 401 });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw Object.assign(new Error('Wrong password'), { statusCode: 401 });
  }

  const normalizedRole = normalizeRole(user.role);
  const token = jwt.sign({
    id: user.id,
    role: normalizedRole,
    agency_id: user.agency_id || null,
    agency_role: user.agency_role || null,
  }, APP_CONFIG.jwtSecret, { expiresIn: '1h' });

  return { token, role: normalizedRole, agency_id: user.agency_id || null, agency_role: user.agency_role || null };
}

async function setupAdminUser() {
  const hashedPassword = await bcrypt.hash('admin', APP_CONFIG.bcryptRounds);
  const admin = await usersRepo.ensureAdminUser(hashedPassword);

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
