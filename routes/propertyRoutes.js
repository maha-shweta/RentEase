// routes/propertyRoutes.js
const express = require('express');
const { createProperty, getPropertiesByLandlord, updateProperty, deleteProperty } = require('../controllers/propertyController');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret
    req.user = decoded;  // Attach decoded user data to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });  // Handle invalid token
  }
};

// POST Route for creating a property
router.post('/', createProperty);  // Endpoint for creating a property

// GET Route for getting all properties of a landlord
router.get('/:landlord_id', getPropertiesByLandlord);  // Endpoint for fetching properties by landlord ID

// PUT Route for updating property details
router.put('/:property_id', updateProperty);  // Endpoint for updating property by property ID

// DELETE Route for deleting a property
router.delete('/:property_id', deleteProperty);  // Endpoint for deleting a property by property ID

module.exports = router;
