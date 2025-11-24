import { z } from "zod";

export const announcementSchema = z.object({
    propertyId: z.string().optional(), // Nullable in SQL
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;
