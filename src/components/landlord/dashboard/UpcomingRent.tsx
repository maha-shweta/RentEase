import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyPayments } from "@/dummy/data";
import { Calendar } from "lucide-react";

export function UpcomingRent() {
  const upcomingPayments = dummyPayments
    .filter((p) => p.status === "due" || p.status === "overdue")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Upcoming Rent Due</CardTitle>
        <CardDescription>Payments expected in the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{payment.tenantName}</p>
                  <p className="text-sm text-muted-foreground">{payment.propertyName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${payment.amount.toLocaleString()}</p>
                <div className="flex items-center gap-2 justify-end">
                  <Badge
                    variant={payment.status === "overdue" ? "destructive" : "secondary"}
                  >
                    {payment.status === "overdue" ? "Overdue" : "Due"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
