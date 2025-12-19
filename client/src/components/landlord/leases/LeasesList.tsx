import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, User, Building2, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { generateLeasePDF } from "@/lib/generateLeasePDF";

interface RentalAgreement {
  id: number;
  tenant_id: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
  status: string;
  tenant_name?: string;
  tenant_email?: string;
  unit_number?: string;
  property_address?: string;
}

interface LeasesListProps {
  onRefresh?: () => void;
}

export function LeasesList({ onRefresh }: LeasesListProps) {
  const { toast } = useToast();
  const [leases, setLeases] = useState<RentalAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchLeases = async () => {
    setLoading(true);
    const response = await api.get<{ agreements: RentalAgreement[] }>('/rental-agreements');
    if (response.data?.agreements) {
      setLeases(response.data.agreements);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeases();
  }, []);

  const handleStatusChange = async (leaseId: number, newStatus: string) => {
    setUpdatingId(leaseId);
    try {
      const response = await api.put(`/rental-agreements/status/${leaseId}`, { status: newStatus });
      if (response.error) {
        toast({ title: "Error", description: response.error, variant: "destructive" });
      } else {
        toast({ title: "Status Updated", description: `Lease status changed to ${newStatus}` });
        setLeases(prev => prev.map(l => l.id === leaseId ? { ...l, status: newStatus } : l));
        onRefresh?.();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update lease status", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (leaseId: number) => {
    if (!confirm("Are you sure you want to delete this lease? This action cannot be undone.")) return;

    try {
      const response = await api.delete(`/rental-agreements/${leaseId}`);
      if (response.error) {
        toast({ title: "Error", description: response.error, variant: "destructive" });
      } else {
        toast({ title: "Lease Deleted", description: "The lease has been deleted successfully." });
        setLeases(prev => prev.filter(l => l.id !== leaseId));
        onRefresh?.();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete lease", variant: "destructive" });
    }
  };

  const handleGeneratePDF = (lease: RentalAgreement) => {
    try {
      generateLeasePDF(lease);
      toast({ title: "PDF Generated", description: "Lease agreement PDF has been generated and downloaded." });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({ title: "Error", description: "Failed to generate PDF. Please try again.", variant: "destructive" });
    }
  };

  const handleDownload = (lease: RentalAgreement) => {
    handleGeneratePDF(lease);
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry >= 0;
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Terminated': return 'destructive';
      case 'Expired': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (leases.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Leases Found</h3>
        <p className="text-muted-foreground">Lease agreements will appear here once created.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {leases.map((lease, index) => (
        <Card
          key={lease.id}
          className="hover:shadow-medium transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex gap-2 items-center">
                <Select
                  value={lease.status}
                  onValueChange={(value) => handleStatusChange(lease.id, value)}
                  disabled={updatingId === lease.id}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue>
                      <Badge variant={getStatusColor(lease.status)}>{lease.status}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">
                      <Badge variant="default">Active</Badge>
                    </SelectItem>
                    <SelectItem value="Terminated">
                      <Badge variant="destructive">Terminated</Badge>
                    </SelectItem>
                    <SelectItem value="Expired">
                      <Badge variant="secondary">Expired</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {isExpiringSoon(lease.end_date) && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Expiring Soon</Badge>
                )}
              </div>
            </div>

            <h3 className="font-bold text-xl mb-4">Lease Agreement</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{lease.tenant_name || 'Unknown Tenant'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{lease.property_address || 'Unknown Property'} - Unit {lease.unit_number}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(lease.start_date).toLocaleDateString()} - {new Date(lease.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-bold">{getDuration(lease.start_date, lease.end_date)} months</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">Monthly Rent</span>
                <span className="font-bold">BDT {Number(lease.rent_amount).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleGeneratePDF(lease)}>
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload(lease)}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(lease.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
