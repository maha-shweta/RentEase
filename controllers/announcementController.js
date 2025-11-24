const announcementModel = require('../models/announcementModel');

// Create a new announcement
const createAnnouncement = async (req, res) => {
  const { landlord_id, property_id, title, message } = req.body;

  try {
    const newAnnouncement = await announcementModel.createAnnouncement(landlord_id, property_id, title, message);
    res.status(201).json({ announcement: newAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get announcements by landlord ID
const getAnnouncementsByLandlord = async (req, res) => {
  const { landlord_id } = req.params;

  try {
    const announcements = await announcementModel.getAnnouncementsByLandlord(landlord_id);
    res.status(200).json({ announcements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get announcements by property ID
const getAnnouncementsByProperty = async (req, res) => {
  const { property_id } = req.params;

  try {
    const announcements = await announcementModel.getAnnouncementsByProperty(property_id);
    res.status(200).json({ announcements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get an announcement by ID
const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await announcementModel.getAnnouncementById(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ announcement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an announcement
const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, message } = req.body;

  try {
    const updatedAnnouncement = await announcementModel.updateAnnouncement(id, title, message);
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ announcement: updatedAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnnouncement = await announcementModel.deleteAnnouncement(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAnnouncement, getAnnouncementsByLandlord, getAnnouncementsByProperty, getAnnouncementById, updateAnnouncement, deleteAnnouncement };
