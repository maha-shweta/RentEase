import { z } from "zod";

export const propertySchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  type: z.string().min(1, "Type is required"), // Changed from enum to string to match VARCHAR(50) or keep enum if UI restricts
  size: z.number().min(1, "Size must be greater than 0"), // Changed to number for DECIMAL
  // Removed rentAmount and availability as they belong to units now
});

export type PropertyFormData = z.infer<typeof propertySchema>;
