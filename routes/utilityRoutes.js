const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Create a new utility bill
router.post('/create', utilityController.createUtility);

// Get utilities by unit ID
router.get('/:unit_id', utilityController.getUtilities);

// Get a utility bill by ID
router.get('/utility/:id', utilityController.getUtility);

// Update utility bill status (mark as paid)
router.put('/:id', utilityController.updateUtility);

// Delete a utility bill
router.delete('/:id', utilityController.deleteUtility);

module.exports = router;
