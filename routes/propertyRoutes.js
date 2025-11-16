const express = require('express');
const {
  createProperty,
  getPropertiesByLandlord,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const router = express.Router();

// POST Route for creating a property
router.post('/', createProperty);  // Endpoint for creating a property

// GET Route for getting all properties of a landlord
router.get('/:landlord_id', getPropertiesByLandlord);  // Endpoint for fetching properties by landlord ID

// PUT Route for updating property details
router.put('/:property_id', updateProperty);  // Endpoint for updating property by property ID

// DELETE Route for deleting a property
router.delete('/:property_id', deleteProperty);  // Endpoint for deleting a property by property ID

module.exports = router;
