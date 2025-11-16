const express = require('express');
const { registerLandlord, loginLandlord } = require('../controllers/landlordController');  // Import controller functions
const router = express.Router();

// Landlord Routes
router.post('/signup', registerLandlord);  // Landlord signup route
router.post('/login', loginLandlord);  // Landlord login route

module.exports = router;
