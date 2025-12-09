import pool from '../config/database.js';

class PropertyModel {
    static async create(data) {
        const { landlord_id, address, type, size } = data;
        const query = 'INSERT INTO properties (landlord_id, address, type, size) VALUES ($1, $2, $3, $4) RETURNING id;';
        const result = await pool.query(query, [landlord_id, address, type, size]);
        return result.rows[0].id;
    }

    static async getByLandlordId(landlord_id) {
        const query = 'SELECT * FROM properties WHERE landlord_id = $1 ORDER BY address;';
        const result = await pool.query(query, [landlord_id]);
        return result.rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM properties WHERE id = $1;';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async update(id, data) {
        const { address, type, size } = data;
        const query = 'UPDATE properties SET address = $1, type = $2, size = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id;';
        const result = await pool.query(query, [address, type, size, id]);
        return result.rowCount > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM properties WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }
}

export default PropertyModel;