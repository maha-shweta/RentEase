const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordController');

// Sign up route
router.post('/signup', landlordController.signUp);

// Login route
router.post('/login', landlordController.login);

// Update landlord details route
router.put('/update/:id', landlordController.updateLandlord);

module.exports = router;
