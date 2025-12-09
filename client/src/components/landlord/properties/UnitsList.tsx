import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { UnitDialog } from "./UnitDialog";
import { EditUnitDialog } from "./EditUnitDialog";
import { unitService, Unit } from "@/services/unit";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface UnitsListProps {
    propertyId: string;
    onRefresh?: () => void;
}

export function UnitsList({ propertyId, onRefresh }: UnitsListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editUnit, setEditUnit] = useState<Unit | null>(null);
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchUnits = async () => {
        setLoading(true);
        const response = await unitService.getByProperty(parseInt(propertyId, 10));
        if (response.data?.units) {
            setUnits(response.data.units);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUnits();
    }, [propertyId]);

    const handleEdit = (unit: Unit) => {
        setEditUnit(unit);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this unit?")) return;

        const response = await api.delete(`/units/${id}`);
        if (response.error) {
            toast({ title: "Error", description: response.error, variant: "destructive" });
        } else {
            toast({ title: "Unit Deleted", description: "The unit has been deleted successfully." });
            fetchUnits();
        }
    };

    const handleUnitCreated = () => {
        setIsDialogOpen(false);
        fetchUnits();
        toast({ title: "Unit Created", description: "Unit has been added successfully." });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Units</h3>
                <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Unit
                </Button>
            </div>

            <div className="grid gap-4">
                {units.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No units found for this property.</p>
                ) : (
                    units.map((unit) => (
                        <Card key={unit.id} className="bg-muted/50">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">Unit {unit.unit_number}</span>
                                        <Badge variant={unit.status === "Available" ? "secondary" : "default"}>
                                            {unit.status}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        ${Number(unit.rent_amount).toLocaleString()} • {unit.size ? `${unit.size} sq ft` : 'N/A'}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(unit)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(unit.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <UnitDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                propertyId={propertyId}
                onSuccess={handleUnitCreated}
            />

            <EditUnitDialog
                open={!!editUnit}
                onOpenChange={(open) => !open && setEditUnit(null)}
                unit={editUnit}
                onSuccess={fetchUnits}
            />
        </div>
    );
}
