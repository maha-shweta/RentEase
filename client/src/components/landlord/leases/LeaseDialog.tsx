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
import { tenantService, Tenant } from "@/services/tenant";
import { unitService, Unit } from "@/services/unit";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

const leaseSchema = z.object({
    tenantId: z.string().min(1, "Tenant is required"),
    unitId: z.string().min(1, "Unit is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    rentAmount: z.number().min(1, "Rent amount is required"),
    depositAmount: z.number().min(0, "Deposit amount is required"),
});

type LeaseFormData = z.infer<typeof leaseSchema>;

interface LeaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function LeaseDialog({ open, onOpenChange, onSuccess }: LeaseDialogProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [units, setUnits] = useState<(Unit & { property_address?: string })[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    const form = useForm<LeaseFormData>({
        resolver: zodResolver(leaseSchema),
        defaultValues: {
            tenantId: "",
            unitId: "",
            startDate: "",
            endDate: "",
            rentAmount: 0,
            depositAmount: 0,
        },
    });

    // Fetch tenants and units for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            const [tenantsRes, unitsRes] = await Promise.all([
                tenantService.getAll(),
                unitService.getAll(),
            ]);
            if (tenantsRes.data?.tenants) {
                setTenants(tenantsRes.data.tenants);
            }
            if (unitsRes.data?.units) {
                // Show all units (including occupied ones for reassignment)
                setUnits(unitsRes.data.units);
            }
            setLoadingData(false);
        };
        if (open) fetchData();
    }, [open]);

    // Auto-fill rent amount when unit is selected
    const selectedUnitId = form.watch("unitId");
    useEffect(() => {
        const selectedUnit = units.find(u => String(u.id) === selectedUnitId);
        if (selectedUnit) {
            form.setValue("rentAmount", Number(selectedUnit.rent_amount));
            form.setValue("depositAmount", Number(selectedUnit.rent_amount));
        }
    }, [selectedUnitId, units, form]);

    const onSubmit = async (data: LeaseFormData) => {
        setIsLoading(true);
        try {
            const response = await api.post('/rental-agreements', {
                tenant_id: parseInt(data.tenantId),
                unit_id: parseInt(data.unitId),
                start_date: data.startDate,
                end_date: data.endDate,
                rent_amount: data.rentAmount,
                deposit_amount: data.depositAmount,
                status: 'Active',
            });

            if (response.error) {
                toast({ title: "Error", description: response.error, variant: "destructive" });
            } else {
                toast({ title: "Lease Created", description: "The lease agreement has been created successfully." });
                form.reset();
                onOpenChange(false);
                onSuccess?.();
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to create lease.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Lease Agreement</DialogTitle>
                    <DialogDescription>Create a new rental agreement</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Tenant Dropdown */}
                        <FormField
                            control={form.control}
                            name="tenantId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tenant</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={loadingData ? "Loading..." : "Select a tenant"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tenants.map((tenant) => (
                                                <SelectItem key={tenant.id} value={String(tenant.id)}>
                                                    {tenant.name} ({tenant.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Unit Dropdown */}
                        <FormField
                            control={form.control}
                            name="unitId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={loadingData ? "Loading..." : "Select a unit"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {units.length === 0 ? (
                                                <SelectItem value="none" disabled>No available units</SelectItem>
                                            ) : (
                                                units.map((unit) => (
                                                    <SelectItem key={unit.id} value={String(unit.id)}>
                                                        {unit.property_address} - Unit {unit.unit_number} (BDT {unit.rent_amount}/mo)
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Amounts */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="rentAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Rent (BDT)</FormLabel>
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
                                name="depositAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Security Deposit (BDT)</FormLabel>
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
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Lease
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
