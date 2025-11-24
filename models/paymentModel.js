const pool = require('../config/db');

// Get payments by rental agreement ID
const getPaymentsByRentalAgreement = async (rentalAgreementId) => {
  const query = 'SELECT * FROM payments WHERE rental_agreement_id = $1';
  const values = [rentalAgreementId];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create a new payment
const createPayment = async (rentalAgreementId, amount, dueDate, paymentStatus, lateFee) => {
  const query = `
    INSERT INTO payments (rental_agreement_id, amount, due_date, payment_status, late_fee)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [rentalAgreementId, amount, dueDate, paymentStatus, lateFee];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get a payment by ID
const getPaymentById = async (id) => {
  const query = 'SELECT * FROM payments WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update payment details
const updatePayment = async (id, amount, paidAt, paymentStatus, lateFee) => {
  const query = `
    UPDATE payments
    SET amount = $1, paid_at = $2, payment_status = $3, late_fee = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *`;
  const values = [amount, paidAt, paymentStatus, lateFee, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a payment
const deletePayment = async (id) => {
  const query = 'DELETE FROM payments WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getPaymentsByRentalAgreement, createPayment, getPaymentById, updatePayment, deletePayment };
