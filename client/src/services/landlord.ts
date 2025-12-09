// Landlord API service

import { api } from '@/lib/api';

export interface Landlord {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

export interface LoginResponse {
    message: string;
    landlord: Landlord;
    token: string;
}

export interface RegisterResponse {
    message: string;
    landlord: Landlord;
}

export interface ProfileResponse {
    message: string;
    landlord: Landlord;
}

export const landlordService = {
    login: async (email: string, password: string) => {
        return api.post<LoginResponse>('/landlords/login', { email, password });
    },

    register: async (data: { name: string; email: string; password: string; phone?: string }) => {
        return api.post<RegisterResponse>('/landlords/register', data);
    },

    getProfile: async (id: number) => {
        return api.get<ProfileResponse>(`/landlords/${id}/profile`);
    },

    updateProfile: async (id: number, data: Partial<Landlord>) => {
        return api.put<ProfileResponse>(`/landlords/${id}/profile`, data);
    },
};
