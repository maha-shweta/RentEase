const pool = require('../config/db');

// Get landlord by email
const getLandlordByEmail = async (email) => {
  const query = 'SELECT * FROM landlords WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows;
};

// Create new landlord
const createLandlord = async (name, email, passwordHash, phone) => {
  const query = `
    INSERT INTO landlords (name, email, password_hash, phone)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [name, email, passwordHash, phone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update landlord details
const updateLandlord = async (id, name, email, phone) => {
  const query = `
    UPDATE landlords
    SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *`;
  const values = [name, email, phone, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getLandlordByEmail, createLandlord, updateLandlord };
