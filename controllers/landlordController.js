const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');  // Import raw SQL query function

// Landlord Registration (Signup)
const registerLandlord = async (req, res) => {
  const { email, password, name, contact_info } = req.body;

  try {
    // Check if the landlord already exists using raw SQL
    const landlordExists = await query('SELECT * FROM landlords WHERE email = $1', [email]);
    if (landlordExists.rows.length > 0) {
      return res.status(400).json({ error: 'Landlord already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the landlord's data into the `landlords` table
    const insertLandlordQuery = `
      INSERT INTO landlords (email, password_hash, name, contact_info)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, contact_info;
    `;
    const newLandlord = await query(insertLandlordQuery, [email, hashedPassword, name, contact_info]);

    // Return the newly created landlord
    return res.status(201).json(newLandlord.rows[0]);
  } catch (err) {
    console.error('Error during landlord registration:', err);  // Log the error for debugging
    return res.status(500).json({ error: 'Server error' });
  }
};

// Landlord Login (Authentication)
const loginLandlord = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if landlord exists using raw SQL
    const landlord = await query('SELECT * FROM landlords WHERE email = $1', [email]);
    if (landlord.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, landlord.rows[0].password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate a JWT token for the landlord
    const token = jwt.sign(
      { id: landlord.rows[0].id, role: 'landlord' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Respond with the JWT token
    return res.json({ token });
  } catch (err) {
    console.error('Error during landlord login:', err);  // Log the error for debugging
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerLandlord, loginLandlord };
