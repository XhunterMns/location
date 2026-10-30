const express = require('express');
const propertyController = require('../controllers/property.controller');
const rentalController = require('../controllers/rental.controller');
const notificationController = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole, requireAnyRole } = require('../middleware/role.middleware');

const router = express.Router();

router.post('/locals', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.createLocal);
router.get('/locals/my', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.getMyLocals);
router.put('/locals/:id', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.updateLocal);
router.delete('/locals/:id', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.deleteLocal);
router.post('/locals/:id/images', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.uploadImages);
router.post(
  '/locals/:id/image-binary',
  verifyToken,
  requireAnyRole(['landlord', 'agency_owner', 'agency_agent']),
  express.raw({ type: 'application/octet-stream', limit: '10mb' }),
  propertyController.uploadBinaryImage
);
router.get('/locals/:id/images', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), propertyController.getOwnerImages);
router.get('/reservations', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), rentalController.listOwnerReservations);
router.get('/notifications', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), notificationController.listMyNotifications);

module.exports = router;
