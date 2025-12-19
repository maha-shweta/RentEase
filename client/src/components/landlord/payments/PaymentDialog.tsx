import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface RentalAgreement {
    id: number;
    tenant_id: number;
    unit_id: number;
    rent_amount: string | number;
    status: string;
    tenant_name?: string;
    unit_number?: string;
    property_address?: string;
}

const paymentSchema = z.object({
    rentalAgreementId: z.string().min(1, "Please select a tenant/lease"),
    amount: z.number().min(1, "Amount must be greater than 0"),
    paymentDate: z.string().min(1, "Payment date is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    notes: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function PaymentDialog({ open, onOpenChange, onSuccess }: PaymentDialogProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [rentalAgreements, setRentalAgreements] = useState<RentalAgreement[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            rentalAgreementId: "",
            amount: 0,
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod: "bank_transfer",
            notes: "",
        },
    });

    // Fetch rental agreements with tenant and unit info
    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            const response = await api.get('/rental-agreements');
            if (response.data?.agreements) {
                // Only show active agreements
                setRentalAgreements(response.data.agreements.filter((a: RentalAgreement) => a.status === 'Active'));
            }
            setLoadingData(false);
        };
        if (open) fetchData();
    }, [open]);

    // Auto-fill amount when rental agreement is selected
    const selectedAgreementId = form.watch("rentalAgreementId");
    useEffect(() => {
        const selected = rentalAgreements.find(a => String(a.id) === selectedAgreementId);
        if (selected) {
            form.setValue("amount", Number(selected.rent_amount));
        }
    }, [selectedAgreementId, rentalAgreements, form]);

    const onSubmit = async (data: PaymentFormData) => {
        setIsLoading(true);
        try {
            const response = await api.post('/payments', {
                rental_agreement_id: parseInt(data.rentalAgreementId),
                amount: data.amount,
                payment_date: data.paymentDate,
                payment_method: data.paymentMethod,
                notes: data.notes || undefined,
            });

            if (response.error) {
                toast({ title: "Error", description: response.error, variant: "destructive" });
            } else {
                toast({ title: "Payment Recorded", description: "The payment has been successfully recorded." });
                form.reset();
                onOpenChange(false);
                onSuccess?.();
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to record payment.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                    <DialogDescription>Record a new rent payment from a tenant</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Tenant/Lease Dropdown */}
                        <FormField
                            control={form.control}
                            name="rentalAgreementId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tenant / Lease</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={loadingData ? "Loading..." : "Select tenant"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {rentalAgreements.length === 0 ? (
                                                <SelectItem value="none" disabled>No active leases</SelectItem>
                                            ) : (
                                                rentalAgreements.map((agreement) => (
                                                    <SelectItem key={agreement.id} value={String(agreement.id)}>
                                                        {agreement.tenant_name || `Tenant #${agreement.tenant_id}`} - BDT {Number(agreement.rent_amount).toLocaleString()}/mo
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount (BDT)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="paymentDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="check">Check</SelectItem>
                                            <SelectItem value="card">Card</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., December rent" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Record Payment
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
