import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, Building2, Users } from "lucide-react";
import { dummyPayments, dummyProperties, dummyTenants } from "@/dummy/data";

export function AnalyticsCards() {
  const totalRevenue = dummyPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const averageRent = totalRevenue / (dummyTenants.length || 1);
  
  const occupancyRate = ((dummyProperties.filter((p) => p.availability === "occupied").length / dummyProperties.length) * 100).toFixed(1);
  
  const collectionRate = ((dummyPayments.filter((p) => p.status === "paid").length / dummyPayments.length) * 100).toFixed(1);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Average Rent",
      value: `$${Math.round(averageRent).toLocaleString()}`,
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      change: "+2.1%",
      trend: "up",
      icon: Building2,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Collection Rate",
      value: `${collectionRate}%`,
      change: "-1.3%",
      trend: "down",
      icon: Percent,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
