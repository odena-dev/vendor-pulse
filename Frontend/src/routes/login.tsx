import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Store } from "lucide-react";
import { setRole, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    as: s.as === "vendor" ? ("vendor" as const) : ("admin" as const),
  }),
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — VendorPulse" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { as } = Route.useSearch();
  const [role, setRoleState] = useState<Role>(as);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRole(role);
    setTimeout(() => navigate({ to: role === "vendor" ? "/vendor" : "/dashboard" }), 500);
  };

  const isVendor = role === "vendor";
  const personaCopy = isVendor
    ? { headline: "Grow your storefront with clarity.", sub: "The vendor portal designed for partners scaling on modern marketplaces." }
    : { headline: "Master your marketplace with precision.", sub: "The control room for operators running high-performance vendor ecosystems." };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden gradient-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
        <div className="relative flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-white/15 backdrop-blur grid place-items-center"><Activity className="size-6" /></div>
          <div className="text-2xl font-bold tracking-tight">VendorPulse</div>
        </div>
        <div className="relative">
          <h2 className="text-5xl font-bold leading-tight tracking-tight">{personaCopy.headline}</h2>
          <p className="mt-6 text-lg text-white/80 max-w-lg">{personaCopy.sub}</p>
        </div>
        <div className="relative grid grid-cols-2 gap-8">
          <div><div className="text-4xl font-bold">500+</div><div className="text-xs uppercase tracking-widest text-white/70 mt-1">Global vendors</div></div>
          <div><div className="text-4xl font-bold">99.9%</div><div className="text-xs uppercase tracking-widest text-white/70 mt-1">Uptime reliability</div></div>
        </div>
      </div>

      <div className="light bg-background flex flex-col justify-center p-6 sm:p-12 text-foreground">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Choose how you'd like to sign in.</p>

          <div className="mt-6 grid grid-cols-2 gap-2 p-1 rounded-xl border border-border bg-card">
            <button
              type="button"
              onClick={() => setRoleState("admin")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${role === "admin" ? "gradient-primary text-white shadow-glow" : "text-muted-foreground"}`}
            >
              <ShieldCheck className="size-4" /> Marketplace Admin
            </button>
            <button
              type="button"
              onClick={() => setRoleState("vendor")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${role === "vendor" ? "gradient-primary text-white shadow-glow" : "text-muted-foreground"}`}
            >
              <Store className="size-4" /> Vendor Partner
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input required type="email" defaultValue={isVendor ? "partner@nova-dynamics.io" : "alex@vendorpulse.io"} key={role} className="w-full h-12 rounded-xl bg-card border border-border pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <button type="button" className="text-sm text-primary font-semibold hover:underline">Forgot password?</button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input required type={showPw ? "text" : "password"} defaultValue="demo1234" className="w-full h-12 rounded-xl bg-card border border-border pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-ring/50" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 rounded border-border accent-[oklch(0.55_0.22_265)]" defaultChecked />
              Remember this device for 30 days
            </label>
            <button disabled={loading} className="w-full h-12 rounded-xl gradient-primary text-white font-medium flex items-center justify-center gap-2 shadow-glow disabled:opacity-60">
              {loading ? "Signing in…" : <>Continue as {isVendor ? "Vendor" : "Admin"} <ArrowRight className="size-4" /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            Don't have access yet? <button className="text-primary font-semibold hover:underline">Apply for access</button>
          </div>

          <div className="mt-10 flex justify-center gap-6 text-xs text-muted-foreground">
            <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
