import pool from '../config/database.js';

class LandlordModel {
    static async create(data) {
        const { name, email, password_hash, phone } = data;
        const query = `
            INSERT INTO landlords (name, email, password_hash, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        const result = await pool.query(query, [name, email, password_hash, phone]);
        return result.rows[0].id;
    }

    static async getByEmail(email) {
        const query = 'SELECT * FROM landlords WHERE email = $1;';
        const result = await pool.query(query, [email]);
        return result.rows[0] || null;
    }

    static async getById(id) {
        const query = 'SELECT id, name, email, phone, created_at, updated_at FROM landlords WHERE id = $1;';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}

export default LandlordModel;