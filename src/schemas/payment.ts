import { z } from "zod";

export const paymentSchema = z.object({
    rentalAgreementId: z.string().min(1, "Rental agreement is required"),
    amount: z.number().min(0, "Amount must be positive"),
    dueDate: z.string().optional(), // Date string
    paidAt: z.string().optional(), // Timestamp string
    paymentStatus: z.enum(["Paid", "Pending", "Overdue"]),
    lateFee: z.number().default(0),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
