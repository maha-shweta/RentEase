const pool = require('../config/db');

// Get units by property ID
const getUnitsByProperty = async (propertyId) => {
  const query = 'SELECT * FROM units WHERE property_id = $1';
  const values = [propertyId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Get a unit by ID
const getUnitById = async (id) => {
  const query = 'SELECT * FROM units WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Create a new unit
const createUnit = async (propertyId, unitNumber, rentAmount, size, status) => {
  const query = `
    INSERT INTO units (property_id, unit_number, rent_amount, size, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [propertyId, unitNumber, rentAmount, size, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update unit details
const updateUnit = async (id, unitNumber, rentAmount, size, status) => {
  const query = `
    UPDATE units
    SET unit_number = $1, rent_amount = $2, size = $3, status = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *`;
  const values = [unitNumber, rentAmount, size, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a unit
const deleteUnit = async (id) => {
  const query = 'DELETE FROM units WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getUnitsByProperty, getUnitById, createUnit, updateUnit, deleteUnit };
