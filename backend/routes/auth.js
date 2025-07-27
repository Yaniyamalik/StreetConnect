// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Assuming an authController exists or will be created

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// You might have other auth-related routes like /profile, /logout, /forgot-password etc.
// router.get('/profile', protect, authController.getUserProfile);

module.exports = router;