const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Create a new announcement
router.post('/create', announcementController.createAnnouncement);

// Get announcements by landlord ID
router.get('/:landlord_id', announcementController.getAnnouncementsByLandlord);

// Get announcements by property ID
router.get('/property/:property_id', announcementController.getAnnouncementsByProperty);

// Get an announcement by ID
router.get('/:id', announcementController.getAnnouncementById);

// Update an announcement
router.put('/:id', announcementController.updateAnnouncement);

// Delete an announcement
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
