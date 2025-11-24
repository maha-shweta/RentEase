const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tenantModel = require('../models/tenantModel');

// Tenant Sign Up
const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if tenant already exists
    const existingTenant = await tenantModel.getTenantByEmail(email);
    if (existingTenant.length > 0) {
      return res.status(400).json({ message: 'Tenant already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the tenant
    const newTenant = await tenantModel.createTenant(name, email, hashedPassword, phone);

    // Create JWT token
    const token = jwt.sign({ id: newTenant.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, tenant: newTenant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Tenant Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find tenant by email
    const tenants = await tenantModel.getTenantByEmail(email);
    if (tenants.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const tenant = tenants[0];

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, tenant.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: tenant.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and tenant data
    res.status(200).json({ token, tenant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp, login };
