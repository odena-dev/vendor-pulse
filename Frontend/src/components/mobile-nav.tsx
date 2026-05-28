import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, BarChart3, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { url: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { url: "/vendors", icon: Users, label: "Vendors" },
  { url: "/analytics", icon: BarChart3, label: "Stats" },
  { url: "/reports", icon: FileText, label: "Reports" },
  { url: "/settings", icon: Settings, label: "Settings" },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-sidebar/95 backdrop-blur border-t border-sidebar-border">
      <div className="grid grid-cols-5">
        {items.map((i) => {
          const active = pathname.startsWith(i.url);
          return (
            <Link key={i.url} to={i.url} className={cn("flex flex-col items-center gap-1 py-3 text-[11px]", active ? "text-primary" : "text-muted-foreground")}>
              <i.icon className="size-5" />
              {i.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
