import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg" />
            <span className="text-xl font-bold">RentEase</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to RentEase</h1>
            <p className="text-xl text-muted-foreground">Select your role to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary" onClick={() => navigate({ to: "/landlord/login" })}>
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">I'm a Landlord</CardTitle>
                <CardDescription className="text-base">
                  Manage properties, track payments, and connect with tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Continue as Landlord
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-secondary">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <User className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">I'm a Tenant</CardTitle>
                <CardDescription className="text-base">
                  Pay rent, submit requests, and communicate with your landlord
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" variant="secondary">
                  Continue as Tenant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
