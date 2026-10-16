const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/setup-admin', authController.setupAdmin);
router.get('/profile', verifyToken, userController.getMyProfile);
router.put('/profile', verifyToken, userController.updateMyProfile);

module.exports = router;
