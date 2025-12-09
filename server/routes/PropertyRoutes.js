import express from 'express';
import { createProperty, getLandlordProperties, updateProperty, deleteProperty } from '../controllers/PropertyController.js';

const router = express.Router();

// POST /api/properties
router.post('/', createProperty);

// GET /api/properties/landlord/:landlordId
router.get('/landlord/:landlordId', getLandlordProperties);

// PUT /api/properties/:id
router.put('/:id', updateProperty);

// DELETE /api/properties/:id
router.delete('/:id', deleteProperty);

export default router;