import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementSchema, AnnouncementFormData } from "@/schemas/announcement";
import { useToast } from "@/hooks/use-toast";

interface AnnouncementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AnnouncementDialog({ open, onOpenChange }: AnnouncementDialogProps) {
    const { toast } = useToast();

    const form = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            propertyId: "",
            title: "",
            message: "",
        },
    });

    const onSubmit = (data: AnnouncementFormData) => {
        console.log("Create announcement:", data);
        toast({
            title: "Announcement Created",
            description: "The announcement has been successfully created.",
        });
        form.reset();
        onOpenChange(false);
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
                                    <FormLabel>Property ID (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Property ID" {...field} />
                                    </FormControl>
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
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Post Announcement</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
