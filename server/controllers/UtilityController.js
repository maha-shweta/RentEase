import UtilityModel from '../models/UtilityModel.js';

const createUtilityBill = async (req, res) => {
    const { unit_id, utility_type, amount, bill_month, due_date, paid, paid_at } = req.body;
    if (!unit_id || !utility_type || amount === undefined || !bill_month || !due_date) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    try {
        const utilityId = await UtilityModel.create({ unit_id, utility_type, amount, bill_month, due_date, paid, paid_at });
        res.status(201).json({ message: "Utility bill recorded successfully!", utilityId });
    } catch (error) {
        console.error("Create utility bill error:", error);
        if (error.code === '23503') return res.status(403).json({ error: "Invalid unit ID." });
        res.status(500).json({ error: "Failed to record utility bill." });
    }
};

const getUtilityBillsByUnit = async (req, res) => {
    const { unitId } = req.params;
    if (!unitId) return res.status(400).json({ error: "Unit ID is required." });
    try {
        const bills = await UtilityModel.getByUnitId(parseInt(unitId, 10));
        res.status(200).json({ utilities: bills });
    } catch (error) {
        console.error("Get utility bills error:", error);
        res.status(500).json({ error: "Failed to retrieve utility bills." });
    }
};

const payUtilityBill = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Utility bill ID is required." });
    try {
        const success = await UtilityModel.markAsPaid(parseInt(id, 10));
        if (success) res.status(200).json({ message: `Utility bill ${id} marked as paid.` });
        else res.status(404).json({ message: `Utility bill ${id} not found.` });
    } catch (error) {
        console.error("Mark utility bill as paid error:", error);
        res.status(500).json({ error: "Failed to update utility bill status." });
    }
};

const unpayUtilityBill = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Utility bill ID is required." });
    try {
        const success = await UtilityModel.markAsUnpaid(parseInt(id, 10));
        if (success) res.status(200).json({ message: `Utility bill ${id} marked as unpaid.` });
        else res.status(404).json({ message: `Utility bill ${id} not found.` });
    } catch (error) {
        console.error("Mark utility bill as unpaid error:", error);
        res.status(500).json({ error: "Failed to update utility bill status." });
    }
};

const getAllUtilities = async (req, res) => {
    try {
        const bills = await UtilityModel.getAll();
        res.status(200).json({ utilities: bills });
    } catch (error) {
        console.error("Get all utilities error:", error);
        res.status(500).json({ error: "Failed to retrieve utilities." });
    }
};

export { createUtilityBill, getUtilityBillsByUnit, payUtilityBill, unpayUtilityBill, getAllUtilities };
