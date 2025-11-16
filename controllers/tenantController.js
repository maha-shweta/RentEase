const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');  // Import the PostgreSQL connection

// Tenant Registration (Signup)
const registerTenant = async (req, res) => {
  const { email, password, name, lease_duration, rent_amount, property_id } = req.body;

  try {
    // Check if the tenant already exists
    const tenantExists = await pool.query('SELECT * FROM tenants WHERE email = $1', [email]);
    if (tenantExists.rows.length > 0) {
      return res.status(400).json({ error: 'Tenant already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the `tenants` table
    const insertTenantQuery = `
      INSERT INTO tenants (email, password_hash, name, lease_duration, rent_amount, property_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [email, hashedPassword, name, lease_duration, rent_amount, property_id];
    const newTenant = await pool.query(insertTenantQuery, values);

    return res.status(201).json(newTenant.rows[0]);  // Return the inserted tenant
  } catch (err) {
    console.error('Error registering tenant:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Tenant Login (Authentication)
const loginTenant = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the tenant exists
    const tenant = await pool.query('SELECT * FROM tenants WHERE email = $1', [email]);
    if (tenant.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, tenant.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: tenant.rows[0].id, role: 'tenant' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (err) {
    console.error('Error logging in tenant:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerTenant,
  loginTenant
};
