import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { StatusBadge } from "@/components/status-badge";
import { vendors, transactions, radarData, formatMoney } from "@/lib/mock-data";
import { Star, ShieldCheck, ArrowLeft, Clock, Smile } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
} from "recharts";

export const Route = createFileRoute("/vendors/$id")({
  component: VendorDetail,
  loader: ({ params }) => {
    const v = vendors.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => (
    <AppLayout><AppTopbar />
      <div className="p-10 text-center"><h2 className="text-2xl font-bold">Vendor not found</h2><Link to="/vendors" className="text-primary mt-4 inline-block">← Back to vendors</Link></div>
    </AppLayout>
  ),
  errorComponent: ({ error }) => <div className="p-10">{(error as Error).message}</div>,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Vendor"} — VendorPulse` }] }),
});

const tooltipStyle = { backgroundColor: "oklch(0.22 0.025 262)", border: "1px solid oklch(0.3 0.02 262)", borderRadius: 12, color: "white", fontSize: 12 };

function VendorDetail() {
  const v = Route.useLoaderData();
  const monthly = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
    month: m, value: Math.round(40 + Math.sin(i) * 20 + i * 8 + Math.random() * 10),
  }));

  return (
    <AppLayout>
      <AppTopbar cta="Edit Profile" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <Link to="/vendors" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6">
          <ArrowLeft className="size-4" /> Back to vendors
        </Link>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 gradient-primary" />
          <div className="flex flex-wrap items-start gap-6">
            <div className={`size-20 rounded-2xl bg-gradient-to-br ${v.color} grid place-items-center text-white text-2xl font-bold shadow-glow`}>{v.initial}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">{v.name}</h1>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  <ShieldCheck className="size-3" /> Elite Status
                </span>
                <StatusBadge status={v.status} />
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{v.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="h-10 px-4 rounded-xl gradient-primary text-white text-sm shadow-glow">Edit Profile</button>
              <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm hover:bg-accent">Contact</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Monthly Sales Performance</h3>
                <p className="text-xs text-muted-foreground">Net revenue trajectory over the last 6 months</p>
              </div>
              <select className="h-9 rounded-lg bg-background border border-border px-3 text-xs"><option>Last 6 Months</option><option>Last Year</option></select>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={monthly}>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.3 0.02 262 / 0.3)" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="oklch(0.62 0.21 265)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center justify-between">CSAT Score <Smile className="size-4 text-emerald-400" /></div>
              <div className="flex items-center gap-4 mt-3">
                <div className="size-20 rounded-full grid place-items-center border-4 border-emerald-500/60 text-xl font-bold">98%</div>
                <div><div className="font-semibold text-emerald-400">Excellent</div><div className="text-xs text-muted-foreground">+2.4% from avg</div></div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center justify-between">Avg. Lead Time <Clock className="size-4 text-purple-400" /></div>
              <div className="flex items-center gap-4 mt-3">
                <div className="size-20 rounded-full grid place-items-center border-4 border-purple-500/60 text-xl font-bold">4.2d</div>
                <div><div className="font-semibold">Optimal</div><div className="text-xs text-muted-foreground">Top 5% category</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border">
                    <th className="text-left py-3 font-medium">Transaction</th>
                    <th className="text-left py-3 font-medium">Date</th>
                    <th className="text-left py-3 font-medium">Status</th>
                    <th className="text-right py-3 font-medium">Volume</th>
                    <th className="text-right py-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-border/40">
                      <td className="py-3 font-mono text-xs">{t.id}</td>
                      <td className="py-3 text-muted-foreground">{t.date}</td>
                      <td className="py-3"><StatusBadge status={t.status} /></td>
                      <td className="py-3 text-right">{t.volume}</td>
                      <td className="py-3 text-right font-semibold">{t.amount < 0 ? `-${formatMoney(-t.amount)}` : formatMoney(t.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Comparative Performance</h3>
            <p className="text-xs text-muted-foreground mt-1">{v.name} vs category average</p>
            <div className="h-64 mt-3">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.3 0.02 262 / 0.6)" />
                  <PolarAngleAxis dataKey="metric" stroke="oklch(0.7 0.02 260)" fontSize={10} />
                  <PolarRadiusAxis stroke="oklch(0.5 0.02 260)" fontSize={9} />
                  <Radar name={v.name} dataKey="A" stroke="oklch(0.62 0.21 265)" fill="oklch(0.62 0.21 265)" fillOpacity={0.4} />
                  <Radar name="Category avg" dataKey="B" stroke="oklch(0.66 0.2 305)" fill="oklch(0.66 0.2 305)" fillOpacity={0.25} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Revenue", value: formatMoney(v.revenue) },
            { label: "Orders", value: v.orders.toLocaleString() },
            { label: "Refund Rate", value: `${v.refundRate}%` },
            { label: "Rating", value: <span className="inline-flex items-center gap-1">{v.rating} <Star className="size-4 fill-amber-400 text-amber-400" /></span> },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
