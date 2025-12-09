import express from 'express';
import { recordPayment, getAgreementPayments, getAllPayments, updatePaymentStatus } from '../controllers/PaymentController.js';

const router = express.Router();

// GET /api/payments - Get all payments
router.get('/', getAllPayments);

// POST /api/payments
router.post('/', recordPayment);

// GET /api/payments/agreement/:agreementId
router.get('/agreement/:agreementId', getAgreementPayments);

// PUT /api/payments/:id/status
router.put('/:id/status', updatePaymentStatus);

export default router;