import PropertyModel from '../models/PropertyModel.js';

const createProperty = async (req, res) => {
    const { landlord_id, address, type, size } = req.body;
    if (!landlord_id || !address || !type) { return res.status(400).json({ error: "Landlord ID, address, and type are required." }); }
    try {
        const propertyId = await PropertyModel.create({ landlord_id, address, type, size });
        res.status(201).json({ message: "Property created successfully!", propertyId });
    } catch (error) {
        console.error("Create property error:", error);
        res.status(500).json({ error: "Failed to create property." });
    }
};

const getLandlordProperties = async (req, res) => {
    const { landlordId } = req.params;
    try {
        const properties = await PropertyModel.getByLandlordId(parseInt(landlordId, 10));
        res.status(200).json({ properties });
    } catch (error) {
        console.error("Get landlord properties error:", error);
        res.status(500).json({ error: "Failed to retrieve properties." });
    }
};

const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { address, type, size } = req.body;
    try {
        const success = await PropertyModel.update(parseInt(id, 10), { address, type, size });
        if (success) {
            res.status(200).json({ message: `Property ${id} updated successfully.` });
        } else {
            res.status(404).json({ message: `Property ${id} not found.` });
        }
    } catch (error) {
        console.error("Update property error:", error);
        res.status(500).json({ error: "Failed to update property." });
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await PropertyModel.delete(parseInt(id, 10));
        if (success) {
            res.status(200).json({ message: `Property ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Property ${id} not found.` });
        }
    } catch (error) {
        console.error("Delete property error:", error);
        res.status(500).json({ error: "Failed to delete property." });
    }
};

export { createProperty, getLandlordProperties, updateProperty, deleteProperty };