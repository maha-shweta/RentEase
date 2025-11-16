// routes/tenantRoutes.js
const express = require('express');
const { registerTenant, loginTenant } = require('../controllers/tenantController');
const router = express.Router();

// POST route for tenant signup
router.post('/signup', registerTenant);

// POST route for tenant login
router.post('/login', loginTenant);

module.exports = router;
