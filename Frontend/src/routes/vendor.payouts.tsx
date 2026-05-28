import { createFileRoute } from "@tanstack/react-router";
import { VendorLayout } from "@/components/vendor-layout";
import { vendorPayouts, formatMoney } from "@/lib/vendor-data";
import { Wallet, Calendar, ArrowDownToLine, Building2 } from "lucide-react";

export const Route = createFileRoute("/vendor/payouts")({
  component: VendorPayouts,
  head: () => ({
    meta: [
      { title: "Payouts — Vendor Portal · VendorPulse" },
      { name: "description", content: "Payout history, schedule, and bank details for your storefront." },
    ],
  }),
});

function VendorPayouts() {
  const total = vendorPayouts.reduce((s, p) => s + p.amount, 0);
  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
          <p className="text-sm text-muted-foreground mt-1">Money in motion across your storefront.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 lg:col-span-1 gradient-primary text-white shadow-glow">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80">
              <Wallet className="size-4" /> Next payout
            </div>
            <div className="mt-3 text-4xl font-bold tracking-tight">$48,280</div>
            <div className="mt-2 text-sm text-white/80 inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> Lands Oct 30, 2024</div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-white text-sm px-4 py-2.5 hover:bg-white/25">
              <ArrowDownToLine className="size-4" /> Request early payout
            </button>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">YTD payouts</div>
            <div className="mt-3 text-3xl font-bold">{formatMoney(total)}</div>
            <div className="mt-2 text-xs text-emerald-400 font-medium">+18.2% vs last year</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Bank account</div>
            <div className="mt-3 inline-flex items-center gap-2 text-lg font-semibold"><Building2 className="size-5 text-primary" /> ACH •••• 4421</div>
            <div className="mt-1 text-xs text-muted-foreground">Bi-weekly schedule · USD</div>
            <button className="mt-4 text-xs text-primary font-semibold hover:underline">Update bank details</button>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-lg font-semibold">Payout history</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border bg-card/40">
                <th className="py-3 px-5">Reference</th>
                <th className="py-3 px-5">Period</th>
                <th className="py-3 px-5 hidden md:table-cell">Method</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Date</th>
              </tr>
            </thead>
            <tbody>
              {vendorPayouts.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-accent/30">
                  <td className="py-4 px-5 font-mono text-xs">{p.id}</td>
                  <td className="py-4 px-5">{p.period}</td>
                  <td className="py-4 px-5 hidden md:table-cell text-muted-foreground">{p.method}</td>
                  <td className="py-4 px-5 font-semibold">{formatMoney(p.amount)}</td>
                  <td className="py-4 px-5 text-muted-foreground">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
