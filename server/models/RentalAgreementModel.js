import pool from '../config/database.js';

class RentalAgreementModel {
    static async create(data) {
        const { tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status } = data;
        const query = `
            INSERT INTO rental_agreements (tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
        `;
        const result = await pool.query(query, [tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status || 'Active']);
        return result.rows[0].id;
    }

    static async getById(id) {
        const query = `
            SELECT ra.*, t.name as tenant_name, u.unit_number, p.address as property_address
            FROM rental_agreements ra
            JOIN tenants t ON ra.tenant_id = t.id
            JOIN units u ON ra.unit_id = u.id
            JOIN properties p ON u.property_id = p.id
            WHERE ra.id = $1;
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async getActiveByTenant(tenant_id) {
        const query = `
            SELECT ra.*, u.unit_number, p.address as property_address 
            FROM rental_agreements ra
            JOIN units u ON ra.unit_id = u.id
            JOIN properties p ON u.property_id = p.id
            WHERE ra.tenant_id = $1 AND ra.status = 'Active'
            ORDER BY ra.end_date ASC;
        `;
        const result = await pool.query(query, [tenant_id]);
        return result.rows;
    }

    static async updateStatus(id, status) {
        const query = 'UPDATE rental_agreements SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id;';
        const result = await pool.query(query, [status, id]);
        return result.rowCount > 0;
    }

    static async getAll() {
        const query = `
            SELECT ra.*, t.name as tenant_name, t.email as tenant_email, 
                   u.unit_number, p.address as property_address
            FROM rental_agreements ra
            JOIN tenants t ON ra.tenant_id = t.id
            JOIN units u ON ra.unit_id = u.id
            JOIN properties p ON u.property_id = p.id
            ORDER BY ra.start_date DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM rental_agreements WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }
}

export default RentalAgreementModel;