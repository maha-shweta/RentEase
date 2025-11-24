import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaseSchema, LeaseFormData } from "@/schemas/lease";
import { useToast } from "@/hooks/use-toast";

interface LeaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LeaseDialog({ open, onOpenChange }: LeaseDialogProps) {
    const { toast } = useToast();

    const form = useForm<LeaseFormData>({
        resolver: zodResolver(leaseSchema),
        defaultValues: {
            tenantId: "",
            unitId: "",
            startDate: "",
            endDate: "",
            rentAmount: 0,
            depositAmount: 0,
            status: "Active",
        },
    });

    const onSubmit = (data: LeaseFormData) => {
        console.log("Create lease:", data);
        toast({
            title: "Lease Created",
            description: "The lease agreement has been successfully created.",
        });
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Lease</DialogTitle>
                    <DialogDescription>Create a rental agreement</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="tenantId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tenant ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tenant ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="unitId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Unit ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                name="depositAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deposit Amount ($)</FormLabel>
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
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Terminated">Terminated</SelectItem>
                                            <SelectItem value="Expired">Expired</SelectItem>
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
                            <Button type="submit">Create Lease</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
