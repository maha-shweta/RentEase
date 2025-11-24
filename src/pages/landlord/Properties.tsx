import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { PropertiesList } from "@/components/landlord/properties/PropertiesList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PropertyDialog } from "@/components/landlord/properties/PropertyDialog";

const Properties = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        <PropertiesList />
        <PropertyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </LandlordLayout>
  );
};

export default Properties;
