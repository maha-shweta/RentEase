const unitModel = require('../models/unitModel');

// Create a new unit
const createUnit = async (req, res) => {
  const { property_id, unit_number, rent_amount, size, status } = req.body;

  try {
    const newUnit = await unitModel.createUnit(property_id, unit_number, rent_amount, size, status);
    res.status(201).json({ unit: newUnit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get units by property ID
const getUnits = async (req, res) => {
  const { property_id } = req.params;

  try {
    const units = await unitModel.getUnitsByProperty(property_id);
    res.status(200).json({ units });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a unit by ID
const getUnit = async (req, res) => {
  const { id } = req.params;

  try {
    const unit = await unitModel.getUnitById(id);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json({ unit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update unit details
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { unit_number, rent_amount, size, status } = req.body;

  try {
    const updatedUnit = await unitModel.updateUnit(id, unit_number, rent_amount, size, status);
    if (!updatedUnit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json({ unit: updatedUnit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a unit
const deleteUnit = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUnit = await unitModel.deleteUnit(id);
    if (!deletedUnit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUnit, getUnits, getUnit, updateUnit, deleteUnit };
