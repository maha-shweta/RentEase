import { Building2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sidebar text-sidebar-foreground py-12 border-t border-sidebar-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg" />
              <span className="text-xl font-bold">RentEase</span>
            </div>
            <p className="text-sidebar-foreground/70">
              Simplifying property management for landlords and tenants worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sidebar-foreground/70">
              <li><a href="#features" className="hover:text-sidebar-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sidebar-foreground/70">
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sidebar-foreground/70">
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border pt-8 text-center text-sidebar-foreground/70">
          <p>© {currentYear} RentEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
