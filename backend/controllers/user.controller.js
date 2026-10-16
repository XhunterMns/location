const { listUsers, getProfileById, updateUser, deleteUser } = require('../services/users.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';

  return sendError(res, statusCode, message, error?.details || undefined);
}

async function getUsers(req, res) {
  try {
    const payload = await listUsers();
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getMyProfile(req, res) {
  try {
    const payload = await getProfileById(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function updateMyProfile(req, res) {
  try {
    const payload = await updateUser({ userId: req.user.id, payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function updateUserById(req, res) {
  try {
    const payload = await updateUser({ userId: req.params.id, payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function deleteUserById(req, res) {
  try {
    const payload = await deleteUser({ userId: req.params.id });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  getUsers,
  getMyProfile,
  updateMyProfile,
  updateUserById,
  deleteUserById,
};
