const pool = require('../config/db');

// Get utilities by unit ID
const getUtilitiesByUnit = async (unitId) => {
  const query = 'SELECT * FROM utilities WHERE unit_id = $1';
  const values = [unitId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create a new utility bill
const createUtility = async (unitId, utilityType, amount, billMonth, dueDate) => {
  const query = `
    INSERT INTO utilities (unit_id, utility_type, amount, bill_month, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [unitId, utilityType, amount, billMonth, dueDate];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get a utility bill by ID
const getUtilityById = async (id) => {
  const query = 'SELECT * FROM utilities WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update utility bill details
const updateUtility = async (id, paid, paidAt) => {
  const query = `
    UPDATE utilities
    SET paid = $1, paid_at = $2
    WHERE id = $3
    RETURNING *`;
  const values = [paid, paidAt, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a utility bill
const deleteUtility = async (id) => {
  const query = 'DELETE FROM utilities WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getUtilitiesByUnit, createUtility, getUtilityById, updateUtility, deleteUtility };
