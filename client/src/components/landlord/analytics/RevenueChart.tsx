import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { paymentService, Payment } from "@/services/payment";
import { Loader2 } from "lucide-react";

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export function RevenueChart() {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<MonthlyRevenue[]>([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const response = await paymentService.getAll();
        const payments = response.data?.payments || [];
        
        // Filter only paid payments
        const paidPayments = payments.filter((p: Payment) => p.payment_status === 'Paid');
        
        // Group by month
        const monthlyData: { [key: string]: number } = {};
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Initialize all months with 0
        monthNames.forEach(month => {
          monthlyData[month] = 0;
        });
        
        // Sum payments by month
        paidPayments.forEach((payment: Payment) => {
          const date = payment.paid_at ? new Date(payment.paid_at) : new Date(payment.created_at || Date.now());
          const monthIndex = date.getMonth();
          const monthName = monthNames[monthIndex];
          monthlyData[monthName] += Number(payment.amount);
        });
        
        // Convert to array format for chart
        const chartData: MonthlyRevenue[] = monthNames.map(month => ({
          month,
          revenue: monthlyData[month]
        }));
        
        setRevenueData(chartData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRevenueData();
  }, []);

  if (loading) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue over the past year</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly revenue over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`BDT ${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
