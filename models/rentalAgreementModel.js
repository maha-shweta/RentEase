const pool = require('../config/db');

// Get rental agreements by tenant ID
const getRentalAgreementsByTenant = async (tenantId) => {
  const query = 'SELECT * FROM rental_agreements WHERE tenant_id = $1';
  const values = [tenantId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Get rental agreements by unit ID
const getRentalAgreementsByUnit = async (unitId) => {
  const query = 'SELECT * FROM rental_agreements WHERE unit_id = $1';
  const values = [unitId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create a new rental agreement
const createRentalAgreement = async (tenantId, unitId, startDate, endDate, rentAmount, depositAmount, status) => {
  const query = `
    INSERT INTO rental_agreements (tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [tenantId, unitId, startDate, endDate, rentAmount, depositAmount, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get a rental agreement by ID
const getRentalAgreementById = async (id) => {
  const query = 'SELECT * FROM rental_agreements WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update rental agreement details
const updateRentalAgreement = async (id, startDate, endDate, rentAmount, depositAmount, status) => {
  const query = `
    UPDATE rental_agreements
    SET start_date = $1, end_date = $2, rent_amount = $3, deposit_amount = $4, status = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *`;
  const values = [startDate, endDate, rentAmount, depositAmount, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a rental agreement
const deleteRentalAgreement = async (id) => {
  const query = 'DELETE FROM rental_agreements WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getRentalAgreementsByTenant, getRentalAgreementsByUnit, createRentalAgreement, getRentalAgreementById, updateRentalAgreement, deleteRentalAgreement };
