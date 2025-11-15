import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { PaymentsList } from "@/components/landlord/payments/PaymentsList";

const Payments = () => {
  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payment Tracking</h1>
          <p className="text-muted-foreground">Monitor and manage rent payments</p>
        </div>

        <PaymentsList />
      </div>
    </LandlordLayout>
  );
};

export default Payments;
