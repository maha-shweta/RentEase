import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UnitsList } from "./UnitsList";

interface PropertyUnitsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId: string;
    propertyName: string;
}

export function PropertyUnitsDialog({ open, onOpenChange, propertyId, propertyName }: PropertyUnitsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage Units - {propertyName}</DialogTitle>
                    <DialogDescription>View and manage units for this property</DialogDescription>
                </DialogHeader>

                <UnitsList propertyId={propertyId} />
            </DialogContent>
        </Dialog>
    );
}
