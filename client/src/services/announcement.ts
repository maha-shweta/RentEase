// Announcement API service

import { api } from '@/lib/api';

export interface Announcement {
    id: number;
    landlord_id: number;
    property_id?: number;
    title: string;
    message: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateAnnouncementData {
    landlord_id: number;
    property_id?: number;
    title: string;
    message: string;
}

export interface AnnouncementResponse {
    message: string;
    announcement?: Announcement;
    announcementId?: number;
}

export interface AnnouncementsListResponse {
    announcements: Announcement[];
}

export const announcementService = {
    create: async (data: CreateAnnouncementData) => {
        return api.post<AnnouncementResponse>('/announcements', data);
    },

    getByLandlord: async (landlordId: number) => {
        return api.get<AnnouncementsListResponse>(`/announcements/landlord/${landlordId}`);
    },

    getByUnit: async (unitId: number) => {
        return api.get<AnnouncementsListResponse>(`/announcements/unit/${unitId}`);
    },

    delete: async (id: number) => {
        return api.delete<{ message: string }>(`/announcements/${id}`);
    },
};
