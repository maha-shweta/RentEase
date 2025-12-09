// Unit API service

import { api } from '@/lib/api';

export interface Unit {
    id: number;
    property_id: number;
    unit_number: string;
    rent_amount: number;
    size?: number;
    status: 'Available' | 'Occupied';
    created_at?: string;
    updated_at?: string;
}

export interface CreateUnitData {
    property_id: number;
    unit_number: string;
    rent_amount: number;
    size?: number;
    status?: 'Available' | 'Occupied';
}

export interface UnitResponse {
    message: string;
    unit?: Unit;
    unitId?: number;
}

export interface UnitsListResponse {
    units: Unit[];
}

export const unitService = {
    create: async (data: CreateUnitData) => {
        return api.post<UnitResponse>('/units', data);
    },

    getAll: async () => {
        return api.get<UnitsListResponse>('/units');
    },

    getByProperty: async (propertyId: number) => {
        return api.get<UnitsListResponse>(`/units/property/${propertyId}`);
    },

    updateStatus: async (id: number, status: 'Available' | 'Occupied') => {
        return api.put<UnitResponse>(`/units/${id}/status`, { status });
    },
};
