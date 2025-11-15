import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Save time with automated rent tracking and reminders",
  "Reduce payment delays and improve cash flow",
  "Access your rental data anytime, anywhere",
  "Generate professional reports and receipts instantly",
  "Maintain organized records for tax season",
  "Scale your rental business with confidence",
];

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Landlords Choose RentEase
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of property owners who have simplified their rental management
              and increased their efficiency with our platform.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-square rounded-2xl bg-gradient-hero opacity-10 absolute inset-0 blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-strong">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                  <span className="font-medium">Monthly Revenue</span>
                  <span className="text-2xl font-bold text-success">$10,200</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <span className="font-medium">Active Properties</span>
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                  <span className="font-medium">Total Tenants</span>
                  <span className="text-2xl font-bold text-secondary">8</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                  <span className="font-medium">Payment Rate</span>
                  <span className="text-2xl font-bold text-accent">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
