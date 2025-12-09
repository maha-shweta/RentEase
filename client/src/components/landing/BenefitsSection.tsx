import { CheckCircle2, Sparkles } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.png";

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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
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
                  className="flex items-start gap-3 animate-slide-up group hover:translate-x-2 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-success/10 p-1 rounded-full group-hover:bg-success/20 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg group-hover:text-foreground transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in lg:order-first" style={{ animationDelay: "0.2s" }}>
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full animate-pulse" />
            
            {/* Dashboard mockup */}
            <div className="relative transform hover:scale-105 transition-transform duration-700">
              <div className="relative rounded-2xl overflow-hidden shadow-strong border border-border/50">
                <img 
                  src={dashboardMockup} 
                  alt="RentEase Dashboard" 
                  className="w-full h-auto"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Floating metrics */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-strong animate-float backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success">98%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-strong animate-float-delayed backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">5k+</div>
                    <div className="text-xs text-muted-foreground">Happy Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
