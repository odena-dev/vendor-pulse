import { createFileRoute, Link } from "@tanstack/react-router";
import { VendorLayout } from "@/components/vendor-layout";
import { KpiCard } from "@/components/kpi-card";
import { StatusBadge } from "@/components/status-badge";
import { DollarSign, ShoppingBag, Star, Wallet, ArrowUpRight, Sparkles } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { vendorMonthlyRevenue, vendorOrders, vendorNotifications, currentVendor, formatMoney } from "@/lib/vendor-data";

export const Route = createFileRoute("/vendor/")({
  component: VendorOverview,
  head: () => ({
    meta: [
      { title: "Overview — Vendor Portal · VendorPulse" },
      { name: "description", content: "Your storefront performance, payouts, and customer signals at a glance." },
    ],
  }),
});

const tooltipStyle = {
  backgroundColor: "oklch(0.22 0.025 262)",
  border: "1px solid oklch(0.3 0.02 262)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
};

function VendorOverview() {
  const recent = vendorOrders.slice(0, 5);
  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Vendor Portal</div>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Welcome back, {currentVendor.name.split(" ")[0]}.</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's how your storefront is performing this month.</p>
          </div>
          <Link to="/vendor/insights" className="inline-flex items-center gap-1.5 text-sm rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-accent">
            View benchmarks <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Revenue (MTD)" value="$138K" delta="14.6%" trend="up" icon={DollarSign} tone="blue" spark={[4, 6, 5, 7, 6, 8, 7, 9]} />
          <KpiCard label="Orders" value="1,284" delta="9.1%" trend="up" icon={ShoppingBag} tone="purple" spark={[3, 5, 4, 6, 5, 7, 6, 8]} />
          <KpiCard label="Avg Rating" value="4.8" delta="0.1" trend="up" icon={Star} tone="orange" spark={[6, 6, 7, 7, 7, 8, 8, 9]} />
          <KpiCard label="Next Payout" value="$48,280" delta="Oct 30" trend="stable" icon={Wallet} tone="green" spark={[5, 5, 6, 5, 6, 6, 6, 7]} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-semibold">Revenue vs. Category Median</h3>
                <p className="text-xs text-muted-foreground mt-1">You're outperforming the Logistics median by 86% YTD.</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--chart-1)]" /> You</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/60" /> Median</span>
              </div>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vendorMonthlyRevenue}>
                  <defs>
                    <linearGradient id="vrev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 262)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 262)" fontSize={11} />
                  <YAxis stroke="oklch(0.6 0.02 262)" fontSize={11} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatMoney(v)} />
                  <Area type="monotone" dataKey="benchmark" stroke="oklch(0.6 0.02 262)" strokeDasharray="4 4" fill="transparent" />
                  <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#vrev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" /> Activity
            </div>
            <ul className="mt-4 space-y-3">
              {vendorNotifications.map((n) => (
                <li key={n.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-[11px] text-muted-foreground">{n.time}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{n.body}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-semibold">Recent orders</h3>
              <p className="text-xs text-muted-foreground mt-1">Latest customer activity across your storefront.</p>
            </div>
            <Link to="/vendor/orders" className="text-xs text-primary font-semibold hover:underline">View all →</Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="py-3 pr-4">Order</th>
                  <th className="py-3 pr-4">Customer</th>
                  <th className="py-3 pr-4 hidden md:table-cell">Date</th>
                  <th className="py-3 pr-4 hidden sm:table-cell">Items</th>
                  <th className="py-3 pr-4">Total</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs">{o.id}</td>
                    <td className="py-3 pr-4">{o.customer}</td>
                    <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{o.date}</td>
                    <td className="py-3 pr-4 hidden sm:table-cell text-muted-foreground">{o.items}</td>
                    <td className="py-3 pr-4 font-semibold">{formatMoney(o.total)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
