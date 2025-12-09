import { z } from "zod";

export const propertySchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  type: z.enum(["house", "apartment", "room", "commercial"]),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
