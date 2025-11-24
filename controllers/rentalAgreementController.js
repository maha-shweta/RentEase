const rentalAgreementModel = require('../models/rentalAgreementModel');

// Create a new rental agreement
const createRentalAgreement = async (req, res) => {
  const { tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status } = req.body;

  try {
    const newAgreement = await rentalAgreementModel.createRentalAgreement(tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status);
    res.status(201).json({ rental_agreement: newAgreement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get rental agreements by tenant ID
const getRentalAgreementsByTenant = async (req, res) => {
  const { tenant_id } = req.params;

  try {
    const agreements = await rentalAgreementModel.getRentalAgreementsByTenant(tenant_id);
    res.status(200).json({ agreements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get rental agreements by unit ID
const getRentalAgreementsByUnit = async (req, res) => {
  const { unit_id } = req.params;

  try {
    const agreements = await rentalAgreementModel.getRentalAgreementsByUnit(unit_id);
    res.status(200).json({ agreements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a rental agreement by ID
const getRentalAgreementById = async (req, res) => {
  const { id } = req.params;

  try {
    const agreement = await rentalAgreementModel.getRentalAgreementById(id);
    if (!agreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json({ agreement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update rental agreement details
const updateRentalAgreement = async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, rent_amount, deposit_amount, status } = req.body;

  try {
    const updatedAgreement = await rentalAgreementModel.updateRentalAgreement(id, start_date, end_date, rent_amount, deposit_amount, status);
    if (!updatedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json({ rental_agreement: updatedAgreement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a rental agreement
const deleteRentalAgreement = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAgreement = await rentalAgreementModel.deleteRentalAgreement(id);
    if (!deletedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json({ message: 'Rental agreement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRentalAgreement, getRentalAgreementsByTenant, getRentalAgreementsByUnit, getRentalAgreementById, updateRentalAgreement, deleteRentalAgreement };
