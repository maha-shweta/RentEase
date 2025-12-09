import express from 'express';
import { createUtilityBill, getUtilityBillsByUnit, payUtilityBill, unpayUtilityBill, getAllUtilities } from '../controllers/UtilityController.js';

const router = express.Router();

// GET /api/utilities - Get all utilities
router.get('/', getAllUtilities);

// POST /api/utilities
router.post('/', createUtilityBill);

// GET /api/utilities/unit/:unitId
router.get('/unit/:unitId', getUtilityBillsByUnit);

// PUT /api/utilities/:id/pay
router.put('/:id/pay', payUtilityBill);

// PUT /api/utilities/:id/unpay
router.put('/:id/unpay', unpayUtilityBill);

export default router;