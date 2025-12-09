import pool from '../config/database.js';

class PaymentModel {
    static async create(data) {
        const { rental_agreement_id, amount, due_date, paid_at, payment_status, late_fee } = data;
        const query = `
            INSERT INTO payments (rental_agreement_id, amount, due_date, paid_at, payment_status, late_fee) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
        `;
        const result = await pool.query(query, [rental_agreement_id, amount, due_date, paid_at, payment_status, late_fee || 0.00]);
        return result.rows[0].id;
    }

    static async getByAgreementId(agreementId) {
        const query = 'SELECT * FROM payments WHERE rental_agreement_id = $1 ORDER BY due_date DESC;';
        const result = await pool.query(query, [agreementId]);
        return result.rows;
    }

    static async updateStatus(id, payment_status, paid_at) {
        const query = 'UPDATE payments SET payment_status = $1, paid_at = $2 WHERE id = $3 RETURNING id;';
        const result = await pool.query(query, [payment_status, paid_at || new Date(), id]);
        return result.rowCount > 0;
    }

    static async getAll() {
        const query = `
            SELECT p.*, ra.tenant_id, t.name as tenant_name, u.unit_number, pr.address as property_address
            FROM payments p
            JOIN rental_agreements ra ON p.rental_agreement_id = ra.id
            JOIN tenants t ON ra.tenant_id = t.id
            JOIN units u ON ra.unit_id = u.id
            JOIN properties pr ON u.property_id = pr.id
            ORDER BY p.due_date DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}

export default PaymentModel;