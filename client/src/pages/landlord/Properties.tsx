import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { PropertiesList } from "@/components/landlord/properties/PropertiesList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { PropertyDialog } from "@/components/landlord/properties/PropertyDialog";

const Properties = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePropertyCreated = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Properties</h1>
            <p className="text-muted-foreground">Manage your rental properties</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        <PropertiesList key={refreshKey} />
        <PropertyDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handlePropertyCreated}
        />
      </div>
    </LandlordLayout>
  );
};

export default Properties;
