import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { TenantsList } from "@/components/landlord/tenants/TenantsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { TenantDialog } from "@/components/landlord/tenants/TenantDialog";

const Tenants = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTenantAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tenants</h1>
            <p className="text-muted-foreground">Manage your tenants and lease agreements</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Button>
        </div>

        <TenantsList key={refreshKey} />
        <TenantDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleTenantAdded}
        />
      </div>
    </LandlordLayout>
  );
};

export default Tenants;
