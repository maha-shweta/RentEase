import PaymentModel from '../models/PaymentModel.js';

const recordPayment = async (req, res) => {
    // Accept both old format (due_date, payment_status) and new format (payment_date, payment_method)
    const { rental_agreement_id, amount, due_date, payment_date, paid_at, payment_status, payment_method, late_fee, notes } = req.body;

    // Use payment_date if due_date not provided, default status to 'Paid' for direct payments
    const effectiveDueDate = due_date || payment_date;
    const effectiveStatus = payment_status || 'Paid';
    const effectivePaidAt = paid_at || payment_date;

    if (!rental_agreement_id || amount === undefined || !effectiveDueDate) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    try {
        const paymentId = await PaymentModel.create({
            rental_agreement_id,
            amount,
            due_date: effectiveDueDate,
            paid_at: effectivePaidAt,
            payment_status: effectiveStatus,
            late_fee: late_fee || 0
        });
        res.status(201).json({ message: "Payment recorded successfully!", paymentId });
    } catch (error) {
        console.error("Record payment error:", error);
        if (error.code === '23503') return res.status(403).json({ error: "Invalid rental agreement ID." });
        res.status(500).json({ error: "Failed to record payment." });
    }
};

const getAgreementPayments = async (req, res) => {
    const { agreementId } = req.params;
    try {
        const payments = await PaymentModel.getByAgreementId(parseInt(agreementId, 10));
        res.status(200).json({ payments });
    } catch (error) {
        console.error("Get payments error:", error);
        res.status(500).json({ error: "Failed to retrieve payments." });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.getAll();
        res.status(200).json({ payments });
    } catch (error) {
        console.error("Get all payments error:", error);
        res.status(500).json({ error: "Failed to retrieve payments." });
    }
};

const updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { payment_status, paid_at } = req.body;
    if (!payment_status || !['Paid', 'Pending', 'Overdue'].includes(payment_status)) {
        return res.status(400).json({ error: "Invalid or missing payment status." });
    }
    try {
        const success = await PaymentModel.updateStatus(parseInt(id, 10), payment_status, paid_at);
        if (success) res.status(200).json({ message: `Payment ${id} status updated to ${payment_status}.` });
        else res.status(404).json({ message: `Payment ${id} not found.` });
    } catch (error) {
        console.error("Update payment status error:", error);
        res.status(500).json({ error: "Failed to update payment status." });
    }
};

export { recordPayment, getAgreementPayments, getAllPayments, updatePaymentStatus };