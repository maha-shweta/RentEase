const pool = require('../config/db');

// Get tenant by email
const getTenantByEmail = async (email) => {
  const query = 'SELECT * FROM tenants WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create new tenant
const createTenant = async (name, email, passwordHash, phone) => {
  const query = `
    INSERT INTO tenants (name, email, password_hash, phone)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [name, email, passwordHash, phone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update tenant details
const updateTenant = async (id, name, email, phone) => {
  const query = `
    UPDATE tenants
    SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *`;
  const values = [name, email, phone, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getTenantByEmail, createTenant, updateTenant };
