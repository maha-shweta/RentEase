const propertyModel = require('../models/propertyModel');

// Create a new property
const createProperty = async (req, res) => {
  const { landlord_id, address, type, size } = req.body;

  try {
    // Create the property
    const newProperty = await propertyModel.createProperty(landlord_id, address, type, size);
    res.status(201).json({ property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get properties by landlord
const getProperties = async (req, res) => {
  const { landlord_id } = req.params;

  try {
    const properties = await propertyModel.getPropertiesByLandlord(landlord_id);
    res.status(200).json({ properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single property by ID
const getProperty = async (req, res) => {
  const { id } = req.params;  // Extract the property ID from the route params

  try {
    const property = await propertyModel.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update property details
const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { address, type, size } = req.body;

  try {
    const updatedProperty = await propertyModel.updateProperty(id, address, type, size);
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ property: updatedProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await propertyModel.deleteProperty(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProperty, getProperties, getProperty, updateProperty, deleteProperty };
