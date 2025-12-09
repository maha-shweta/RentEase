// Payment API service

import { api } from '@/lib/api';

export interface Payment {
    id: number;
    rental_agreement_id: number;
    amount: number;
    due_date?: string;
    paid_at?: string;
    payment_status: 'Paid' | 'Pending' | 'Overdue';
    late_fee?: number;
    created_at?: string;
    // Joined fields from getAll
    tenant_name?: string;
    unit_number?: string;
    property_address?: string;
}

export interface CreatePaymentData {
    rental_agreement_id: number;
    amount: number;
    due_date?: string;
    payment_status: 'Paid' | 'Pending' | 'Overdue';
    late_fee?: number;
}

export interface PaymentResponse {
    message: string;
    payment?: Payment;
    paymentId?: number;
}

export interface PaymentsListResponse {
    payments: Payment[];
}

export const paymentService = {
    getAll: async () => {
        return api.get<PaymentsListResponse>('/payments');
    },

    record: async (data: CreatePaymentData) => {
        return api.post<PaymentResponse>('/payments', data);
    },

    getByAgreement: async (agreementId: number) => {
        return api.get<PaymentsListResponse>(`/payments/agreement/${agreementId}`);
    },

    updateStatus: async (id: number, status: 'Paid' | 'Pending' | 'Overdue') => {
        return api.put<PaymentResponse>(`/payments/${id}/status`, { payment_status: status });
    },
};
