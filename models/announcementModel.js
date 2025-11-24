const pool = require('../config/db');

// Get announcements by landlord ID
const getAnnouncementsByLandlord = async (landlordId) => {
  const query = 'SELECT * FROM announcements WHERE landlord_id = $1';
  const values = [landlordId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Get announcements by property ID (can be null for general announcements)
const getAnnouncementsByProperty = async (propertyId) => {
  const query = 'SELECT * FROM announcements WHERE property_id = $1';
  const values = [propertyId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create a new announcement
const createAnnouncement = async (landlordId, propertyId, title, message) => {
  const query = `
    INSERT INTO announcements (landlord_id, property_id, title, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [landlordId, propertyId, title, message];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get an announcement by ID
const getAnnouncementById = async (id) => {
  const query = 'SELECT * FROM announcements WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update an announcement
const updateAnnouncement = async (id, title, message) => {
  const query = `
    UPDATE announcements
    SET title = $1, message = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *`;
  const values = [title, message, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete an announcement
const deleteAnnouncement = async (id) => {
  const query = 'DELETE FROM announcements WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getAnnouncementsByLandlord, getAnnouncementsByProperty, createAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement };
