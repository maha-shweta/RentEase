const express = require('express');
const router = express.Router();
const rentalAgreementController = require('../controllers/rentalAgreementController');

// Create a new rental agreement
router.post('/create', rentalAgreementController.createRentalAgreement);

// Get rental agreements by tenant ID
router.get('/:tenant_id', rentalAgreementController.getRentalAgreementsByTenant);

// Get rental agreements by unit ID
router.get('/unit/:unit_id', rentalAgreementController.getRentalAgreementsByUnit);

// Get a rental agreement by ID
router.get('/:id', rentalAgreementController.getRentalAgreementById);

// Update rental agreement details
router.put('/:id', rentalAgreementController.updateRentalAgreement);

// Delete a rental agreement
router.delete('/:id', rentalAgreementController.deleteRentalAgreement);

module.exports = router;
