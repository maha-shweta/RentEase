import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { unitService, Unit } from "@/services/unit";
import { Loader2 } from "lucide-react";

interface OccupancyData {
  month: string;
  rate: number;
}

export function OccupancyChart() {
  const [loading, setLoading] = useState(true);
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([]);
  const [currentRate, setCurrentRate] = useState(0);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      setLoading(true);
      try {
        const response = await unitService.getAll();
        const units = response.data?.units || [];
        
        const totalUnits = units.length;
        const occupiedUnits = units.filter((u: Unit) => u.status === 'Occupied').length;
        const rate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
        
        setCurrentRate(rate);
        
        // Generate last 12 months showing current rate (since historical data isn't available)
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        
        // Show the current rate across all months (we don't have historical data)
        // In a real app, you'd track historical occupancy data
        const chartData: OccupancyData[] = monthNames.map((month, index) => ({
          month,
          rate: index <= currentMonth ? rate : 0
        }));
        
        setOccupancyData(chartData);
      } catch (error) {
        console.error("Error fetching occupancy data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOccupancyData();
  }, []);

  if (loading) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Occupancy Rate</CardTitle>
          <CardDescription>Property occupancy over the past year</CardDescription>
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
        <CardTitle>Occupancy Rate</CardTitle>
        <CardDescription>
          Current occupancy: {currentRate}% ({occupancyData.length > 0 ? 'based on unit status' : 'no units found'})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, 'Occupancy Rate']}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
