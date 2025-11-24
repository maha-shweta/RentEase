const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');

// Create a new unit
router.post('/create', unitController.createUnit);

// Get units by property ID
router.get('/:property_id', unitController.getUnits);

// Get a single unit by ID
router.get('/unit/:id', unitController.getUnit);

// Update unit details
router.put('/:id', unitController.updateUnit);

// Delete a unit
router.delete('/:id', unitController.deleteUnit);

module.exports = router;
