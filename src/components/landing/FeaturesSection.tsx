import { Building2, Users, DollarSign, FileText, BarChart3, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const features = [
  {
    icon: Building2,
    title: "Property Management",
    description: "Manage all your properties in one centralized dashboard with detailed insights.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Tenant Tracking",
    description: "Keep track of tenant information, lease agreements, and communication history.",
    color: "secondary",
  },
  {
    icon: DollarSign,
    title: "Payment Processing",
    description: "Monitor rent payments, track overdue amounts, and generate payment receipts.",
    color: "success",
  },
  {
    icon: FileText,
    title: "Lease Management",
    description: "Create, store, and manage lease agreements with automatic renewal reminders.",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get insights into your rental business with comprehensive analytics and reports.",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive timely alerts for rent due dates, lease expirations, and maintenance requests.",
    color: "secondary",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
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
              className="group hover:shadow-strong transition-all duration-500 animate-scale-in border-border/50 hover:border-primary/30 cursor-pointer overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="p-6 relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:bg-${feature.color}/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color} group-hover:scale-110 transition-transform duration-500`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Animated underline */}
                <div className={`h-1 bg-gradient-to-r from-${feature.color} to-transparent mt-4 transform origin-left transition-transform duration-500 ${hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
