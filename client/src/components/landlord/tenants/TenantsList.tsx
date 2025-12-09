import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Phone, Loader2, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { tenantService, Tenant } from "@/services/tenant";
import { EditTenantDialog } from "./EditTenantDialog";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface TenantsListProps {
  refreshKey?: number;
}

export function TenantsList({ refreshKey }: TenantsListProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);
  const { toast } = useToast();

  const fetchTenants = useCallback(async () => {
    setIsLoading(true);
    const response = await tenantService.getAll();
    if (response.data?.tenants) {
      setTenants(response.data.tenants);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants, refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tenant?")) return;

    const response = await api.delete(`/tenants/${id}`);
    if (response.error) {
      toast({ title: "Error", description: response.error, variant: "destructive" });
    } else {
      toast({ title: "Tenant Deleted", description: "The tenant has been deleted successfully." });
      fetchTenants();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Tenants Yet</h3>
        <p className="text-muted-foreground">
          Tenants will appear here once they register or are added.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {tenants.map((tenant, index) => (
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
                <Badge variant="default">Active</Badge>
              </div>

              <h3 className="font-bold text-xl mb-4">{tenant.name}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{tenant.email}</span>
                </div>
                {tenant.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{tenant.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTenant(tenant)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditTenant(tenant)}
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

      {/* Tenant Details Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={(open) => !open && setSelectedTenant(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-4 rounded-full">
                  <User className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedTenant.name}</h3>
                  <Badge variant="default">Active Tenant</Badge>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedTenant.email}</p>
                  </div>
                </div>

                {selectedTenant.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedTenant.phone}</p>
                    </div>
                  </div>
                )}

                {selectedTenant.created_at && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">
                        {new Date(selectedTenant.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <Button className="w-full" onClick={() => setSelectedTenant(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <EditTenantDialog
        open={!!editTenant}
        onOpenChange={(open) => !open && setEditTenant(null)}
        tenant={editTenant}
        onSuccess={fetchTenants}
      />
    </>
  );
}
