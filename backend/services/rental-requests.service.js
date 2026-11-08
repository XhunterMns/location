const rentalRequestsRepository = require('../repositories/rental-requests.repository');
const propertiesRepository = require('../repositories/properties.repository');
const notificationsRepository = require('../repositories/notifications.repository');

async function getMyReservations(userId) {
  return rentalRequestsRepository.getReservationsByUserId(userId);
}

async function getLandlordReservations(landlordId) {
  return rentalRequestsRepository.getReservationsByLandlordId(landlordId);
}

async function rejectReservation({ landlordId, reservationId }) {
  const result = await rentalRequestsRepository.rejectReservationByLandlordId(reservationId, landlordId);

  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Reservation not found or already handled'), { statusCode: 404 });
  }

  return { message: 'Reservation refused' };
}

async function createRentalRequest({ userId, payload }) {
  const { local_id, start_date, end_date } = payload;
  const start = parseDateOnly(start_date);
  const end = parseDateOnly(end_date);

  if (!start || !end || end <= start) {
    throw Object.assign(new Error('End date must be after the start date'), { statusCode: 400 });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (start < today) {
    throw Object.assign(new Error('Reservation cannot start in the past'), { statusCode: 400 });
  }

  const local = await propertiesRepository.getLocalById(local_id);
  if (!local) {
    throw Object.assign(new Error('Local not available'), { statusCode: 404 });
  }

  function parseDateOnly(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const parsed = new Date(`${value}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value
      ? null
      : parsed;
  }

  if (local.availability !== 1) {
    throw Object.assign(new Error('Local not available'), { statusCode: 404 });
  }

  const overlap = await rentalRequestsRepository.findReservationOverlap(local_id, start_date, end_date);
  if (overlap) {
    throw Object.assign(new Error('Local already reserved for these dates'), { statusCode: 409 });
  }

  const reservation = await rentalRequestsRepository.createReservation({
    localId: local_id,
    userId,
    startDate: start_date,
    endDate: end_date,
  });

  await notificationsRepository.createNotification({
    userId: local.user_id,
    title: 'New reservation request',
    message: `A renter requested your property "${local.title}" from ${start_date} to ${end_date}.`,
    type: 'reservation',
    referenceId: reservation.id,
    referenceType: 'reservation',
  });

  return { message: 'Reservation created', id: reservation.id };
}

async function deleteRentalRequest({ userId, reservationId }) {
  const reservation = await rentalRequestsRepository.getReservationById(reservationId);
  if (!reservation) {
    throw Object.assign(new Error('Reservation not found'), { statusCode: 404 });
  }

  if (Number(reservation.user_id) !== Number(userId)) {
    throw Object.assign(new Error('Access denied'), { statusCode: 403 });
  }

  const result = await rentalRequestsRepository.cancelReservationByUserId(reservationId, userId);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Reservation not found'), { statusCode: 404 });
  }

  return { message: 'Reservation cancelled' };
}

async function addEvaluation({ userId, payload }) {
  const { local_id, rating, comment } = payload;
  const reservation = await rentalRequestsRepository.findLocalReservationForUser(local_id, userId);

  if (!reservation) {
    throw Object.assign(new Error('You can review a property only after reserving it'), { statusCode: 403 });
  }

  const result = await rentalRequestsRepository.saveEvaluation({
    localId: local_id,
    userId,
    rating: Number(rating),
    comment: comment || null,
  });

  return { message: 'Evaluation saved', id: result.insertId };
}

module.exports = {
  getMyReservations,
  getLandlordReservations,
  rejectReservation,
  createRentalRequest,
  deleteRentalRequest,
  addEvaluation,
};
