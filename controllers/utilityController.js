const utilityModel = require('../models/utilityModel');

// Create a new utility bill
const createUtility = async (req, res) => {
  const { unit_id, utility_type, amount, bill_month, due_date } = req.body;

  try {
    const newUtility = await utilityModel.createUtility(unit_id, utility_type, amount, bill_month, due_date);
    res.status(201).json({ utility: newUtility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get utilities by unit ID
const getUtilities = async (req, res) => {
  const { unit_id } = req.params;

  try {
    const utilities = await utilityModel.getUtilitiesByUnit(unit_id);
    res.status(200).json({ utilities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a utility bill by ID
const getUtility = async (req, res) => {
  const { id } = req.params;

  try {
    const utility = await utilityModel.getUtilityById(id);
    if (!utility) {
      return res.status(404).json({ message: 'Utility bill not found' });
    }
    res.status(200).json({ utility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update utility bill status (mark as paid)
const updateUtility = async (req, res) => {
  const { id } = req.params;
  const { paid, paid_at } = req.body;

  try {
    const updatedUtility = await utilityModel.updateUtility(id, paid, paid_at);
    if (!updatedUtility) {
      return res.status(404).json({ message: 'Utility bill not found' });
    }
    res.status(200).json({ utility: updatedUtility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a utility bill
const deleteUtility = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUtility = await utilityModel.deleteUtility(id);
    if (!deletedUtility) {
      return res.status(404).json({ message: 'Utility bill not found' });
    }
    res.status(200).json({ message: 'Utility bill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUtility, getUtilities, getUtility, updateUtility, deleteUtility };
