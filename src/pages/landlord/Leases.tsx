import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { LeasesList } from "@/components/landlord/leases/LeasesList";

const Leases = () => {
  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lease Agreements</h1>
          <p className="text-muted-foreground">Manage rental agreements and contracts</p>
        </div>

        <LeasesList />
      </div>
    </LandlordLayout>
  );
};

export default Leases;
