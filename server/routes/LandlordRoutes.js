import express from 'express';
import {
    registerLandlord,
    loginLandlord,
    getLandlordProfile,
    updateLandlordProfile
} from '../controllers/LandlordController1.js';

const router = express.Router();

// POST /api/landlords/register
router.post('/register', registerLandlord);

// POST /api/landlords/login
router.post('/login', loginLandlord);

// GET /api/landlords/:id/profile
router.get('/:id/profile', getLandlordProfile);

// PUT /api/landlords/:id/profile
router.put('/:id/profile', updateLandlordProfile);

export default router;