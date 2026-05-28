import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, BarChart3, FileText, Bell, Settings, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Vendors", url: "/vendors", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 pt-6 pb-8">
        <div className="size-10 rounded-xl gradient-primary grid place-items-center shadow-glow">
          <Activity className="size-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-sidebar-foreground tracking-tight">VendorPulse</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Management Suite</div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("size-4", active && "text-primary")} />
              <span>{item.title}</span>
              {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl glass-card p-3 flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center text-xs font-bold text-white">
          AR
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">Alex Rivera</div>
          <div className="text-[11px] text-muted-foreground truncate">Senior Procurement</div>
        </div>
      </div>
    </aside>
  );
}
