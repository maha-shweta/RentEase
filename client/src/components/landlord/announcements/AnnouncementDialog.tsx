import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementSchema, AnnouncementFormData } from "@/schemas/announcement";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { announcementService } from "@/services/announcement";
import { propertyService, Property } from "@/services/property";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface AnnouncementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function AnnouncementDialog({ open, onOpenChange, onSuccess }: AnnouncementDialogProps) {
    const { toast } = useToast();
    const { landlord } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loadingProperties, setLoadingProperties] = useState(false);

    const form = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            propertyId: "",
            title: "",
            message: "",
        },
    });

    // Fetch properties for dropdown
    useEffect(() => {
        const fetchProperties = async () => {
            if (!landlord?.id) return;
            setLoadingProperties(true);
            const response = await propertyService.getByLandlord(landlord.id);
            if (response.data?.properties) {
                setProperties(response.data.properties);
            }
            setLoadingProperties(false);
        };
        if (open) fetchProperties();
    }, [open, landlord?.id]);

    const onSubmit = async (data: AnnouncementFormData) => {
        if (!landlord?.id) {
            toast({
                title: "Error",
                description: "You must be logged in to create an announcement.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        const response = await announcementService.create({
            landlord_id: landlord.id,
            property_id: data.propertyId && data.propertyId !== "all" ? parseInt(data.propertyId) : undefined,
            title: data.title,
            message: data.message,
        });

        setIsLoading(false);

        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Announcement Created",
            description: "The announcement has been successfully created.",
        });

        form.reset();
        onOpenChange(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                    <DialogDescription>Send an announcement to tenants</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property (Optional)</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={loadingProperties ? "Loading..." : "All Properties (General)"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="all">All Properties (General)</SelectItem>
                                            {properties.map((property) => (
                                                <SelectItem key={property.id} value={String(property.id)}>
                                                    {property.address}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Maintenance Notice" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Please be advised that..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
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
                                Post Announcement
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
