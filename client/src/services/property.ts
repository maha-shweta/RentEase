// Property API service

import { api } from '@/lib/api';

export interface Property {
    id: number;
    landlord_id: number;
    address: string;
    type: string;
    size?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreatePropertyData {
    landlord_id: number;
    address: string;
    type: string;
    size?: number;
}

export interface PropertyResponse {
    message: string;
    property?: Property;
    propertyId?: number;
}

export interface PropertiesListResponse {
    properties: Property[];
}

export const propertyService = {
    create: async (data: CreatePropertyData) => {
        return api.post<PropertyResponse>('/properties', data);
    },

    getByLandlord: async (landlordId: number) => {
        return api.get<PropertiesListResponse>(`/properties/landlord/${landlordId}`);
    },

    delete: async (id: number) => {
        return api.delete<{ message: string }>(`/properties/${id}`);
    },
};
