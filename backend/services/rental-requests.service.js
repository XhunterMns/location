const {
  getReservationsByUserId,
  findReservationOverlap,
  createReservation,
  deleteReservationById,
  saveEvaluation,
  findLocalReservationForUser,
  getReservationById,
} = require('../repositories/rental-requests.repository');
const { getLocalById } = require('../repositories/properties.repository');

async function getMyReservations(userId) {
  return getReservationsByUserId(userId);
}

async function createRentalRequest({ userId, payload }) {
  const { local_id, start_date, end_date } = payload;

  const local = await getLocalById(local_id);
  if (!local) {
    throw Object.assign(new Error('Local not available'), { statusCode: 404 });
  }

  if (local.availability !== 1) {
    throw Object.assign(new Error('Local not available'), { statusCode: 404 });
  }

  const overlap = await findReservationOverlap(local_id, start_date, end_date);
  if (overlap) {
    throw Object.assign(new Error('Local already reserved for these dates'), { statusCode: 409 });
  }

  const reservation = await createReservation({
    localId: local_id,
    userId,
    startDate: start_date,
    endDate: end_date,
  });

  return { message: 'Reservation created', id: reservation.id };
}

async function deleteRentalRequest({ userId, reservationId }) {
  const reservation = await getReservationById(reservationId);
  if (!reservation) {
    throw Object.assign(new Error('Reservation not found'), { statusCode: 404 });
  }

  if (Number(reservation.user_id) !== Number(userId)) {
    throw Object.assign(new Error('Access denied'), { statusCode: 403 });
  }

  const result = await deleteReservationById(reservationId);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Reservation not found'), { statusCode: 404 });
  }

  return { message: 'Reservation deleted' };
}

async function addEvaluation({ userId, payload }) {
  const { local_id, rating, comment } = payload;
  const reservation = await findLocalReservationForUser(local_id, userId);

  if (!reservation) {
    throw Object.assign(new Error('Reserve this local before evaluating it'), { statusCode: 403 });
  }

  const result = await saveEvaluation({
    localId: local_id,
    userId,
    rating: Number(rating),
    comment: comment || null,
  });

  return { message: 'Evaluation saved', id: result.insertId };
}

module.exports = {
  getMyReservations,
  createRentalRequest,
  deleteRentalRequest,
  addEvaluation,
};
