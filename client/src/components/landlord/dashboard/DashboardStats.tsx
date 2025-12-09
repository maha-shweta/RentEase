import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, DollarSign, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { propertyService } from "@/services/property";
import { tenantService } from "@/services/tenant";
import { paymentService } from "@/services/payment";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardStats() {
  const { landlord } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeTenants: 0,
    rentCollected: 0,
    rentPending: 0,
    overdueAmount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
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

        const rentCollected = payments
          .filter((p) => p.payment_status === "Paid")
          .reduce((sum, p) => sum + Number(p.amount), 0);
        const rentPending = payments
          .filter((p) => p.payment_status === "Pending")
          .reduce((sum, p) => sum + Number(p.amount), 0);
        const overdueAmount = payments
          .filter((p) => p.payment_status === "Overdue")
          .reduce((sum, p) => sum + Number(p.amount), 0);

        setStats({
          totalProperties: properties.length,
          activeTenants: tenants.length,
          rentCollected,
          rentPending,
          overdueAmount,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [landlord?.id]);

  const statItems = [
    { title: "Total Properties", value: stats.totalProperties, icon: Building2, color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Active Tenants", value: stats.activeTenants, icon: Users, color: "text-secondary", bgColor: "bg-secondary/10" },
    { title: "Rent Collected", value: `$${stats.rentCollected.toLocaleString()}`, icon: DollarSign, color: "text-success", bgColor: "bg-success/10" },
    { title: "Rent Pending", value: `$${stats.rentPending.toLocaleString()}`, icon: DollarSign, color: "text-accent", bgColor: "bg-accent/10" },
    { title: "Overdue Amount", value: `$${stats.overdueAmount.toLocaleString()}`, icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 flex items-center justify-center h-24">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {statItems.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-medium transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
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
