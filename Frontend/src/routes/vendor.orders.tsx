import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VendorLayout } from "@/components/vendor-layout";
import { StatusBadge } from "@/components/status-badge";
import { vendorOrders, formatMoney } from "@/lib/vendor-data";
import { Search, Download } from "lucide-react";

export const Route = createFileRoute("/vendor/orders")({
  component: VendorOrders,
  head: () => ({
    meta: [
      { title: "Orders — Vendor Portal · VendorPulse" },
      { name: "description", content: "Track and manage every order across your storefront." },
    ],
  }),
});

function VendorOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = vendorOrders.filter(
    (o) =>
      (status === "All" || o.status === status) &&
      (o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">{vendorOrders.length} orders this month across your storefront.</p>
          </div>
          <button className="h-11 px-4 rounded-xl border border-border bg-card flex items-center gap-2 text-sm hover:bg-accent">
            <Download className="size-4" /> Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order ID or customer…" className="w-full h-11 rounded-xl bg-card border border-border pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-xl bg-card border border-border px-3 text-sm">
            {["All", "Completed", "Processing", "Refunded"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border bg-card/40">
                <th className="py-3 px-5">Order</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5 hidden md:table-cell">Date</th>
                <th className="py-3 px-5 hidden sm:table-cell">Items</th>
                <th className="py-3 px-5">Total</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition">
                  <td className="py-4 px-5 font-mono text-xs">{o.id}</td>
                  <td className="py-4 px-5 font-medium">{o.customer}</td>
                  <td className="py-4 px-5 hidden md:table-cell text-muted-foreground">{o.date}</td>
                  <td className="py-4 px-5 hidden sm:table-cell text-muted-foreground">{o.items}</td>
                  <td className="py-4 px-5 font-semibold">{formatMoney(o.total)}</td>
                  <td className="py-4 px-5"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">No orders match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
