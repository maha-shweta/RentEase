import pool from '../config/database.js';

class TenantModel {
    static async create(data) {
        const { name, email, password_hash, phone } = data;
        const query = 'INSERT INTO tenants (name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING id;';
        const result = await pool.query(query, [name, email, password_hash, phone]);
        return result.rows[0].id;
    }

    static async getByEmail(email) {
        const query = 'SELECT * FROM tenants WHERE email = $1;';
        const result = await pool.query(query, [email]);
        return result.rows[0] || null;
    }

    static async getById(id) {
        const query = 'SELECT * FROM tenants WHERE id = $1;';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async getAll() {
        const query = 'SELECT id, name, email, phone, created_at FROM tenants ORDER BY created_at DESC;';
        const result = await pool.query(query);
        return result.rows;
    }

    static async update(id, data) {
        const { name, email, phone } = data;
        const query = 'UPDATE tenants SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id;';
        const result = await pool.query(query, [name, email, phone, id]);
        return result.rowCount > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM tenants WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }
}

export default TenantModel;