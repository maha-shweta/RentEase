const pool = require('../config/db');  // Import the PostgreSQL connection
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for JWT handling

// Create Property (Landlord adds a new property)
const createProperty = async (req, res) => {
  const { landlord_id, address, type, rent_amount, size, availability_status } = req.body;

  // Validate required fields
  if (!landlord_id || !address || !type || !rent_amount || !size || !availability_status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Insert a new property into the properties table
    const insertQuery = `
      INSERT INTO properties (landlord_id, address, type, rent_amount, size, availability_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;  
    `;
    const values = [landlord_id, address, type, rent_amount, size, availability_status];
    const result = await pool.query(insertQuery, values);

    // Return the newly created property details
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting property:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get Properties by Landlord (Fetch all properties for a given landlord)
const getPropertiesByLandlord = async (req, res) => {
  const { landlord_id } = req.params;  // Get landlord_id from the URL parameter

  try {
    // Query to fetch all properties for the specified landlord_id
    const query = `SELECT * FROM properties WHERE landlord_id = $1`;
    const result = await pool.query(query, [landlord_id]);

    // If no properties found for the landlord, return 404
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No properties found for this landlord' });
    }

    // Return the list of properties for the landlord
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Update Property (Landlord updates property details)
const updateProperty = async (req, res) => {
  const { property_id } = req.params;  // Get property_id from the URL parameter
  const { address, type, rent_amount, size, availability_status } = req.body;

  if (!address || !type || !rent_amount || !size || !availability_status) {
    return res.status(400).json({ error: 'All fields are required to update the property' });
  }

  try {
    // Update query
    const updateQuery = `
      UPDATE properties
      SET address = $1, type = $2, rent_amount = $3, size = $4, availability_status = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;  
    `;
    const values = [address, type, rent_amount, size, availability_status, property_id];

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Return the updated property
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating property:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};


// Delete Property (Landlord deletes a property)
const deleteProperty = async (req, res) => {
  const { property_id } = req.params;

  try {
    // Delete query
    const deleteQuery = `DELETE FROM properties WHERE id = $1 RETURNING *;`;
    const result = await pool.query(deleteQuery, [property_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    return res.status(200).json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error('Error deleting property:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createProperty,
  getPropertiesByLandlord,
  updateProperty,
  deleteProperty
};
