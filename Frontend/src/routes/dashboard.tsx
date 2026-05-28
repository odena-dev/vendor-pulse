import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { KpiCard } from "@/components/kpi-card";
import { StatusBadge } from "@/components/status-badge";
import { vendors, revenueMonthly, marketShare, notifications, formatMoney } from "@/lib/mock-data";
import { DollarSign, ShoppingCart, Store, ShieldCheck, Star, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — VendorPulse" }] }),
});

const tooltipStyle = {
  backgroundColor: "oklch(0.22 0.025 262)",
  border: "1px solid oklch(0.3 0.02 262)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
};

function Dashboard() {
  const topVendors = [...vendors].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <AppLayout>
      <AppTopbar cta="Invite Vendor" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time performance tracking and vendor health.</p>
          </div>
          <div className="flex rounded-xl border border-border bg-card p-1">
            {["Last 30 Days", "Quarterly", "Yearly"].map((t, i) => (
              <button key={t} className={i === 0 ? "px-4 py-1.5 text-sm rounded-lg gradient-primary text-white" : "px-4 py-1.5 text-sm text-muted-foreground"}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total Revenue" value="$1,245,000" delta="12.5%" trend="up" icon={DollarSign} tone="blue" />
          <KpiCard label="Total Orders" value="42,891" delta="8.2%" trend="up" icon={ShoppingCart} tone="purple" />
          <KpiCard label="Active Vendors" value="1,245" delta="Stable" trend="stable" icon={Store} tone="green" />
          <KpiCard label="Compliance Rate" value="94.2%" delta="2.4%" trend="down" icon={ShieldCheck} tone="rose" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-semibold">Revenue Dynamics</h3>
                <p className="text-xs text-muted-foreground mt-1">Net growth across all transaction channels.</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-blue-500" /> Direct</span>
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-purple-500" /> Marketplace</span>
              </div>
            </div>
            <div className="h-72 mt-6">
              <ResponsiveContainer>
                <AreaChart data={revenueMonthly}>
                  <defs>
                    <linearGradient id="dir" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.21 265)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.62 0.21 265)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.66 0.2 305)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.66 0.2 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="direct" stroke="oklch(0.62 0.21 265)" strokeWidth={3} fill="url(#dir)" />
                  <Area type="monotone" dataKey="marketplace" stroke="oklch(0.66 0.2 305)" strokeWidth={3} fill="url(#mar)" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Elite Partners</h3>
            <p className="text-xs text-muted-foreground mt-1">Top performers by volume.</p>
            <div className="mt-5 space-y-3">
              {topVendors.slice(0, 4).map((v) => (
                <Link key={v.id} to="/vendors/$id" params={{ id: v.id }} className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent transition-colors">
                  <div className={`size-10 rounded-xl bg-gradient-to-br ${v.color} grid place-items-center text-white font-bold`}>{v.initial}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{v.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{v.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatMoney(v.revenue)}</div>
                    <div className="text-[11px] text-emerald-400">+{(Math.random() * 20 + 2).toFixed(0)}%</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Market Share by Category</h3>
            <p className="text-xs text-muted-foreground mt-1">Distribution across service sectors</p>
            <div className="h-56 mt-2 relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={marketShare} dataKey="value" innerRadius={60} outerRadius={88} paddingAngle={3} strokeWidth={0}>
                    {marketShare.map((m, i) => <Cell key={i} fill={m.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Share</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-xs mt-2">
              {marketShare.map((m) => (
                <span key={m.name} className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: m.color }} /> {m.name}</span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Top Vendors by Revenue</h3>
              <Link to="/vendors" className="text-xs text-primary hover:underline">View all →</Link>
            </div>
            <div className="h-64 mt-4">
              <ResponsiveContainer>
                <BarChart data={topVendors.map((v) => ({ name: v.name.split(" ")[0], revenue: v.revenue / 1000 }))}>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="oklch(0.62 0.21 265)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Vendor Performance</h3>
              <Link to="/vendors" className="text-xs text-primary hover:underline">Manage vendors →</Link>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border">
                    <th className="text-left py-3 font-medium">Vendor</th>
                    <th className="text-right py-3 font-medium">Revenue</th>
                    <th className="text-right py-3 font-medium">Orders</th>
                    <th className="text-right py-3 font-medium">Rating</th>
                    <th className="text-right py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topVendors.map((v) => (
                    <tr key={v.id} className="border-b border-border/40 hover:bg-accent/40 transition-colors">
                      <td className="py-3">
                        <Link to="/vendors/$id" params={{ id: v.id }} className="flex items-center gap-3">
                          <div className={`size-8 rounded-lg bg-gradient-to-br ${v.color} grid place-items-center text-white text-xs font-bold`}>{v.initial}</div>
                          <span className="font-medium">{v.name}</span>
                        </Link>
                      </td>
                      <td className="text-right">{formatMoney(v.revenue)}</td>
                      <td className="text-right">{v.orders.toLocaleString()}</td>
                      <td className="text-right"><span className="inline-flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{v.rating}</span></td>
                      <td className="text-right"><StatusBadge status={v.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Link to="/notifications" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <ul className="space-y-4">
              {notifications.slice(0, 5).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <div className={`mt-1 size-2 rounded-full shrink-0 ${n.type === "success" ? "bg-emerald-400" : n.type === "warning" ? "bg-rose-400" : "bg-blue-400"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{n.body}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{n.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl p-6 gradient-primary text-white shadow-glow">
            <div className="text-[11px] uppercase tracking-widest opacity-80">Volume Growth</div>
            <div className="mt-3 text-3xl font-bold">+24.5%</div>
            <div className="text-sm opacity-80">Month over month</div>
            <TrendingUp className="size-10 opacity-30 mt-4" />
          </div>
          <div className="rounded-2xl p-6 gradient-purple text-white shadow-glow">
            <div className="text-[11px] uppercase tracking-widest opacity-80">Growth Insight</div>
            <div className="mt-3 text-lg font-semibold">Expand Fulfillment Capacity?</div>
            <p className="text-sm opacity-80 mt-1">Scaling warehouse API integration could reduce overhead by 14% next quarter.</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[11px] uppercase tracking-widest text-rose-400">● Critical Alert</div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Average Latency</span>
              <span className="text-2xl font-bold text-rose-400">+450ms</span>
            </div>
            <button className="mt-4 text-sm text-primary hover:underline">Run Diagnostics →</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
