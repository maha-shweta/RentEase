import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AnnouncementDialog } from "@/components/landlord/announcements/AnnouncementDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Announcements = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">No announcements posted yet.</p>
                        </CardContent>
                    </Card>
                </div>

                <AnnouncementDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </div>
        </LandlordLayout>
    );
};

export default Announcements;
