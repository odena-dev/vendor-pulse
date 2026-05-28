import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { StatusBadge } from "@/components/status-badge";
import { vendors, formatMoney } from "@/lib/mock-data";
import { Star, Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/vendors/")({
  component: VendorsPage,
  head: () => ({ meta: [{ title: "Vendors — VendorPulse" }] }),
});

function VendorsPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const filtered = vendors.filter(
    (v) =>
      (statusFilter === "All" || v.status === statusFilter) &&
      (v.name.toLowerCase().includes(q.toLowerCase()) || v.category.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AppLayout>
      <AppTopbar cta="Add Vendor" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendors Directory</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and monitor performance across your {vendors.length} active partners.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-11 w-64 rounded-xl bg-card border border-border pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-11 rounded-xl bg-card border border-border px-3 text-sm">
              {["All", "Top Seller", "Enterprise", "Active", "Review Due"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <button className="h-11 px-4 rounded-xl border border-border bg-card flex items-center gap-2 text-sm hover:bg-accent">
              <Filter className="size-4" /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((v) => (
            <Link key={v.id} to="/vendors/$id" params={{ id: v.id }} className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-all group">
              <div className="flex items-start justify-between">
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${v.color} grid place-items-center text-white text-lg font-bold shadow-glow`}>{v.initial}</div>
                <StatusBadge status={v.status} />
              </div>
              <div className="mt-5">
                <div className="font-semibold text-lg">{v.name}</div>
                <div className="text-xs text-muted-foreground truncate mt-0.5">{v.category}</div>
              </div>
              <div className="mt-5 pt-4 border-t border-border grid grid-cols-3 gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Revenue</div>
                  <div className="font-semibold mt-0.5">{formatMoney(v.revenue)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Orders</div>
                  <div className="font-semibold mt-0.5">{(v.orders / 1000).toFixed(1)}k</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating</div>
                  <div className="font-semibold mt-0.5 inline-flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{v.rating}</div>
                </div>
              </div>
            </Link>
          ))}
          <button className="rounded-2xl border-2 border-dashed border-border min-h-[230px] grid place-items-center text-muted-foreground hover:bg-accent/40 hover:border-primary/40 transition-colors">
            <div className="text-center">
              <div className="size-12 mx-auto rounded-2xl bg-accent grid place-items-center"><Plus className="size-5" /></div>
              <div className="mt-3 text-sm">Add New Vendor</div>
            </div>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
