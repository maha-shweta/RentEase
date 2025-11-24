import { z } from "zod";

export const utilitySchema = z.object({
  unitId: z.string().min(1, "Unit is required"),
  utilityType: z.string().min(1, "Utility type is required"), // Changed from enum to string or keep enum if strict
  amount: z.number().min(0, "Amount must be positive"),
  billMonth: z.string().min(1, "Bill month is required"), // Date
  dueDate: z.string().min(1, "Due date is required"), // Date
  paid: z.boolean().default(false),
  paidAt: z.string().optional(),
});

export type UtilityFormData = z.infer<typeof utilitySchema>;
