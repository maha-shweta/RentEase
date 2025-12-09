import express from 'express';
import { registerTenant, loginTenant, getAllTenants, getTenantById, updateTenant, deleteTenant } from '../controllers/TenantController.js';

const router = express.Router();

// POST /api/tenants/register
router.post('/register', registerTenant);

// POST /api/tenants/login
router.post('/login', loginTenant);

// GET /api/tenants - Get all tenants
router.get('/', getAllTenants);

// GET /api/tenants/:id - Get single tenant
router.get('/:id', getTenantById);

// PUT /api/tenants/:id - Update tenant
router.put('/:id', updateTenant);

// DELETE /api/tenants/:id - Delete tenant
router.delete('/:id', deleteTenant);

export default router;