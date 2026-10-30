const express = require('express');
const propertyController = require('../controllers/property.controller');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

const router = express.Router();

router.get('/admin/locals', verifyToken, requireRole('admin'), propertyController.adminListLocals);
router.put('/admin/locals/:id/status', verifyToken, requireRole('admin'), propertyController.adminUpdateLocalStatus);
router.put('/admin/locals/:id', verifyToken, requireRole('admin'), propertyController.adminUpdateLocal);
router.delete('/admin/locals/:id', verifyToken, requireRole('admin'), propertyController.adminDeleteLocal);

router.get('/admin/agencies', verifyToken, requireRole('admin'), require('../controllers/agency.controller').listReviews);
router.put('/admin/agencies/:id/status', verifyToken, requireRole('admin'), require('../controllers/agency.controller').reviewAgency);
router.get('/admin/plans', verifyToken, requireRole('admin'), require('../controllers/agency.controller').listPlans);
router.post('/admin/plans', verifyToken, requireRole('admin'), require('../controllers/agency.controller').createAgencyPlan);
router.put('/admin/plans/:id', verifyToken, requireRole('admin'), require('../controllers/agency.controller').updateAgencyPlanById);
router.post('/admin/agencies/:id/activate-subscription', verifyToken, requireRole('admin'), require('../controllers/agency.controller').activateAgencySubscription);

router.get('/admin/users', verifyToken, requireRole('admin'), userController.getUsers);
router.put('/admin/users/:id', verifyToken, requireRole('admin'), userController.updateUserById);
router.delete('/admin/users/:id', verifyToken, requireRole('admin'), userController.deleteUserById);

module.exports = router;
