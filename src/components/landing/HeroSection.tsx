import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Sparkles, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      {/* Floating shapes animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float-slow" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8 hover:bg-secondary/20 transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-sm font-medium">Modern Rental Management</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-primary to-secondary bg-clip-text text-transparent animate-slide-up leading-tight">
              Simplify Property Management with RentEase
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Streamline your rental operations, track payments effortlessly, and build stronger relationships with your tenants.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Increase Revenue</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Secure & Reliable</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                asChild 
                size="lg" 
                className="text-lg h-14 px-8 shadow-strong hover:shadow-medium transition-all hover:scale-105"
              >
                <Link to="/role-select">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8 hover:bg-muted transition-all hover:scale-105"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <img 
                src={heroIllustration} 
                alt="Property Management Illustration" 
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              
              {/* Floating stats cards */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-medium animate-float hover:shadow-strong transition-shadow">
                <div className="text-2xl font-bold text-success">98%</div>
                <div className="text-sm text-muted-foreground">On-time Payments</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-medium animate-float-delayed hover:shadow-strong transition-shadow">
                <div className="text-2xl font-bold text-primary">$10.2k</div>
                <div className="text-sm text-muted-foreground">Avg Monthly Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
