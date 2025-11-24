import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import { dummyPayments } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";

export function PaymentsList() {
  const { toast } = useToast();

  const handleGeneratePDF = (id: string) => {
    console.log("Generate PDF for payment:", id);
    toast({
      title: "PDF Generated",
      description: "Payment receipt has been generated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "due":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.tenantName}</TableCell>
                  <TableCell>{payment.propertyName}</TableCell>
                  <TableCell className="font-bold">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.status === "paid" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGeneratePDF(payment.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    )}
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
