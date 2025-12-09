import TenantModel from '../models/TenantModel.js';
import bcrypt from 'bcryptjs';

const registerTenant = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!email || !password || !name) { return res.status(400).json({ error: "Name, email, and password are required." }); }
    try {
        const existingTenant = await TenantModel.getByEmail(email);
        if (existingTenant) { return res.status(409).json({ error: "Email already registered." }); }
        const password_hash = await bcrypt.hash(password, 10);
        const tenantId = await TenantModel.create({ name, email, password_hash, phone });
        res.status(201).json({ message: "Tenant registered successfully!", tenantId });
    } catch (error) {
        console.error("Tenant registration error:", error);
        res.status(500).json({ error: "Failed to register tenant." });
    }
};

const loginTenant = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(400).json({ error: "Email and password are required." }); }
    try {
        const tenant = await TenantModel.getByEmail(email);
        if (!tenant) { return res.status(401).json({ error: "Invalid credentials." }); }
        const isMatch = await bcrypt.compare(password, tenant.password_hash);
        if (!isMatch) { return res.status(401).json({ error: "Invalid credentials." }); }
        res.status(200).json({
            message: "Login successful!",
            user: { id: tenant.id, name: tenant.name, email: tenant.email, role: 'tenant' }
        });
    } catch (error) {
        console.error("Tenant login error:", error);
        res.status(500).json({ error: "Login failed." });
    }
};

const getAllTenants = async (req, res) => {
    try {
        const tenants = await TenantModel.getAll();
        res.status(200).json({ tenants });
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getTenantById = async (req, res) => {
    const { id } = req.params;
    try {
        const tenant = await TenantModel.getById(id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found.' });
        }
        res.status(200).json(tenant);
    } catch (error) {
        console.error('Error fetching tenant:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateTenant = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const success = await TenantModel.update(parseInt(id, 10), { name, email, phone });
        if (success) {
            res.status(200).json({ message: `Tenant ${id} updated successfully.` });
        } else {
            res.status(404).json({ message: `Tenant ${id} not found.` });
        }
    } catch (error) {
        console.error("Update tenant error:", error);
        res.status(500).json({ error: "Failed to update tenant." });
    }
};

const deleteTenant = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await TenantModel.delete(parseInt(id, 10));
        if (success) {
            res.status(200).json({ message: `Tenant ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Tenant ${id} not found.` });
        }
    } catch (error) {
        console.error("Delete tenant error:", error);
        res.status(500).json({ error: "Failed to delete tenant." });
    }
};

export { registerTenant, loginTenant, getAllTenants, getTenantById, updateTenant, deleteTenant };