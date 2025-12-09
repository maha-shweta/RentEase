import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitSchema, UnitFormData } from "@/schemas/unit";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { unitService } from "@/services/unit";
import { propertyService, Property } from "@/services/property";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface UnitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId?: string;
    onSuccess?: () => void;
}

export function UnitDialog({ open, onOpenChange, propertyId, onSuccess }: UnitDialogProps) {
    const { toast } = useToast();
    const { landlord } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loadingProperties, setLoadingProperties] = useState(false);

    const form = useForm<UnitFormData>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            propertyId: propertyId || "",
            unitNumber: "",
            rentAmount: 0,
            size: 0,
            status: "Available",
        },
    });

    // Fetch properties for dropdown
    useEffect(() => {
        const fetchProperties = async () => {
            if (!landlord?.id || propertyId) return; // Skip if property already provided
            setLoadingProperties(true);
            const response = await propertyService.getByLandlord(landlord.id);
            if (response.data?.properties) {
                setProperties(response.data.properties);
            }
            setLoadingProperties(false);
        };
        if (open) fetchProperties();
    }, [open, landlord?.id, propertyId]);

    const onSubmit = async (data: UnitFormData) => {
        setIsLoading(true);
        try {
            const response = await unitService.create({
                property_id: parseInt(data.propertyId, 10),
                unit_number: data.unitNumber,
                rent_amount: data.rentAmount,
                size: data.size,
                status: data.status,
            });

            if (response.error) {
                toast({ title: "Error", description: response.error, variant: "destructive" });
            } else {
                toast({ title: "Unit Added", description: "The unit has been successfully added." });
                form.reset();
                onOpenChange(false);
                onSuccess?.();
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to add unit.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                    <DialogDescription>Add a unit to a property</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Property Dropdown - only show if no propertyId provided */}
                        {!propertyId && (
                            <FormField
                                control={form.control}
                                name="propertyId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Property</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={loadingProperties ? "Loading..." : "Select a property"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {properties.map((property) => (
                                                    <SelectItem key={property.id} value={String(property.id)}>
                                                        {property.address} ({property.type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

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
                                        <FormLabel>Rent Amount ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1500"
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
                                                placeholder="800"
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                Add Unit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
