import express from 'express';
import { 
    createAnnouncement, 
    getAnnouncementsForUnit, 
    getLandlordAnnouncements, 
    deleteAnnouncement 
} from '../controllers/AnnouncementController.js';

const router = express.Router();

/**
 * @route POST /api/announcements
 * @desc Create a new announcement (landlord only)
 * @access Landlord
 */
router.post('/', createAnnouncement);

/**
 * @route GET /api/announcements/unit/:unitId
 * @desc Get announcements relevant to a specific unit (Tenant view)
 * @access Tenant
 */
router.get('/unit/:unitId', getAnnouncementsForUnit);

/**
 * @route GET /api/announcements/landlord/:landlordId
 * @desc Get all announcements created by a specific landlord (Landlord view)
 * @access Landlord
 */
router.get('/landlord/:landlordId', getLandlordAnnouncements);

/**
 * @route DELETE /api/announcements/:id
 * @desc Delete an announcement
 * @access Landlord
 */
router.delete('/:id', deleteAnnouncement);

export default router;