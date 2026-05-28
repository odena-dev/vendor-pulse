import { VendorSidebar } from "./vendor-sidebar";
import { VendorMobileNav } from "./vendor-mobile-nav";
import { Search, Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { currentVendor } from "@/lib/vendor-data";

export function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <VendorSidebar />
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 lg:px-8 py-4 backdrop-blur-xl bg-background/70 border-b border-border">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search your orders, payouts, customers..."
              className="w-full h-11 rounded-xl bg-card border border-border pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <button className="size-11 grid place-items-center rounded-xl border border-border bg-card hover:bg-accent transition-colors relative">
            <Bell className="size-4" />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-destructive" />
          </button>
          <div className="hidden sm:flex items-center gap-2 h-11 px-3 rounded-xl border border-border bg-card">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Storefront</span>
            <span className="text-sm font-semibold">{currentVendor.storefront}</span>
          </div>
          <Link to="/login" className="hidden sm:inline-flex items-center text-xs text-muted-foreground hover:text-foreground px-2">
            Switch role
          </Link>
        </header>
        {children}
      </div>
      <VendorMobileNav />
    </div>
  );
}
