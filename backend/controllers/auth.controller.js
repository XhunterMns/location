const { loginUser, registerUser, setupAdminUser } = require('../services/auth.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';

  return sendError(res, statusCode, message, error?.details || undefined);
}

async function register(req, res) {
  try {
    const payload = await registerUser(req.body || {});
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function login(req, res) {
  try {
    const payload = await loginUser(req.body || {});
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function setupAdmin(req, res) {
  try {
    const payload = await setupAdminUser();
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  register,
  login,
  setupAdmin,
};
