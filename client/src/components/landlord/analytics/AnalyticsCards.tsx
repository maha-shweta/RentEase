import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, Building2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { propertyService } from "@/services/property";
import { tenantService } from "@/services/tenant";
import { paymentService } from "@/services/payment";
import { useAuth } from "@/contexts/AuthContext";

export function AnalyticsCards() {
  const { landlord } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    averageRent: 0,
    occupancyRate: 0,
    collectionRate: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!landlord?.id) return;
      setLoading(true);
      try {
        const [propertiesRes, tenantsRes, paymentsRes] = await Promise.all([
          propertyService.getByLandlord(landlord.id),
          tenantService.getAll(),
          paymentService.getAll(),
        ]);

        const properties = propertiesRes.data?.properties || [];
        const tenants = tenantsRes.data?.tenants || [];
        const payments = paymentsRes.data?.payments || [];

        const paidPayments = payments.filter(p => p.payment_status === 'Paid');
        const totalRevenue = paidPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        const averageRent = tenants.length > 0 ? totalRevenue / tenants.length : 0;
        const collectionRate = payments.length > 0
          ? (paidPayments.length / payments.length) * 100
          : 0;

        setStats({
          totalRevenue,
          averageRent: Math.round(averageRent),
          occupancyRate: properties.length > 0 ? 85 : 0, // Placeholder - would need units data
          collectionRate: Math.round(collectionRate * 10) / 10,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [landlord?.id]);

  const statItems = [
    { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: "+12.5%", trend: "up", icon: DollarSign, color: "text-success", bgColor: "bg-success/10" },
    { title: "Average Rent", value: `$${stats.averageRent.toLocaleString()}`, change: "+5.2%", trend: "up", icon: TrendingUp, color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Occupancy Rate", value: `${stats.occupancyRate}%`, change: "+2.1%", trend: "up", icon: Building2, color: "text-secondary", bgColor: "bg-secondary/10" },
    { title: "Collection Rate", value: `${stats.collectionRate}%`, change: "-1.3%", trend: "down", icon: Percent, color: "text-accent", bgColor: "bg-accent/10" },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 flex items-center justify-center h-28">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-medium transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
