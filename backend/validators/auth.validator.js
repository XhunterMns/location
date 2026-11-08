function validateRegistration(data = {}) {
  const { name, email, password, birthDate, role } = data;
  const normalizedRole = String(role || '').trim().toLowerCase();

  if (!name || !email || !password || !birthDate || !normalizedRole) {
    return { valid: false, message: 'Missing fields' };
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{8,}$/.test(password)) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
    };
  }

  const parsedBirthDate = new Date(`${birthDate}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) ||
    Number.isNaN(parsedBirthDate.getTime())
  ) {
    return { valid: false, message: 'Invalid date of birth' };
  }

  const normalizedBirthDate = parsedBirthDate.toISOString().slice(0, 10);
  if (
    normalizedBirthDate !== birthDate ||
    birthDate > new Date().toISOString().slice(0, 10)
  ) {
    return { valid: false, message: 'Invalid date of birth' };
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
