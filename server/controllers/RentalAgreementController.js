import RentalAgreementModel from '../models/RentalAgreementModel.js';

const createAgreement = async (req, res) => {
    const { tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status } = req.body;
    if (!tenant_id || !unit_id || !start_date || !end_date || rent_amount === undefined) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    try {
        const agreementId = await RentalAgreementModel.create({
            tenant_id: parseInt(tenant_id, 10),
            unit_id: parseInt(unit_id, 10),
            start_date, end_date, rent_amount,
            deposit_amount: deposit_amount || 0.00,
            status
        });
        res.status(201).json({ message: "Agreement created successfully!", agreementId });
    } catch (error) {
        console.error("Create agreement error:", error);
        if (error.code === '23503') return res.status(403).json({ error: "Invalid tenant or unit ID." });
        res.status(500).json({ error: "Failed to create rental agreement." });
    }
};

const getAgreement = async (req, res) => {
    const { id } = req.params;
    try {
        const agreement = await RentalAgreementModel.getById(parseInt(id, 10));
        if (agreement) res.status(200).json(agreement);
        else res.status(404).json({ message: "Rental agreement not found." });
    } catch (error) {
        console.error("Get agreement error:", error);
        res.status(500).json({ error: "Failed to retrieve rental agreement." });
    }
};

const getAllAgreements = async (req, res) => {
    try {
        const agreements = await RentalAgreementModel.getAll();
        res.status(200).json({ agreements });
    } catch (error) {
        console.error("Get all agreements error:", error);
        res.status(500).json({ error: "Failed to retrieve rental agreements." });
    }
};

const getTenantActiveAgreements = async (req, res) => {
    const { tenantId } = req.params;
    if (!tenantId) return res.status(400).json({ error: "Tenant ID is required." });
    try {
        const agreements = await RentalAgreementModel.getActiveByTenant(parseInt(tenantId, 10));
        res.status(200).json(agreements);
    } catch (error) {
        console.error("Get tenant agreements error:", error);
        res.status(500).json({ error: "Failed to retrieve tenant agreements." });
    }
};

const updateAgreementStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['Active', 'Terminated', 'Expired'].includes(status)) {
        return res.status(400).json({ error: "Invalid or missing status." });
    }
    try {
        const success = await RentalAgreementModel.updateStatus(parseInt(id, 10), status);
        if (success) res.status(200).json({ message: `Agreement ${id} status updated to ${status}.` });
        else res.status(404).json({ message: `Agreement ${id} not found.` });
    } catch (error) {
        console.error("Update agreement status error:", error);
        res.status(500).json({ error: "Failed to update rental agreement status." });
    }
};

const deleteAgreement = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await RentalAgreementModel.delete(parseInt(id, 10));
        if (success) res.status(200).json({ message: `Agreement ${id} deleted successfully.` });
        else res.status(404).json({ message: `Agreement ${id} not found.` });
    } catch (error) {
        console.error("Delete agreement error:", error);
        res.status(500).json({ error: "Failed to delete rental agreement." });
    }
};

export { createAgreement, getAgreement, getAllAgreements, getTenantActiveAgreements, updateAgreementStatus, deleteAgreement };