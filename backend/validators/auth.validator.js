function validateRegistration(data = {}) {
  const { name, email, password, role } = data;
  const normalizedRole = String(role || '').trim().toLowerCase();

  if (!email || !password || !normalizedRole) {
    return { valid: false, message: 'Missing fields' };
  }

  if (!['landlord', 'renter'].includes(normalizedRole)) {
    return { valid: false, message: 'Invalid role' };
  }

  return { valid: true };
}

function validateLogin(data = {}) {
  const { email, password } = data;

  if (!email || !password) {
    return { valid: false, message: 'Missing credentials' };
  }

  return { valid: true };
}

module.exports = {
  validateRegistration,
  validateLogin,
};
