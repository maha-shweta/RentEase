import { z } from "zod";

export const unitSchema = z.object({
    propertyId: z.string().min(1, "Property is required"), // Will be parsed to Integer for backend
    unitNumber: z.string().min(1, "Unit number is required"),
    rentAmount: z.number().min(0, "Rent amount must be positive"),
    size: z.number().optional(),
    status: z.enum(["Available", "Occupied"]).default("Available"),
});

export type UnitFormData = z.infer<typeof unitSchema>;
