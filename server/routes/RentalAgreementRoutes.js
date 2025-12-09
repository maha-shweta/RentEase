import express from 'express';
import {
    createAgreement,
    getAgreement,
    getAllAgreements,
    getTenantActiveAgreements,
    updateAgreementStatus,
    deleteAgreement
} from '../controllers/RentalAgreementController.js';

const router = express.Router();

// GET /api/rental-agreements - Get all agreements
router.get('/', getAllAgreements);

// POST /api/rental-agreements - Create a new rental agreement
router.post('/', createAgreement);

// GET /api/rental-agreements/tenant/:tenantId - Get all active agreements for a tenant
router.get('/tenant/:tenantId', getTenantActiveAgreements);

// GET /api/rental-agreements/:id - Get a specific agreement by ID
router.get('/:id', getAgreement);

// PUT /api/rental-agreements/status/:id - Update the status of an agreement
router.put('/status/:id', updateAgreementStatus);

// DELETE /api/rental-agreements/:id - Delete an agreement
router.delete('/:id', deleteAgreement);

export default router;