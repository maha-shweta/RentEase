import pool from '../config/database.js';

class AnnouncementModel {
    static async create(data) {
        const { landlord_id, property_id, title, message } = data;
        const query = 'INSERT INTO announcements (landlord_id, property_id, title, message) VALUES ($1, $2, $3, $4) RETURNING id;';
        const result = await pool.query(query, [landlord_id, property_id || null, title, message]);
        return result.rows[0].id;
    }

    static async getByUnitId(unit_id) {
        const propertyResult = await pool.query('SELECT property_id FROM units WHERE id = $1', [unit_id]);
        if (propertyResult.rowCount === 0) return [];

        const propertyId = propertyResult.rows[0].property_id;
        const query = `
            SELECT a.*, l.name AS landlord_name
            FROM announcements a
            JOIN landlords l ON a.landlord_id = l.id
            WHERE a.property_id IS NULL OR a.property_id = $1
            ORDER BY a.created_at DESC;
        `;
        const result = await pool.query(query, [propertyId]);
        return result.rows;
    }

    static async getByLandlordId(landlord_id) {
        const query = `
            SELECT a.*, p.address AS property_address 
            FROM announcements a
            LEFT JOIN properties p ON a.property_id = p.id
            WHERE a.landlord_id = $1
            ORDER BY a.created_at DESC;
        `;
        const result = await pool.query(query, [landlord_id]);
        return result.rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM announcements WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }
}

export default AnnouncementModel;