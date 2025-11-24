const paymentModel = require('../models/paymentModel');

// Create a new payment
const createPayment = async (req, res) => {
  const { rental_agreement_id, amount, due_date, payment_status, late_fee } = req.body;

  try {
    const newPayment = await paymentModel.createPayment(rental_agreement_id, amount, due_date, payment_status, late_fee);
    res.status(201).json({ payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get payments by rental agreement ID
const getPayments = async (req, res) => {
  const { rental_agreement_id } = req.params;

  try {
    const payments = await paymentModel.getPaymentsByRentalAgreement(rental_agreement_id);
    res.status(200).json({ payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a payment by ID
const getPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await paymentModel.getPaymentById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update payment details
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, paid_at, payment_status, late_fee } = req.body;

  try {
    const updatedPayment = await paymentModel.updatePayment(id, amount, paid_at, payment_status, late_fee);
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await paymentModel.deletePayment(id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPayment, getPayments, getPayment, updatePayment, deletePayment };
