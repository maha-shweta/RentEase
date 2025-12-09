import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const occupancyData = [
  { month: "Jan", rate: 85 },
  { month: "Feb", rate: 88 },
  { month: "Mar", rate: 82 },
  { month: "Apr", rate: 90 },
  { month: "May", rate: 92 },
  { month: "Jun", rate: 95 },
  { month: "Jul", rate: 93 },
  { month: "Aug", rate: 95 },
  { month: "Sep", rate: 90 },
  { month: "Oct", rate: 93 },
  { month: "Nov", rate: 95 },
  { month: "Dec", rate: 97 },
];

export function OccupancyChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
        <CardDescription>Property occupancy over the past year</CardDescription>
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
