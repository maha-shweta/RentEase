import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { LeasesList } from "@/components/landlord/leases/LeasesList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { LeaseDialog } from "@/components/landlord/leases/LeaseDialog";

const Leases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lease Agreements</h1>
            <p className="text-muted-foreground">Manage rental agreements and contracts</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lease
          </Button>
        </div>

        <LeasesList />
        <LeaseDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </LandlordLayout>
  );
};

export default Leases;
