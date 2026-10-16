const express = require('express');
const rentalController = require('../controllers/rental.controller');
const propertyController = require('../controllers/property.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

const router = express.Router();

router.get('/locals/available', verifyToken, requireRole('renter'), propertyController.getAvailableLocals);
router.get('/locals/:id/public-images', verifyToken, requireRole('renter'), propertyController.getPublicImages);
router.get('/reservations/my', verifyToken, requireRole('renter'), rentalController.listMyReservations);
router.post('/reservations', verifyToken, requireRole('renter'), rentalController.createReservation);
router.delete('/reservations/:id', verifyToken, requireRole('renter'), rentalController.deleteReservation);
router.post('/evaluations', verifyToken, requireRole('renter'), rentalController.createEvaluation);

module.exports = router;
