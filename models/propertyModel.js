const pool = require('../config/db');

// Get properties by landlord
const getPropertiesByLandlord = async (landlordId) => {
  const query = 'SELECT * FROM properties WHERE landlord_id = $1';
  const values = [landlordId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create new property
const createProperty = async (landlordId, address, type, size) => {
  const query = `
    INSERT INTO properties (landlord_id, address, type, size)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [landlordId, address, type, size];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get property by ID
const getPropertyById = async (id) => {
  const query = 'SELECT * FROM properties WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];  // Returns a single property or null if not found
};

// Update property details
const updateProperty = async (id, address, type, size) => {
  const query = `
    UPDATE properties
    SET address = $1, type = $2, size = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *`;
  const values = [address, type, size, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a property
const deleteProperty = async (id) => {
  const query = 'DELETE FROM properties WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getPropertiesByLandlord, createProperty, updateProperty, deleteProperty };
