import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { notifications as initial } from "@/lib/mock-data";
import { CheckCircle2, AlertTriangle, Info, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
  head: () => ({ meta: [{ title: "Notifications — VendorPulse" }] }),
});

function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const list = filter === "unread" ? items.filter((i) => i.unread) : items;

  const icon = (t: string) =>
    t === "success" ? <CheckCircle2 className="size-5 text-emerald-400" /> :
    t === "warning" ? <AlertTriangle className="size-5 text-rose-400" /> :
    <Info className="size-5 text-blue-400" />;

  return (
    <AppLayout>
      <AppTopbar cta="Mark All Read" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">Stay on top of vendor activity, alerts and analytics updates.</p>
          </div>
          <div className="flex rounded-xl border border-border bg-card p-1">
            <button onClick={() => setFilter("all")} className={cn("px-4 py-1.5 text-sm rounded-lg", filter === "all" ? "gradient-primary text-white" : "text-muted-foreground")}>All</button>
            <button onClick={() => setFilter("unread")} className={cn("px-4 py-1.5 text-sm rounded-lg", filter === "unread" ? "gradient-primary text-white" : "text-muted-foreground")}>Unread</button>
          </div>
        </div>

        <div className="glass-card rounded-2xl divide-y divide-border">
          {list.length === 0 && (
            <div className="p-16 text-center text-muted-foreground">
              <BellOff className="size-10 mx-auto mb-3 opacity-40" />
              <p>No notifications to show.</p>
            </div>
          )}
          {list.map((n) => (
            <div key={n.id} onClick={() => setItems(items.map((i) => i.id === n.id ? { ...i, unread: false } : i))} className="p-5 flex gap-4 hover:bg-accent/30 transition-colors cursor-pointer">
              <div className="size-10 rounded-xl bg-muted grid place-items-center shrink-0">{icon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{n.title}</h4>
                  {n.unread && <span className="size-2 rounded-full bg-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
                <div className="text-[11px] text-muted-foreground mt-2">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
