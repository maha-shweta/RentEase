// Tenant API service

import { api } from '@/lib/api';

export interface Tenant {
    id: number;
    name: string;
    email: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TenantsListResponse {
    tenants: Tenant[];
}

export interface TenantResponse {
    message: string;
    tenant: Tenant;
}

export const tenantService = {
    getAll: async () => {
        return api.get<TenantsListResponse>('/tenants');
    },

    getById: async (id: number) => {
        return api.get<TenantResponse>(`/tenants/${id}`);
    },
};
