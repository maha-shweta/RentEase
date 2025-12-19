import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { paymentService, Payment } from "@/services/payment";
import { Loader2, DollarSign } from "lucide-react";

export function UpcomingRent() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const response = await paymentService.getAll();
      if (response.data?.payments) {
        const upcoming = response.data.payments
          .filter(p => p.payment_status === 'Pending')
          .slice(0, 5);
        setPayments(upcoming);
      }
      setLoading(false);
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Upcoming Rent Due</CardTitle></CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Upcoming Rent Due</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No upcoming payments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium">{payment.tenant_name || 'Unknown Tenant'}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {payment.due_date ? new Date(payment.due_date).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">BDT {Number(payment.amount).toLocaleString()}</div>
                  <Badge variant="secondary">{payment.payment_status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
