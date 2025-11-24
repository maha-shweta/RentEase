const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Sign up route
router.post('/signup', tenantController.signUp);

// Login route
router.post('/login', tenantController.login);

module.exports = router;
