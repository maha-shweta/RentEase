import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import LandlordLogin from "./pages/landlord/Login";
import LandlordSignup from "./pages/landlord/Signup";
import LandlordDashboard from "./pages/landlord/Dashboard";
import LandlordProperties from "./pages/landlord/Properties";
import LandlordTenants from "./pages/landlord/Tenants";
import LandlordPayments from "./pages/landlord/Payments";
import LandlordUtilities from "./pages/landlord/Utilities";
import LandlordLeases from "./pages/landlord/Leases";
import LandlordAnalytics from "./pages/landlord/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/landlord/login" element={<LandlordLogin />} />
          <Route path="/landlord/signup" element={<LandlordSignup />} />
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/properties" element={<LandlordProperties />} />
          <Route path="/landlord/tenants" element={<LandlordTenants />} />
          <Route path="/landlord/payments" element={<LandlordPayments />} />
          <Route path="/landlord/utilities" element={<LandlordUtilities />} />
          <Route path="/landlord/leases" element={<LandlordLeases />} />
          <Route path="/landlord/analytics" element={<LandlordAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
