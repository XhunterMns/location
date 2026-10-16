const {
  getMyReservations,
  createRentalRequest,
  deleteRentalRequest,
  addEvaluation,
} = require('../services/rental-requests.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';

  return sendError(res, statusCode, message, error?.details || undefined);
}

async function listMyReservations(req, res) {
  try {
    const payload = await getMyReservations(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function createReservation(req, res) {
  try {
    const payload = await createRentalRequest({ userId: req.user.id, payload: req.body || {} });
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function deleteReservation(req, res) {
  try {
    const payload = await deleteRentalRequest({ userId: req.user.id, reservationId: req.params.id });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function createEvaluation(req, res) {
  try {
    const payload = await addEvaluation({ userId: req.user.id, payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  listMyReservations,
  createReservation,
  deleteReservation,
  createEvaluation,
};
