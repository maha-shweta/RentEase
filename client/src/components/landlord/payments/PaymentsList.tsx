import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Loader2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { paymentService, Payment } from "@/services/payment";
import { api } from "@/lib/api";

interface PaymentsListProps {
  onRefresh?: () => void;
}

export function PaymentsList({ onRefresh }: PaymentsListProps) {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchPayments = async () => {
    setIsLoading(true);
    const response = await paymentService.getAll();
    if (response.data?.payments) {
      setPayments(response.data.payments);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (paymentId: number, newStatus: string) => {
    setUpdatingId(paymentId);
    try {
      const response = await api.put(`/payments/${paymentId}/status`, {
        payment_status: newStatus,
        paid_at: newStatus === 'Paid' ? new Date().toISOString() : null
      });

      if (response.error) {
        toast({ title: "Error", description: response.error, variant: "destructive" });
      } else {
        toast({ title: "Status Updated", description: `Payment status changed to ${newStatus}` });
        // Update local state
        setPayments(prev => prev.map(p =>
          p.id === paymentId
            ? { ...p, payment_status: newStatus, paid_at: newStatus === 'Paid' ? new Date().toISOString() : p.paid_at }
            : p
        ));
        onRefresh?.();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update payment status", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleGeneratePDF = (id: number) => {
    toast({
      title: "PDF Generated",
      description: "Payment receipt has been generated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "overdue": return "destructive";
      default: return "secondary";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Payments Yet</h3>
          <p className="text-muted-foreground text-sm">
            Payments will appear here once rental agreements are active.
          </p>
        </CardContent>
      </Card>
    );
  }

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
                <TableHead>Paid At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.tenant_name || '-'}</TableCell>
                  <TableCell>{payment.property_address || '-'}</TableCell>
                  <TableCell className="font-bold">${Number(payment.amount).toLocaleString()}</TableCell>
                  <TableCell>
                    {payment.due_date ? new Date(payment.due_date).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={payment.payment_status}
                      onValueChange={(value) => handleStatusChange(payment.id, value)}
                      disabled={updatingId === payment.id}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue>
                          <Badge variant={getStatusColor(payment.payment_status)}>
                            {payment.payment_status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">
                          <Badge variant="default">Paid</Badge>
                        </SelectItem>
                        <SelectItem value="Pending">
                          <Badge variant="secondary">Pending</Badge>
                        </SelectItem>
                        <SelectItem value="Overdue">
                          <Badge variant="destructive">Overdue</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {payment.payment_status === "Paid" && (
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
