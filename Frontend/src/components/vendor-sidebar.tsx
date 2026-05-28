import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Activity, LayoutDashboard, ShoppingBag, Wallet, BarChart3, MessageSquare, Settings, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";
import { currentVendor } from "@/lib/vendor-data";

const items = [
  { title: "Overview", url: "/vendor", icon: LayoutDashboard, exact: true },
  { title: "Orders", url: "/vendor/orders", icon: ShoppingBag },
  { title: "Payouts", url: "/vendor/payouts", icon: Wallet },
  { title: "Insights", url: "/vendor/insights", icon: BarChart3 },
  { title: "Reviews", url: "/vendor/reviews", icon: MessageSquare },
  { title: "Settings", url: "/vendor/settings", icon: Settings },
];

export function VendorSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();
  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  const logout = () => {
    signOut();
    navigate({ to: "/login" });
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 pt-6 pb-6">
        <div className="size-10 rounded-xl gradient-primary grid place-items-center shadow-glow">
          <Activity className="size-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-sidebar-foreground tracking-tight">VendorPulse</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Vendor Portal</div>
        </div>
      </div>

      <div className="mx-3 mb-4 rounded-2xl glass-card p-3 flex items-center gap-3">
        <div className={`size-10 rounded-xl bg-gradient-to-br ${currentVendor.color} grid place-items-center text-xs font-bold text-white shadow-glow`}>
          {currentVendor.initial}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{currentVendor.name}</div>
          <div className="text-[11px] text-muted-foreground truncate">{currentVendor.tier} · since {currentVendor.joined}</div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => {
          const active = isActive(item.url, item.exact);
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

      <div className="m-3 rounded-2xl p-4 gradient-primary text-white shadow-glow">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80">
          <Sparkles className="size-3.5" /> Marketplace Health
        </div>
        <div className="mt-2 text-3xl font-bold">A+</div>
        <div className="mt-1 text-xs text-white/80">You're in the top 4% of vendors this quarter.</div>
      </div>

      <button onClick={logout} className="mx-3 mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-foreground transition">
        <LogOut className="size-4" /> Sign out
      </button>
    </aside>
  );
}
