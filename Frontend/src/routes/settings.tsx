import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AppTopbar } from "@/components/app-topbar";
import { User, Lock, Bell, Palette, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — VendorPulse" }] }),
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "gradient-primary" : "bg-muted")}>
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [prefs, setPrefs] = useState({ email: true, push: false, weekly: true, dark: true });

  return (
    <AppLayout>
      <AppTopbar cta="Save Changes" />
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your profile, security and notification preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <nav className="glass-card rounded-2xl p-2 h-fit">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={cn("w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors", tab === t.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/40")}>
                <t.icon className="size-4" /> {t.label}
              </button>
            ))}
          </nav>

          <div className="glass-card rounded-2xl p-6 space-y-6">
            {tab === "profile" && (
              <>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center text-xl font-bold text-white">AR</div>
                  <div><div className="font-semibold">Alex Rivera</div><div className="text-xs text-muted-foreground">Senior Procurement Manager</div></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" defaultValue="Alex Rivera" />
                  <Field label="Email" defaultValue="alex@vendorpulse.io" />
                  <Field label="Role" defaultValue="Senior Procurement" />
                  <Field label="Region" defaultValue="EMEA" />
                </div>
              </>
            )}
            {tab === "security" && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Current password" type="password" defaultValue="••••••••" />
                  <Field label="New password" type="password" />
                </div>
                <Row title="Two-factor authentication" desc="Add an extra layer of security to your account."><Toggle checked={true} onChange={() => {}} /></Row>
                <Row title="Active sessions" desc="3 active devices · last login 2m ago"><button className="text-sm text-primary hover:underline">Manage</button></Row>
              </>
            )}
            {tab === "notifications" && (
              <>
                <Row title="Email notifications" desc="Daily digest and critical alerts."><Toggle checked={prefs.email} onChange={(v) => setPrefs({ ...prefs, email: v })} /></Row>
                <Row title="Push notifications" desc="Real-time vendor activity to your device."><Toggle checked={prefs.push} onChange={(v) => setPrefs({ ...prefs, push: v })} /></Row>
                <Row title="Weekly summary" desc="Comprehensive Monday digest."><Toggle checked={prefs.weekly} onChange={(v) => setPrefs({ ...prefs, weekly: v })} /></Row>
              </>
            )}
            {tab === "appearance" && (
              <>
                <Row title="Dark mode" desc="Use the immersive dark theme across the suite."><Toggle checked={prefs.dark} onChange={(v) => setPrefs({ ...prefs, dark: v })} /></Row>
                <div>
                  <div className="text-sm font-medium mb-2">Accent color</div>
                  <div className="flex gap-3">
                    {["from-blue-500 to-purple-500", "from-emerald-500 to-teal-500", "from-rose-500 to-orange-500", "from-purple-500 to-fuchsia-500"].map((c, i) => (
                      <button key={i} className={cn("size-10 rounded-xl bg-gradient-to-br shadow-glow border-2", c, i === 0 ? "border-white" : "border-transparent")} />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-border flex justify-end">
              <button className="h-10 px-5 rounded-xl gradient-primary text-white text-sm shadow-glow flex items-center gap-2"><Save className="size-4" /> Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...props} className="mt-1.5 w-full h-11 rounded-xl bg-background border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" />
    </label>
  );
}

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div><div className="font-medium">{title}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
      {children}
    </div>
  );
}
