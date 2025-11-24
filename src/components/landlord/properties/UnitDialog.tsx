import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitSchema, UnitFormData } from "@/schemas/unit";
import { useToast } from "@/hooks/use-toast";

interface UnitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId?: string; // Optional pre-selected property
}

export function UnitDialog({ open, onOpenChange, propertyId }: UnitDialogProps) {
    const { toast } = useToast();

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

    const onSubmit = (data: UnitFormData) => {
        console.log("Create unit:", data);
        toast({
            title: "Unit Added",
            description: "The unit has been successfully added.",
        });
        form.reset();
        onOpenChange(false);
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
                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Property ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Unit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
