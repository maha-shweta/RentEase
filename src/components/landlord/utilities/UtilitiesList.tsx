import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Zap, Droplet, Flame, Wifi } from "lucide-react";
import { dummyUtilities } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";

export function UtilitiesList() {
  const { toast } = useToast();

  const handleGeneratePDF = (id: string) => {
    console.log("Generate PDF for utility:", id);
    toast({
      title: "PDF Generated",
      description: "Utility bill has been generated successfully.",
    });
  };

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case "electricity":
        return <Zap className="h-4 w-4 text-accent" />;
      case "water":
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case "gas":
        return <Flame className="h-4 w-4 text-destructive" />;
      case "internet":
        return <Wifi className="h-4 w-4 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Utility Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyUtilities.map((utility) => (
                <TableRow key={utility.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getUtilityIcon(utility.utilityType)}
                      <span className="capitalize">{utility.utilityType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{utility.tenantName}</TableCell>
                  <TableCell>{utility.propertyName}</TableCell>
                  <TableCell className="font-bold">${utility.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(utility.billingDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={utility.status === "paid" ? "default" : "secondary"}>
                      {utility.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGeneratePDF(utility.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
