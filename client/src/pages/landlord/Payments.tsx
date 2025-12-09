import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { PaymentsList } from "@/components/landlord/payments/PaymentsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { PaymentDialog } from "@/components/landlord/payments/PaymentDialog";

const Payments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePaymentSuccess = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payment Tracking</h1>
            <p className="text-muted-foreground">Monitor and manage rent payments</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>

        <PaymentsList key={refreshKey} onRefresh={handlePaymentSuccess} />
        <PaymentDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </LandlordLayout>
  );
};

export default Payments;
