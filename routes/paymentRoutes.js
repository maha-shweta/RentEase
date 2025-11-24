const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/create', paymentController.createPayment);

// Get payments by rental agreement ID
router.get('/:rental_agreement_id', paymentController.getPayments);

// Get a payment by ID
router.get('/:id', paymentController.getPayment);

// Update payment details
router.put('/:id', paymentController.updatePayment);

// Delete a payment
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
