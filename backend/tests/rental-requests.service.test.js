const test = require('node:test');
const assert = require('node:assert/strict');

const propertiesRepository = require('../repositories/properties.repository');
const rentalRequestRepository = require('../repositories/rental-requests.repository');
const notificationsRepository = require('../repositories/notifications.repository');
const rentalRequestsService = require('../services/rental-requests.service');

test('createRentalRequest sends a landlord notification after a successful reservation', async () => {
  const originalGetLocalById = propertiesRepository.getLocalById;
  const originalFindReservationOverlap = rentalRequestRepository.findReservationOverlap;
  const originalCreateReservation = rentalRequestRepository.createReservation;
  const originalCreateNotification = notificationsRepository.createNotification;

  try {
    propertiesRepository.getLocalById = async () => ({
      id: 12,
      user_id: 7,
      title: 'Cozy Studio',
      availability: 1,
    });

    rentalRequestRepository.findReservationOverlap = async () => null;
    rentalRequestRepository.createReservation = async ({ localId, userId, startDate, endDate }) => {
      assert.equal(localId, 12);
      assert.equal(userId, 22);
      assert.equal(startDate, '2026-01-01');
      assert.equal(endDate, '2026-01-05');
      return { id: 99 };
    };

    let notificationPayload = null;
    notificationsRepository.createNotification = async (payload) => {
      notificationPayload = payload;
      return { id: 1 };
    };

    const result = await rentalRequestsService.createRentalRequest({
      userId: 22,
      payload: {
        local_id: 12,
        start_date: '2026-01-01',
        end_date: '2026-01-05',
      },
    });

    assert.deepEqual(result, { message: 'Reservation created', id: 99 });
    assert.ok(notificationPayload);
    assert.equal(notificationPayload.userId, 7);
    assert.equal(notificationPayload.title, 'New reservation request');
    assert.match(notificationPayload.message, /Cozy Studio/);
  } finally {
    propertiesRepository.getLocalById = originalGetLocalById;
    rentalRequestRepository.findReservationOverlap = originalFindReservationOverlap;
    rentalRequestRepository.createReservation = originalCreateReservation;
    notificationsRepository.createNotification = originalCreateNotification;
  }
});
