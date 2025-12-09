import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Edit, Trash2, LayoutGrid, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PropertyUnitsDialog } from "./PropertyUnitsDialog";
import { EditPropertyDialog } from "./EditPropertyDialog";
import { propertyService, Property } from "@/services/property";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function PropertiesList() {
  const [selectedProperty, setSelectedProperty] = useState<{ id: number; address: string } | null>(null);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { landlord } = useAuth();
  const { toast } = useToast();

  const fetchProperties = async () => {
    if (!landlord?.id) return;

    setIsLoading(true);
    const response = await propertyService.getByLandlord(landlord.id);

    if (response.data?.properties) {
      setProperties(response.data.properties);
    } else if (response.error) {
      console.error("Failed to fetch properties:", response.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [landlord?.id]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    const response = await propertyService.delete(id);
    if (response.error) {
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Property Deleted",
        description: "The property has been deleted successfully.",
      });
      fetchProperties();
    }
  };

  const handleEdit = (property: Property) => {
    setEditProperty(property);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Properties Yet</h3>
        <p className="text-muted-foreground">
          Add your first property to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <Card
            key={property.id}
            className="hover:shadow-medium transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">
                  {property.type}
                </Badge>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{property.address}</span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => setSelectedProperty({ id: property.id, address: property.address })}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Manage Units
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(property)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProperty && (
        <PropertyUnitsDialog
          open={!!selectedProperty}
          onOpenChange={(open) => !open && setSelectedProperty(null)}
          propertyId={String(selectedProperty.id)}
          propertyName={selectedProperty.address}
        />
      )}

      <EditPropertyDialog
        open={!!editProperty}
        onOpenChange={(open) => !open && setEditProperty(null)}
        property={editProperty}
        onSuccess={fetchProperties}
      />
    </>
  );
}
