// routes/userRoutes.js
const express = require('express');
const landlordRoutes = require('./landlordRoutes');  // Import landlord routes
const propertyRoutes = require('./propertyRoutes');  // Import property routes
const tenantRoutes = require('./tenantRoutes');  // Import tenant routes
const router = express.Router();

// Landlord routes (signup/login, etc.)
router.use('/landlord', landlordRoutes);  // All landlord-related routes are prefixed with /landlord

// Property routes (creating, updating, etc.)
router.use('/landlord/properties', propertyRoutes);  // Property routes for landlords

// Tenant routes (signup/login, etc.)
router.use('/tenant', tenantRoutes);  // All tenant-related routes are prefixed with /tenant

module.exports = router;
