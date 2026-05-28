import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { vendors, revenueMonthly, marketShare, radarData, formatMoney } from "@/lib/mock-data";
import { Calendar, Download, X, FileText, FileSpreadsheet } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics — VendorPulse" }] }),
});

const tooltipStyle = { backgroundColor: "oklch(0.22 0.025 262)", border: "1px solid oklch(0.3 0.02 262)", borderRadius: 12, color: "white", fontSize: 12 };

function AnalyticsPage() {
  const [showExport, setShowExport] = useState(false);
  const top = [...vendors].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  return (
    <AppLayout>
      <AppTopbar cta="New Analysis" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendor Performance</h1>
            <p className="text-sm text-muted-foreground mt-1">Comparative insights and trend analysis for Q3 2024</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex rounded-xl border border-border bg-card p-1">
              {["Daily", "Weekly", "Monthly"].map((t, i) => (
                <button key={t} className={i === 0 ? "px-4 py-1.5 text-sm rounded-lg gradient-primary text-white" : "px-4 py-1.5 text-sm text-muted-foreground"}>{t}</button>
              ))}
            </div>
            <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm flex items-center gap-2"><Calendar className="size-4" /> Oct 1 – Oct 31, 2024</button>
            <button onClick={() => setShowExport(true)} className="h-10 px-4 rounded-xl gradient-primary text-white text-sm shadow-glow flex items-center gap-2"><Download className="size-4" /> Export Report</button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 xl:col-span-2">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground">8-month growth across direct + marketplace</p>
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <LineChart data={revenueMonthly}>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="direct" stroke="oklch(0.62 0.21 265)" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="marketplace" stroke="oklch(0.66 0.2 305)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Distribution</h3>
            <p className="text-xs text-muted-foreground">Market share by category</p>
            <div className="h-64 mt-4 relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={marketShare} dataKey="value" innerRadius={55} outerRadius={88} paddingAngle={3} strokeWidth={0}>
                    {marketShare.map((m, i) => <Cell key={i} fill={m.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-3 text-xs flex-wrap">
              {marketShare.map((m) => <span key={m.name} className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: m.color }} />{m.name} {m.value}%</span>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Top Vendors</h3>
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={top.map((v) => ({ name: v.name, revenue: v.revenue / 1000 }))}>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="oklch(0.6 0.02 260)" fontSize={11} tickFormatter={(v) => `$${v}k`} />
                  <YAxis dataKey="name" type="category" stroke="oklch(0.6 0.02 260)" fontSize={11} width={100} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.3 0.02 262 / 0.3)" }} />
                  <Bar dataKey="revenue" radius={[0, 8, 8, 0]} fill="oklch(0.66 0.2 305)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Marketplace Growth</h3>
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <AreaChart data={revenueMonthly}>
                  <defs><linearGradient id="grow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="marketplace" stroke="oklch(0.72 0.17 160)" strokeWidth={3} fill="url(#grow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold">Vendor Comparison — Multi-dimensional</h3>
          <p className="text-xs text-muted-foreground">Quality, speed, support and innovation across leading partners</p>
          <div className="h-80 mt-4">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid stroke="oklch(0.3 0.02 262 / 0.6)" />
                <PolarAngleAxis dataKey="metric" stroke="oklch(0.7 0.02 260)" fontSize={11} />
                <PolarRadiusAxis stroke="oklch(0.5 0.02 260)" fontSize={10} />
                <Radar name="Stripe Inc." dataKey="A" stroke="oklch(0.62 0.21 265)" fill="oklch(0.62 0.21 265)" fillOpacity={0.4} />
                <Radar name="Industry avg" dataKey="B" stroke="oklch(0.75 0.18 60)" fill="oklch(0.75 0.18 60)" fillOpacity={0.25} />
                <Legend />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showExport && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur p-4" onClick={() => setShowExport(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Export Report</h3>
              <button onClick={() => setShowExport(false)}><X className="size-5" /></button>
            </div>
            <p className="text-sm text-muted-foreground">Choose a format to download your Q3 2024 vendor performance report.</p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button className="rounded-xl border border-border bg-card p-4 hover:bg-accent text-left transition">
                <FileText className="size-6 text-rose-400" />
                <div className="font-medium mt-2">PDF</div>
                <div className="text-xs text-muted-foreground">Full visual report</div>
              </button>
              <button className="rounded-xl border border-border bg-card p-4 hover:bg-accent text-left transition">
                <FileSpreadsheet className="size-6 text-emerald-400" />
                <div className="font-medium mt-2">CSV</div>
                <div className="text-xs text-muted-foreground">Raw data export</div>
              </button>
            </div>
            <button onClick={() => setShowExport(false)} className="w-full mt-5 h-11 rounded-xl gradient-primary text-white shadow-glow">Download</button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
