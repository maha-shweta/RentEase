import UnitModel from '../models/UnitModel.js';

const createUnit = async (req, res) => {
    const { property_id, unit_number, rent_amount, size, status } = req.body;

    if (!property_id || !unit_number || !rent_amount) {
        return res.status(400).json({ error: "Property ID, unit number, and rent amount are required." });
    }

    try {
        const unitId = await UnitModel.create({
            property_id,
            unit_number,
            rent_amount,
            size,
            status
        });
        res.status(201).json({ message: "Unit created successfully!", unitId });
    } catch (error) {
        console.error("Create unit error:", error);
        res.status(500).json({ error: "Failed to create unit." });
    }
};

const getAllUnits = async (req, res) => {
    try {
        const units = await UnitModel.getAll();
        res.status(200).json({ units });
    } catch (error) {
        console.error("Get all units error:", error);
        res.status(500).json({ error: "Failed to retrieve units." });
    }
};

const getPropertyUnits = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const units = await UnitModel.getByPropertyId(parseInt(propertyId, 10));
        res.status(200).json({ units });
    } catch (error) {
        console.error("Get property units error:", error);
        res.status(500).json({ error: "Failed to retrieve units." });
    }
};

const updateUnit = async (req, res) => {
    const { id } = req.params;
    const { unit_number, rent_amount, size, status } = req.body;

    try {
        const success = await UnitModel.update(parseInt(id, 10), { unit_number, rent_amount, size, status });
        if (success) {
            res.status(200).json({ message: `Unit ${id} updated successfully.` });
        } else {
            res.status(404).json({ message: `Unit ${id} not found.` });
        }
    } catch (error) {
        console.error("Update unit error:", error);
        res.status(500).json({ error: "Failed to update unit." });
    }
};

const deleteUnit = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await UnitModel.delete(parseInt(id, 10));
        if (success) {
            res.status(200).json({ message: `Unit ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Unit ${id} not found.` });
        }
    } catch (error) {
        console.error("Delete unit error:", error);
        res.status(500).json({ error: "Failed to delete unit." });
    }
};

const updateUnitStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required." });
    }

    try {
        const success = await UnitModel.updateStatus(parseInt(id, 10), status);
        if (success) {
            res.status(200).json({ message: `Unit ${id} status updated successfully.` });
        } else {
            res.status(404).json({ message: `Unit ${id} not found.` });
        }
    } catch (error) {
        console.error("Update unit status error:", error);
        res.status(500).json({ error: "Failed to update unit status." });
    }
};

export { createUnit, getAllUnits, getPropertyUnits, updateUnit, deleteUnit, updateUnitStatus };