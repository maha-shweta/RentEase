// NOTE: Using mocked bcrypt - replace with real bcrypt in production
const bcrypt = {
    hash: async (password) => `MOCKED_HASH_${password}`,
    compare: async (password, hash) => hash === `MOCKED_HASH_${password}`
};

import LandlordModel from '../models/LandlordModel.js';

/**
 * Handles landlord registration
 */
export const registerLandlord = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const existingLandlord = await LandlordModel.getByEmail(email);
        if (existingLandlord) {
            return res.status(409).json({ message: 'Email address is already registered.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const landlordData = { name, email, password_hash: passwordHash, phone };
        const newLandlordId = await LandlordModel.create(landlordData);
        const newLandlord = await LandlordModel.getById(newLandlordId);

        return res.status(201).json({
            message: 'Landlord registration successful.',
            landlord: {
                id: newLandlord.id,
                name: newLandlord.name,
                email: newLandlord.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error during registration.' });
    }
};

/**
 * Handles landlord login
 */
export const loginLandlord = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const landlord = await LandlordModel.getByEmail(email);
        if (!landlord) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, landlord.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        return res.status(200).json({
            message: 'Landlord login successful.',
            landlord: {
                id: landlord.id,
                name: landlord.name,
                email: landlord.email
            },
            token: `mock-jwt-landlord-${landlord.id}`
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error during login.' });
    }
};

/**
 * Get landlord profile by ID
 */
export const getLandlordProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const landlord = await LandlordModel.getById(id);
        if (!landlord) {
            return res.status(404).json({ message: 'Landlord not found.' });
        }
        res.status(200).json({ message: 'Landlord profile retrieved.', landlord });
    } catch (error) {
        console.error('Error fetching landlord profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Update landlord profile
 */
export const updateLandlordProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'ID and update data are required.' });
    }

    // TODO: Implement actual LandlordModel.update(id, updates)
    res.status(200).json({
        message: `Landlord profile ID ${id} updated successfully.`,
        data: updates
    });
};