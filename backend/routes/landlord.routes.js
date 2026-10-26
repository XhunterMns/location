const express = require('express');
const propertyController = require('../controllers/property.controller');
const notificationController = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

const router = express.Router();

router.post('/locals', verifyToken, requireRole('landlord'), propertyController.createLocal);
router.get('/locals/my', verifyToken, requireRole('landlord'), propertyController.getMyLocals);
router.put('/locals/:id', verifyToken, requireRole('landlord'), propertyController.updateLocal);
router.delete('/locals/:id', verifyToken, requireRole('landlord'), propertyController.deleteLocal);
router.post('/locals/:id/images', verifyToken, requireRole('landlord'), propertyController.uploadImages);
router.post(
  '/locals/:id/image-binary',
  verifyToken,
  requireRole('landlord'),
  express.raw({ type: 'application/octet-stream', limit: '10mb' }),
  propertyController.uploadBinaryImage
);
router.get('/locals/:id/images', verifyToken, requireRole('landlord'), propertyController.getOwnerImages);
router.get('/notifications', verifyToken, requireRole('landlord'), notificationController.listMyNotifications);

module.exports = router;
