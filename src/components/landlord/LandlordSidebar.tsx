import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  Zap,
  FileText,
  BarChart3,
  LogOut,
  Bell,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { title: "Dashboard", url: "/landlord/dashboard", icon: LayoutDashboard },
  { title: "Properties", url: "/landlord/properties", icon: Building2 },
  { title: "Tenants", url: "/landlord/tenants", icon: Users },
  { title: "Payments", url: "/landlord/payments", icon: DollarSign },
  { title: "Utilities", url: "/landlord/utilities", icon: Zap },
  { title: "Leases", url: "/landlord/leases", icon: FileText },
  { title: "Analytics", url: "/landlord/analytics", icon: BarChart3 },
];

export function LandlordSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    console.log("Logout clicked");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Announcements</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              {!isCollapsed ? (
                <>
                  <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Rent Collection Notice</p>
                        <p className="text-xs text-muted-foreground">
                          Monthly rent collection starts on the 1st of each month.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-md border border-secondary/20">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Maintenance Update</p>
                        <p className="text-xs text-muted-foreground">
                          Scheduled maintenance for Building A on Jan 15th.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-center">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
