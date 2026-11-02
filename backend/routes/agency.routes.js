const express = require('express');
const agencyController = require('../controllers/agency.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole, requireAnyRole } = require('../middleware/role.middleware');

const router = express.Router();

router.post('/agency/register', verifyToken, requireAnyRole(['landlord', 'agency_owner']), agencyController.register);
router.get('/agency/me', verifyToken, requireAnyRole(['landlord', 'agency_owner', 'agency_agent']), agencyController.getAgency);
router.get('/agency/dashboard', verifyToken, requireAnyRole(['agency_owner', 'agency_agent']), agencyController.getDashboard);
router.get('/agency/plans', verifyToken, agencyController.listPlans);
router.get('/agency/public/:slug', agencyController.getPublicAgencyProfile);
router.post('/agency/:id/inquiry', agencyController.submitInquiry);

module.exports = router;
