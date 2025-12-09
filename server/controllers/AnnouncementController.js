import AnnouncementModel from '../models/AnnouncementModel.js';

/**
 * Handles the creation of a new announcement by a landlord.
 */
const createAnnouncement = async (req, res) => {
    const { landlord_id, property_id, title, message } = req.body;
    if (!landlord_id || !title || !message) {
        return res.status(400).json({ error: "Landlord ID, title, and message are required." });
    }
    try {
        const announcementId = await AnnouncementModel.create({
            landlord_id: parseInt(landlord_id, 10),
            property_id: property_id ? parseInt(property_id, 10) : null,
            title,
            message
        });
        res.status(201).json({ message: "Announcement posted successfully!", announcementId });
    } catch (error) {
        console.error("Create announcement error:", error);
        if (error.code === '23503') {
            return res.status(403).json({ error: "Invalid property ID provided for announcement." });
        }
        res.status(500).json({ error: "Failed to post announcement." });
    }
};

/**
 * Retrieves announcements relevant to a tenant's unit/property.
 */
const getAnnouncementsForUnit = async (req, res) => {
    const { unitId } = req.params;
    if (!unitId) {
        return res.status(400).json({ error: "Unit ID is required." });
    }
    try {
        const announcements = await AnnouncementModel.getByUnitId(parseInt(unitId, 10));
        res.status(200).json(announcements);
    } catch (error) {
        console.error("Get announcements for unit error:", error);
        res.status(500).json({ error: "Failed to retrieve announcements." });
    }
};

/**
 * Retrieves all announcements posted by a specific landlord.
 */
const getLandlordAnnouncements = async (req, res) => {
    const { landlordId } = req.params;
    if (!landlordId) {
        return res.status(400).json({ error: "Landlord ID is required." });
    }
    try {
        const announcements = await AnnouncementModel.getByLandlordId(parseInt(landlordId, 10));
        res.status(200).json({ announcements });
    } catch (error) {
        console.error("Get landlord announcements error:", error);
        res.status(500).json({ error: "Failed to retrieve landlord announcements." });
    }
};

/**
 * Handles the deletion of a specific announcement.
 */
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await AnnouncementModel.delete(parseInt(id, 10));
        if (success) {
            res.status(200).json({ message: `Announcement ${id} deleted successfully.` });
        }
        else {
            res.status(404).json({ message: `Announcement ${id} not found.` });
        }
    } catch (error) {
        console.error("Delete announcement error:", error);
        res.status(500).json({ error: "Failed to delete announcement." });
    }
};

export { createAnnouncement, getAnnouncementsForUnit, getLandlordAnnouncements, deleteAnnouncement };