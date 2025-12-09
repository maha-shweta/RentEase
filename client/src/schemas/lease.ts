import { z } from "zod";

export const leaseSchema = z.object({
    tenantId: z.string().min(1, "Tenant is required"),
    unitId: z.string().min(1, "Unit is required"),
    startDate: z.string().min(1, "Start date is required"), // Date string
    endDate: z.string().min(1, "End date is required"), // Date string
    rentAmount: z.number().min(0, "Rent amount must be positive"),
    depositAmount: z.number().optional(),
    status: z.enum(["Active", "Terminated", "Expired"]).default("Active"),
});

export type LeaseFormData = z.infer<typeof leaseSchema>;
