import { LandlordLayout } from "@/components/landlord/LandlordLayout";
import { RevenueChart } from "@/components/landlord/analytics/RevenueChart";
import { OccupancyChart } from "@/components/landlord/analytics/OccupancyChart";
import { AnalyticsCards } from "@/components/landlord/analytics/AnalyticsCards";

const Analytics = () => {
  return (
    <LandlordLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Insights and performance metrics</p>
        </div>

        <AnalyticsCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueChart />
          <OccupancyChart />
        </div>
      </div>
    </LandlordLayout>
  );
};

export default Analytics;
