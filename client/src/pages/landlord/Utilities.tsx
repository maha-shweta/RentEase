import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { UtilitiesList } from "@/components/landlord/utilities/UtilitiesList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { UtilityDialog } from "@/components/landlord/utilities/UtilityDialog";

const Utilities = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUtilitySuccess = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Utilities</h1>
            <p className="text-muted-foreground">Manage utility bills and payments</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Utility
          </Button>
        </div>

        <UtilitiesList key={refreshKey} onRefresh={handleUtilitySuccess} />
        <UtilityDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleUtilitySuccess}
        />
      </div>
    </LandlordLayout>
  );
};

export default Utilities;
