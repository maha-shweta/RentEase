import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User, Building2 } from "lucide-react";
import { dummyTenants } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";

export function LeasesList() {
  const { toast } = useToast();

  const handleGeneratePDF = (id: string) => {
    console.log("Generate lease PDF for tenant:", id);
    toast({
      title: "PDF Generated",
      description: "Lease agreement has been generated successfully.",
    });
  };

  const handleDownload = (id: string) => {
    console.log("Download lease for tenant:", id);
    toast({
      title: "Download Started",
      description: "Lease document is being downloaded.",
    });
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry >= 0;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {dummyTenants.map((tenant, index) => (
        <Card
          key={tenant.id}
          className="hover:shadow-medium transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              {isExpiringSoon(tenant.leaseEnd) && (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Expiring Soon
                </Badge>
              )}
            </div>

            <h3 className="font-bold text-xl mb-4">Lease Agreement</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{tenant.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{tenant.propertyName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                  {new Date(tenant.leaseEnd).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-bold">{tenant.leaseDuration} months</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleGeneratePDF(tenant.id)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(tenant.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
