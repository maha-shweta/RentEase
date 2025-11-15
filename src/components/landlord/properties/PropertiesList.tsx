import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Edit, Trash2 } from "lucide-react";
import { dummyProperties } from "@/dummy/data";

export function PropertiesList() {
  const handleEdit = (id: string) => {
    console.log("Edit property:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete property:", id);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyProperties.map((property, index) => (
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
              <Badge variant={property.availability === "available" ? "secondary" : "default"}>
                {property.availability}
              </Badge>
            </div>

            <h3 className="font-bold text-lg mb-2">{property.name}</h3>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{property.address}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{property.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{property.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rent:</span>
                <span className="font-bold text-lg">${property.rentAmount}</span>
              </div>
              {property.tenantName && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tenant:</span>
                  <span className="font-medium">{property.tenantName}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(property.id)}
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
