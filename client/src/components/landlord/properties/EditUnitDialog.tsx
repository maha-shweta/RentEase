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
import { Unit } from "@/services/unit";
import { Loader2 } from "lucide-react";

const editUnitSchema = z.object({
    unitNumber: z.string().min(1, "Unit number is required"),
    rentAmount: z.number().min(0, "Rent amount must be positive"),
    size: z.number().optional(),
    status: z.enum(["Available", "Occupied"]),
});

type EditUnitFormData = z.infer<typeof editUnitSchema>;

interface EditUnitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: Unit | null;
    onSuccess?: () => void;
}

export function EditUnitDialog({ open, onOpenChange, unit, onSuccess }: EditUnitDialogProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<EditUnitFormData>({
        resolver: zodResolver(editUnitSchema),
        defaultValues: {
            unitNumber: "",
            rentAmount: 0,
            size: 0,
            status: "Available",
        },
    });

    useEffect(() => {
        if (unit) {
            form.reset({
                unitNumber: unit.unit_number,
                rentAmount: Number(unit.rent_amount),
                size: unit.size || 0,
                status: unit.status as "Available" | "Occupied",
            });
        }
    }, [unit, form]);

    const onSubmit = async (data: EditUnitFormData) => {
        if (!unit) return;

        setIsLoading(true);

        const response = await api.put(`/units/${unit.id}`, {
            unit_number: data.unitNumber,
            rent_amount: data.rentAmount,
            size: data.size || undefined,
            status: data.status,
        });

        setIsLoading(false);

        if (response.error) {
            toast({ title: "Error", description: response.error, variant: "destructive" });
            return;
        }

        toast({ title: "Unit Updated", description: "The unit has been successfully updated." });
        onOpenChange(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Unit</DialogTitle>
                    <DialogDescription>Update the unit details below</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="unitNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="A-101" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="rentAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rent Amount (BDT)</FormLabel>
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
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size (sq ft)</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Occupied">Occupied</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
