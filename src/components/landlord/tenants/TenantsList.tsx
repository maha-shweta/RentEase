import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Building2, Calendar, Edit, Trash2 } from "lucide-react";
import { dummyTenants } from "@/dummy/data";

export function TenantsList() {
  const handleEdit = (id: string) => {
    console.log("Edit tenant:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete tenant:", id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {dummyTenants.map((tenant, index) => (
        <Card
          key={tenant.id}
          className="hover:shadow-medium transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-secondary" />
              </div>
              <Badge variant="default">{tenant.status}</Badge>
            </div>

            <h3 className="font-bold text-xl mb-4">{tenant.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{tenant.propertyName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Lease: {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Rent</span>
                <span className="text-2xl font-bold">${tenant.rentAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(tenant.id)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(tenant.id)}
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
