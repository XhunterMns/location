const express = require('express');
const rateLimit = require('express-rate-limit');

// Only protect credential endpoints. Do NOT attach this to the whole `/api`
// router — Express still runs mounted middleware for every `/api/*` request
// even when the final handler lives on another router (renter/landlord/etc).
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.get('/setup-admin', authController.setupAdmin);
router.get('/profile', verifyToken, userController.getMyProfile);
router.put('/profile', verifyToken, userController.updateMyProfile);

module.exports = router;
