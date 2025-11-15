import { z } from "zod";

export const utilitySchema = z.object({
  tenantId: z.string().min(1, "Tenant selection is required"),
  propertyId: z.string().min(1, "Property selection is required"),
  utilityType: z.enum(["electricity", "water", "gas", "internet"]),
  amount: z.number().min(1, "Amount must be greater than 0"),
  billingDate: z.string().min(1, "Billing date is required"),
});

export type UtilityFormData = z.infer<typeof utilitySchema>;
