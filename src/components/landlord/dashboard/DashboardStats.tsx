import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, DollarSign, AlertCircle } from "lucide-react";
import { dummyProperties, dummyTenants, dummyPayments } from "@/dummy/data";

export function DashboardStats() {
  const totalProperties = dummyProperties.length;
  const activeTenants = dummyTenants.length;
  const rentCollected = dummyPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const rentPending = dummyPayments
    .filter((p) => p.status === "due")
    .reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = dummyPayments
    .filter((p) => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Tenants",
      value: activeTenants,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Rent Collected",
      value: `$${rentCollected.toLocaleString()}`,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Rent Pending",
      value: `$${rentPending.toLocaleString()}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Overdue Amount",
      value: `$${overdueAmount.toLocaleString()}`,
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => (
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
