import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AnnouncementDialog } from "@/components/landlord/announcements/AnnouncementDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { announcementService, Announcement } from "@/services/announcement";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Announcements = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { landlord } = useAuth();
    const { toast } = useToast();

    const fetchAnnouncements = useCallback(async () => {
        if (!landlord?.id) return;

        setIsLoading(true);
        const response = await announcementService.getByLandlord(landlord.id);

        if (response.data?.announcements) {
            setAnnouncements(response.data.announcements);
        }
        setIsLoading(false);
    }, [landlord?.id]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return;

        const response = await announcementService.delete(id);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Announcement Deleted",
                description: "The announcement has been deleted.",
            });
            fetchAnnouncements();
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <LandlordLayout>
            <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
                        <p className="text-muted-foreground">Broadcast messages to your tenants</p>
                    </div>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Announcement
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : announcements.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Announcements Yet</h3>
                            <p className="text-muted-foreground text-sm">
                                Create your first announcement to broadcast to tenants.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {announcements.map((announcement) => (
                            <Card key={announcement.id}>
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle>{announcement.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(announcement.created_at)}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(announcement.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{announcement.message}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <AnnouncementDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onSuccess={fetchAnnouncements}
                />
            </div>
        </LandlordLayout>
    );
};

export default Announcements;
