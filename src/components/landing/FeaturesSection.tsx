import { Building2, Users, DollarSign, FileText, BarChart3, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Building2,
    title: "Property Management",
    description: "Manage all your properties in one centralized dashboard with detailed insights.",
  },
  {
    icon: Users,
    title: "Tenant Tracking",
    description: "Keep track of tenant information, lease agreements, and communication history.",
  },
  {
    icon: DollarSign,
    title: "Payment Processing",
    description: "Monitor rent payments, track overdue amounts, and generate payment receipts.",
  },
  {
    icon: FileText,
    title: "Lease Management",
    description: "Create, store, and manage lease agreements with automatic renewal reminders.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get insights into your rental business with comprehensive analytics and reports.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive timely alerts for rent due dates, lease expirations, and maintenance requests.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Manage Rentals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make property management effortless and efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-medium transition-all duration-300 animate-scale-in border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
