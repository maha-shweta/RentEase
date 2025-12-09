import pool from '../config/database.js';

class UtilityModel {
    static async create(data) {
        const { unit_id, utility_type, amount, bill_month, due_date, paid, paid_at } = data;
        const query = `
            INSERT INTO utilities (unit_id, utility_type, amount, bill_month, due_date, paid, paid_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
        `;
        const result = await pool.query(query, [unit_id, utility_type, amount, bill_month, due_date, paid || false, paid_at || null]);
        return result.rows[0].id;
    }

    static async getByUnitId(unit_id) {
        const query = 'SELECT * FROM utilities WHERE unit_id = $1 ORDER BY due_date DESC';
        const result = await pool.query(query, [unit_id]);
        return result.rows;
    }

    static async markAsPaid(id) {
        const query = 'UPDATE utilities SET paid = TRUE, paid_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }

    static async markAsUnpaid(id) {
        const query = 'UPDATE utilities SET paid = FALSE, paid_at = NULL WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }

    static async getAll() {
        const query = `
            SELECT ut.*, u.unit_number, p.address as property_address
            FROM utilities ut
            JOIN units u ON ut.unit_id = u.id
            JOIN properties p ON u.property_id = p.id
            ORDER BY ut.due_date DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}

export default UtilityModel;