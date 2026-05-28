import { createFileRoute } from "@tanstack/react-router";
import { VendorLayout } from "@/components/vendor-layout";
import { vendorBenchmarks, vendorMonthlyRevenue } from "@/lib/vendor-data";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/vendor/insights")({
  component: VendorInsights,
  head: () => ({
    meta: [
      { title: "Insights — Vendor Portal · VendorPulse" },
      { name: "description", content: "Benchmarks comparing your storefront to category median performance." },
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

const radar = [
  { metric: "Fulfillment", you: 94, median: 76 },
  { metric: "On-Time", you: 97, median: 88 },
  { metric: "CSAT", you: 96, median: 88 },
  { metric: "Response", you: 92, median: 70 },
  { metric: "Quality", you: 89, median: 80 },
  { metric: "Returns", you: 96, median: 84 },
];

function VendorInsights() {
  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Anonymized benchmarks across the Logistics Automation category.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Performance radar</h3>
            <p className="text-xs text-muted-foreground mt-1">You vs. category median (higher is better).</p>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar}>
                  <PolarGrid stroke="oklch(0.3 0.02 262)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.7 0.02 262)", fontSize: 11 }} />
                  <PolarRadiusAxis stroke="oklch(0.3 0.02 262)" tick={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Radar name="Median" dataKey="median" stroke="oklch(0.6 0.02 262)" fill="oklch(0.6 0.02 262)" fillOpacity={0.2} />
                  <Radar name="You" dataKey="you" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Revenue trend (8 months)</h3>
            <p className="text-xs text-muted-foreground mt-1">Your storefront vs. category median.</p>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendorMonthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 262)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 262)" fontSize={11} />
                  <YAxis stroke="oklch(0.6 0.02 262)" fontSize={11} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="benchmark" stroke="oklch(0.6 0.02 262)" strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-lg font-semibold">Detailed benchmarks</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border bg-card/40">
                <th className="py-3 px-5">Metric</th>
                <th className="py-3 px-5">You</th>
                <th className="py-3 px-5">Median</th>
                <th className="py-3 px-5">Position</th>
              </tr>
            </thead>
            <tbody>
              {vendorBenchmarks.map((b) => {
                const better = b.metric.includes("Refund") || b.metric.includes("Response") ? b.you < b.median : b.you > b.median;
                return (
                  <tr key={b.metric} className="border-b border-border last:border-0">
                    <td className="py-4 px-5 font-medium">{b.metric}</td>
                    <td className="py-4 px-5 font-semibold">{b.you}</td>
                    <td className="py-4 px-5 text-muted-foreground">{b.median}</td>
                    <td className="py-4 px-5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${better ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
                        {better ? "Above median" : "Below median"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
