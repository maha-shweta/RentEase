import pool from '../config/database.js';

class UnitModel {
    static async create(data) {
        const { property_id, unit_number, rent_amount, size, status } = data;
        const query = 'INSERT INTO units (property_id, unit_number, rent_amount, size, status) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
        const result = await pool.query(query, [property_id, unit_number, rent_amount, size, status || 'Available']);
        return result.rows[0].id;
    }

    static async getByPropertyId(property_id) {
        const query = 'SELECT * FROM units WHERE property_id = $1 ORDER BY unit_number;';
        const result = await pool.query(query, [property_id]);
        return result.rows;
    }

    static async getAll() {
        const query = `
            SELECT u.*, p.address as property_address 
            FROM units u 
            LEFT JOIN properties p ON u.property_id = p.id 
            ORDER BY p.address, u.unit_number;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async update(id, data) {
        const { unit_number, rent_amount, size, status } = data;
        const query = 'UPDATE units SET unit_number = $1, rent_amount = $2, size = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING id;';
        const result = await pool.query(query, [unit_number, rent_amount, size, status, id]);
        return result.rowCount > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM units WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }

    static async updateStatus(id, status) {
        const query = 'UPDATE units SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id;';
        const result = await pool.query(query, [status, id]);
        return result.rowCount > 0;
    }
}

export default UnitModel;