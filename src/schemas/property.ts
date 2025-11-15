import { z } from "zod";

export const propertySchema = z.object({
  name: z.string().min(2, "Property name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  type: z.enum(["house", "apartment", "room", "commercial"]),
  rentAmount: z.number().min(1, "Rent amount must be greater than 0"),
  size: z.string().min(1, "Size is required"),
  availability: z.enum(["available", "occupied"]),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
