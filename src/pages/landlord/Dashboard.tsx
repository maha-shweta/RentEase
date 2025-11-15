import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { DashboardStats } from "@/components/landlord/dashboard/DashboardStats";
import { RentTrendsChart } from "@/components/landlord/dashboard/RentTrendsChart";
import { PaymentStatusChart } from "@/components/landlord/dashboard/PaymentStatusChart";
import { UpcomingRent } from "@/components/landlord/dashboard/UpcomingRent";

const Dashboard = () => {
  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your rental portfolio</p>
        </div>

        <DashboardStats />

        <div className="grid lg:grid-cols-2 gap-6">
          <RentTrendsChart />
          <PaymentStatusChart />
        </div>

        <UpcomingRent />
      </div>
    </LandlordLayout>
  );
};

export default Dashboard;
