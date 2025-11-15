import { z } from "zod";

export const tenantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  propertyId: z.string().min(1, "Property selection is required"),
  rentAmount: z.number().min(1, "Rent amount must be greater than 0"),
  leaseDuration: z.number().min(1, "Lease duration must be at least 1 month"),
  leaseStart: z.string().min(1, "Lease start date is required"),
});

export type TenantFormData = z.infer<typeof tenantSchema>;
