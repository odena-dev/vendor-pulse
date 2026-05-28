import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VendorLayout } from "@/components/vendor-layout";
import { currentVendor } from "@/lib/vendor-data";

export const Route = createFileRoute("/vendor/settings")({
  component: VendorSettings,
  head: () => ({
    meta: [
      { title: "Settings — Vendor Portal · VendorPulse" },
      { name: "description", content: "Manage your storefront profile, payouts, and notifications." },
    ],
  }),
});

const tabs = ["Storefront", "Payouts", "Notifications"] as const;
type Tab = (typeof tabs)[number];

function VendorSettings() {
  const [tab, setTab] = useState<Tab>("Storefront");
  const [emails, setEmails] = useState({ orders: true, payouts: true, reviews: false, weekly: true });

  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your storefront and account preferences.</p>
        </div>

        <div className="flex gap-1 p-1 rounded-xl border border-border bg-card w-fit">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm rounded-lg ${tab === t ? "gradient-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 max-w-3xl space-y-5">
          {tab === "Storefront" && (
            <>
              <div className="flex items-center gap-4">
                <div className={`size-16 rounded-2xl bg-gradient-to-br ${currentVendor.color} grid place-items-center text-lg font-bold text-white shadow-glow`}>{currentVendor.initial}</div>
                <button className="text-sm text-primary font-semibold">Upload new logo</button>
              </div>
              <Field label="Storefront name" defaultValue={currentVendor.name} />
              <Field label="Public handle" defaultValue={currentVendor.storefront} prefix="vendorpulse.io/" />
              <Field label="Category" defaultValue={currentVendor.category} />
              <Field label="Support email" defaultValue="support@nova-dynamics.io" type="email" />
            </>
          )}
          {tab === "Payouts" && (
            <>
              <Field label="Account holder" defaultValue="Nova Dynamics Inc." />
              <Field label="Bank name" defaultValue="First National Trust" />
              <Field label="Routing number" defaultValue="•••• 1820" />
              <Field label="Account number" defaultValue="•••• 4421" />
              <div>
                <label className="text-sm font-medium">Payout cadence</label>
                <select className="mt-1.5 w-full h-11 rounded-xl bg-background border border-border px-3 text-sm">
                  <option>Bi-weekly (current)</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </>
          )}
          {tab === "Notifications" && (
            <div className="space-y-3">
              {[
                { k: "orders", l: "New orders", d: "Email me as soon as a customer places an order." },
                { k: "payouts", l: "Payout updates", d: "When a payout is scheduled, sent, or fails." },
                { k: "reviews", l: "Customer reviews", d: "Notify me when a new review lands." },
                { k: "weekly", l: "Weekly digest", d: "Performance summary every Monday morning." },
              ].map((row) => (
                <label key={row.k} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border hover:bg-accent/30 cursor-pointer">
                  <div>
                    <div className="text-sm font-medium">{row.l}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{row.d}</div>
                  </div>
                  <input
                    type="checkbox"
                    className="size-5 rounded mt-1 accent-[oklch(0.55_0.22_265)]"
                    checked={emails[row.k as keyof typeof emails]}
                    onChange={(e) => setEmails({ ...emails, [row.k]: e.target.checked })}
                  />
                </label>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-border flex justify-end gap-2">
            <button className="h-10 px-4 rounded-xl border border-border text-sm">Cancel</button>
            <button className="h-10 px-5 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow">Save changes</button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}

function Field({ label, defaultValue, prefix, type = "text" }: { label: string; defaultValue: string; prefix?: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1.5 flex rounded-xl border border-border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring/50">
        {prefix && <span className="px-3 grid place-items-center text-xs text-muted-foreground border-r border-border bg-card">{prefix}</span>}
        <input type={type} defaultValue={defaultValue} className="flex-1 h-11 px-3 text-sm bg-transparent focus:outline-none" />
      </div>
    </div>
  );
}
