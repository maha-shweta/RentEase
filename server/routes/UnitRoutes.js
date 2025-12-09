import express from 'express';
import { createUnit, getAllUnits, getPropertyUnits, updateUnit, deleteUnit, updateUnitStatus } from '../controllers/UnitController.js';

const router = express.Router();

// GET /api/units - Get all units
router.get('/', getAllUnits);

// POST /api/units
router.post('/', createUnit);

// GET /api/units/property/:propertyId
router.get('/property/:propertyId', getPropertyUnits);

// PUT /api/units/:id - Update unit
router.put('/:id', updateUnit);

// DELETE /api/units/:id - Delete unit
router.delete('/:id', deleteUnit);

// PUT /api/units/:id/status
router.put('/:id/status', updateUnitStatus);

export default router;