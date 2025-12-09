import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { paymentService } from "@/services/payment";
import { Loader2 } from "lucide-react";

const COLORS = ["hsl(var(--success))", "hsl(var(--accent))", "hsl(var(--destructive))"];

export function PaymentStatusChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await paymentService.getAll();
      if (response.data?.payments) {
        const payments = response.data.payments;
        const paid = payments.filter(p => p.payment_status === 'Paid').length;
        const pending = payments.filter(p => p.payment_status === 'Pending').length;
        const overdue = payments.filter(p => p.payment_status === 'Overdue').length;
        setData([
          { name: "Paid", value: paid },
          { name: "Pending", value: pending },
          { name: "Overdue", value: overdue },
        ]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Payment Status</CardTitle></CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No payment data</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
