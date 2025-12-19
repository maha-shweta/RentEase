import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Zap, Droplet, Flame, Wifi, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { generateUtilityBillPDF } from "@/lib/generateUtilityPDF";

interface Utility {
  id: number;
  unit_id: number;
  utility_type: string;
  amount: number;
  bill_month: string;
  due_date: string;
  paid: boolean;
  unit_number?: string;
  property_address?: string;
}

interface UtilitiesListProps {
  onRefresh?: () => void;
}

export function UtilitiesList({ onRefresh }: UtilitiesListProps) {
  const { toast } = useToast();
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchUtilities = async () => {
    setLoading(true);
    const response = await api.get<{ utilities: Utility[] }>('/utilities');
    if (response.data?.utilities) {
      setUtilities(response.data.utilities);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUtilities();
  }, []);

  const handlePaidStatusChange = async (utilityId: number, isPaid: string) => {
    setUpdatingId(utilityId);
    try {
      if (isPaid === "true") {
        // Mark as paid
        const response = await api.put(`/utilities/${utilityId}/pay`, {});
        if (response.error) {
          toast({ title: "Error", description: response.error, variant: "destructive" });
        } else {
          toast({ title: "Status Updated", description: "Utility marked as paid" });
          setUtilities(prev => prev.map(u =>
            u.id === utilityId ? { ...u, paid: true } : u
          ));
          onRefresh?.();
        }
      } else {
        // Mark as unpaid - need to add this endpoint
        const response = await api.put(`/utilities/${utilityId}/unpay`, {});
        if (response.error) {
          toast({ title: "Error", description: response.error, variant: "destructive" });
        } else {
          toast({ title: "Status Updated", description: "Utility marked as unpaid" });
          setUtilities(prev => prev.map(u =>
            u.id === utilityId ? { ...u, paid: false } : u
          ));
          onRefresh?.();
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update utility status", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleGeneratePDF = (utility: Utility) => {
    try {
      generateUtilityBillPDF(utility);
      toast({
        title: "PDF Generated",
        description: "Utility bill has been generated and downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({ title: "Error", description: "Failed to generate PDF", variant: "destructive" });
    }
  };

  const getUtilityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "electricity": return <Zap className="h-4 w-4 text-accent" />;
      case "water": return <Droplet className="h-4 w-4 text-blue-500" />;
      case "gas": return <Flame className="h-4 w-4 text-destructive" />;
      case "internet": return <Wifi className="h-4 w-4 text-secondary" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (utilities.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Utility Bills</h3>
          <p className="text-muted-foreground">Utility bills will appear here once added.</p>
        </CardContent>
      </Card>
    );
  }

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
                <TableHead>Unit</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utilities.map((utility) => (
                <TableRow key={utility.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getUtilityIcon(utility.utility_type)}
                      <span className="capitalize">{utility.utility_type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{utility.unit_number || '-'}</TableCell>
                  <TableCell>{utility.property_address || '-'}</TableCell>
                  <TableCell className="font-bold">BDT {Number(utility.amount).toLocaleString()}</TableCell>
                  <TableCell>{new Date(utility.due_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={utility.paid ? "true" : "false"}
                      onValueChange={(value) => handlePaidStatusChange(utility.id, value)}
                      disabled={updatingId === utility.id}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue>
                          <Badge variant={utility.paid ? "default" : "secondary"}>
                            {utility.paid ? "Paid" : "Unpaid"}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">
                          <Badge variant="default">Paid</Badge>
                        </SelectItem>
                        <SelectItem value="false">
                          <Badge variant="secondary">Unpaid</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleGeneratePDF(utility)}>
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
