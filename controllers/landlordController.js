const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const landlordModel = require('../models/landlordModel');

// Sign up landlord
const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if landlord already exists
    const existingLandlord = await landlordModel.getLandlordByEmail(email);
    if (existingLandlord.length > 0) {
      return res.status(400).json({ message: 'Landlord already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the landlord
    const newLandlord = await landlordModel.createLandlord(name, email, hashedPassword, phone);

    // Create JWT token
    const token = jwt.sign({ id: newLandlord.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, landlord: newLandlord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login landlord
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find landlord by email
    const landlords = await landlordModel.getLandlordByEmail(email);
    if (landlords.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const landlord = landlords[0];

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, landlord.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: landlord.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and landlord data
    res.status(200).json({ token, landlord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update landlord details
const updateLandlord = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedLandlord = await landlordModel.updateLandlord(id, name, email, phone);
    if (!updatedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }

    res.status(200).json({ landlord: updatedLandlord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp, login, updateLandlord };
