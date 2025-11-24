import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { dummyUnits } from "@/dummy/data";
import { useState } from "react";
import { UnitDialog } from "./UnitDialog";

interface UnitsListProps {
    propertyId: string;
}

export function UnitsList({ propertyId }: UnitsListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const units = dummyUnits.filter(u => u.propertyId === propertyId);

    const handleEdit = (id: string) => {
        console.log("Edit unit:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete unit:", id);
    };

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
                                        <span className="font-medium">Unit {unit.unitNumber}</span>
                                        <Badge variant={unit.status === "Available" ? "secondary" : "default"}>
                                            {unit.status}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        ${unit.rentAmount} • {unit.size} sq ft
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(unit.id)}>
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
            />
        </div>
    );
}
