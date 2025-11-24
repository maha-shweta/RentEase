import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LandlordSidebar } from "@/components/landlord/LandlordSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LandlordLayoutProps {
  children: ReactNode;
}

export function LandlordLayout({ children }: LandlordLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <LandlordSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg" />
                <span className="text-xl font-bold">RentEase</span>
              </div>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
