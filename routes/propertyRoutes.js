const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Create a new property
router.post('/create', propertyController.createProperty);

// Get properties by landlord
router.get('/:landlord_id', propertyController.getProperties);

// Get a single property by ID
router.get('/:id', propertyController.getProperty);

// Update property details
router.put('/:id', propertyController.updateProperty);

// Delete a property
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
