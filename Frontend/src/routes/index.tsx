import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, ArrowRight, BarChart3, Check, ChevronRight, Gauge, Globe, LineChart as LineIcon,
  Menu, Radar, ShieldCheck, Sparkles, Star, TrendingUp, Users, Zap, X,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
} from "recharts";
import { revenueMonthly } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "VendorPulse — Vendor Performance Analytics for Marketplaces" },
      { name: "description", content: "Real-time vendor intelligence, marketplace analytics, and revenue insights. The performance OS for modern multi-vendor platforms." },
      { property: "og:title", content: "VendorPulse — Vendor Performance Analytics" },
      { property: "og:description", content: "The performance OS for modern multi-vendor marketplaces." },
    ],
  }),
});

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
    <div className="size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
      <Activity className="size-5 text-white" />
    </div>
    <span className="text-lg font-bold tracking-tight">
      Vendor<span className="text-primary">Pulse</span>
    </span>
  </Link>
);

function Nav() {
  const [open, setOpen] = useState(false);
  const links: { label: string; href?: string; to?: string }[] = [
    { label: "Features", href: "#features" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", to: "/docs" },
    { label: "Changelog", to: "/changelog" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            )
          )}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" search={{ as: "vendor" }} className="text-sm text-muted-foreground hover:text-foreground">I'm a vendor</Link>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-white text-sm font-medium px-4 py-2 shadow-glow">
            Launch app <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden size-10 grid place-items-center rounded-lg border border-border">
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-3 bg-background">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">{l.label}</a>
            )
          )}
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1 text-center text-sm border border-border rounded-lg py-2">Sign in</Link>
            <Link to="/dashboard" className="flex-1 text-center text-sm gradient-primary text-white rounded-lg py-2">Launch app</Link>
          </div>
        </div>
      )}
    </header>
  );
}

const tooltipStyle = {
  backgroundColor: "oklch(0.22 0.025 262)",
  border: "1px solid oklch(0.3 0.02 262)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
};

function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="absolute -inset-x-20 -top-10 h-64 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30 blur-3xl opacity-60 pointer-events-none" />
      <div className="relative glass-card rounded-3xl p-3 sm:p-4 shadow-glow">
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-xs text-muted-foreground">app.vendorpulse.io / dashboard</span>
        </div>
        <div className="rounded-2xl bg-background/70 border border-border p-4 sm:p-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 space-y-3">
            {[
              { l: "Total Revenue", v: "$1.24M", d: "+12.5%", t: "blue" },
              { l: "Active Vendors", v: "1,245", d: "Stable", t: "purple" },
              { l: "Compliance", v: "94.2%", d: "+2.4%", t: "green" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border border-border bg-card p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-xl font-bold">{k.v}</div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">{k.d}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 md:col-span-8 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Revenue Dynamics</div>
                <div className="text-[11px] text-muted-foreground">Direct vs Marketplace</div>
              </div>
              <div className="flex gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500" />Direct</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-purple-500" />Marketplace</span>
              </div>
            </div>
            <div className="h-56 mt-3">
              <ResponsiveContainer>
                <AreaChart data={revenueMonthly}>
                  <defs>
                    <linearGradient id="lh1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.21 265)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.62 0.21 265)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="lh2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.66 0.2 305)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.66 0.2 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.3 0.02 262 / 0.4)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="direct" stroke="oklch(0.62 0.21 265)" strokeWidth={2.5} fill="url(#lh1)" />
                  <Area type="monotone" dataKey="marketplace" stroke="oklch(0.66 0.2 305)" strokeWidth={2.5} fill="url(#lh2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-12 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Top Vendors</div>
              <div className="text-[11px] text-primary">Live</div>
            </div>
            <div className="h-32">
              <ResponsiveContainer>
                <BarChart data={[
                  { n: "AWS", v: 3400 }, { n: "Omni", v: 1540 }, { n: "Stripe", v: 1200 },
                  { n: "Nova", v: 982 }, { n: "Adobe", v: 850 }, { n: "Datadog", v: 610 },
                ]}>
                  <XAxis dataKey="n" stroke="oklch(0.6 0.02 260)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="oklch(0.62 0.21 265)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Gauge, title: "Real-time Vendor KPIs", body: "Track revenue, orders, refund rates and SLAs across every vendor in one glassy dashboard." },
  { icon: Radar, title: "Performance Radar", body: "Compare vendors across quality, speed, support, pricing and reliability with multi-axis radar charts." },
  { icon: LineIcon, title: "Predictive Forecasts", body: "ML-assisted forecasting surfaces revenue swings, refund spikes, and capacity gaps before they hit." },
  { icon: ShieldCheck, title: "Compliance Guardrails", body: "Automatic policy checks, audit trails, and threshold alerts keep your marketplace operating clean." },
  { icon: Globe, title: "Multi-Region Insights", body: "Slice analytics by geography, channel or category to find pockets of growth and underperformance." },
  { icon: Sparkles, title: "AI Recommendations", body: "Receive ranked actions: who to invest in, who to renegotiate, and where capacity should expand." },
];

const benefits = [
  "Reduce vendor onboarding cycles by 62%",
  "Catch refund anomalies in under 4 minutes",
  "Lift marketplace GMV by an average 18% YoY",
  "Cut reporting overhead with auto-generated audits",
  "Unify finance, ops, and procurement on one source of truth",
];

const pricing = [
  {
    name: "Starter", price: "$0", cadence: "/mo", tag: "For small teams getting visibility",
    features: ["Up to 10 vendors", "Core KPI dashboard", "CSV exports", "Email alerts"],
    cta: "Start free", highlight: false,
  },
  {
    name: "Growth", price: "$249", cadence: "/mo", tag: "Most loved by scaling marketplaces",
    features: ["Up to 500 vendors", "Performance radar & forecasts", "Slack & webhook alerts", "Custom reports", "Priority support"],
    cta: "Start 14-day trial", highlight: true,
  },
  {
    name: "Enterprise", price: "Custom", cadence: "", tag: "For global, multi-region marketplaces",
    features: ["Unlimited vendors", "SSO, SCIM & audit logs", "Dedicated success manager", "On-prem connectors", "99.99% SLA"],
    cta: "Talk to sales", highlight: false,
  },
];

const testimonials = [
  { quote: "VendorPulse replaced three internal tools and our weekly vendor review went from 4 hours to 25 minutes.", name: "Maya Chen", role: "VP Ops, OmniCorp" },
  { quote: "The performance radar is genuinely the cleanest vendor comparison view I have used in my career.", name: "Daniel Okafor", role: "Head of Marketplace, Northwind" },
  { quote: "We caught a refund anomaly worth $180K within the first week. It paid for itself instantly.", name: "Priya Raman", role: "Director of Finance, Helix" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[40rem] -right-40 w-[40rem] h-[40rem] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <Nav />

      {/* HERO */}
      <section className="relative px-4 lg:px-8 pt-16 lg:pt-24 pb-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now live: Predictive vendor forecasts (Beta)
            <ChevronRight className="size-3" />
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            The <span className="bg-gradient-to-r from-blue-400 via-primary to-purple-400 bg-clip-text text-transparent">performance OS</span>
            <br className="hidden sm:block" /> for modern marketplaces.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            VendorPulse unifies vendor analytics, marketplace intelligence, and revenue forecasting in one
            beautifully fast workspace — so your team ships decisions, not spreadsheets.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl gradient-primary text-white text-sm font-medium px-5 py-3 shadow-glow">
              Open live demo <ArrowRight className="size-4" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 backdrop-blur px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
              See features
            </a>
          </div>
          <div className="mt-6 text-[11px] uppercase tracking-widest text-muted-foreground">
            No credit card · 14-day Growth trial · SOC 2 Type II
          </div>
        </div>

        <div className="mt-16">
          <DashboardMockup />
        </div>

        {/* Logo cloud */}
        <div className="mt-20 mx-auto max-w-5xl">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Powering vendor intelligence at
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 opacity-70">
            {["OmniCorp", "Northwind", "Helix", "Nova", "Stripe", "Datadog"].map((b) => (
              <div key={b} className="text-center text-lg font-semibold tracking-tight text-muted-foreground">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 lg:px-8 py-16 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: "$4.2B", l: "GMV analyzed yearly" },
            { v: "12K+", l: "Vendors monitored daily" },
            { v: "99.99%", l: "Platform uptime" },
            { v: "4.9/5", l: "Customer rating" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{s.v}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 lg:px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Features</div>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">Everything you need to run a healthy marketplace.</h2>
            <p className="mt-4 text-muted-foreground">A focused toolkit built around what marketplace operators actually do every day — measure, compare, forecast, intervene.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6 hover:-translate-y-0.5 transition-transform">
                <div className="size-11 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/20 border border-white/5 grid place-items-center text-primary">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section id="intelligence" className="px-4 lg:px-8 py-24 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Vendor Intelligence</div>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">Know which vendors to scale — and which to renegotiate.</h2>
            <p className="mt-4 text-muted-foreground">VendorPulse fuses transactional, operational, and qualitative signals into a single performance score. Surface the silent winners, flag the silent leakers.</p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 size-5 rounded-full bg-emerald-500/15 text-emerald-400 grid place-items-center shrink-0"><Check className="size-3" /></span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link to="/vendors" className="inline-flex items-center gap-2 rounded-xl gradient-primary text-white text-sm font-medium px-5 py-3 shadow-glow">
                Explore vendor view <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Vendor Score</div>
                <div className="text-2xl font-bold mt-1">Stripe Inc.</div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400">Top Seller</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { l: "Quality", v: 92, c: "from-blue-500 to-blue-400" },
                { l: "Speed", v: 88, c: "from-purple-500 to-purple-400" },
                { l: "Support", v: 95, c: "from-emerald-500 to-emerald-400" },
                { l: "Pricing", v: 70, c: "from-amber-500 to-amber-400" },
                { l: "Reliability", v: 96, c: "from-cyan-500 to-cyan-400" },
                { l: "Innovation", v: 84, c: "from-rose-500 to-rose-400" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border bg-card p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.l}</div>
                  <div className="text-xl font-bold mt-1">{m.v}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${m.c}`} style={{ width: `${m.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg gradient-primary grid place-items-center"><TrendingUp className="size-4 text-white" /></div>
                <div>
                  <div className="text-sm font-medium">Recommended action</div>
                  <div className="text-xs text-muted-foreground">Expand contract by +20% capacity</div>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 lg:px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Pricing</div>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">Simple pricing. Serious analytics.</h2>
            <p className="mt-4 text-muted-foreground">Start free, scale predictably. Every plan includes the full analytics core.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`rounded-3xl p-7 border ${p.highlight ? "border-primary/60 bg-gradient-to-b from-primary/15 to-card shadow-glow relative" : "border-border bg-card/60"}`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest gradient-primary text-white px-3 py-1 rounded-full">Most Popular</div>
                )}
                <div className="text-sm font-medium">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.cadence}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{p.tag}</div>
                <Link
                  to={p.name === "Enterprise" ? "/login" : "/dashboard"}
                  className={`mt-6 block text-center rounded-xl text-sm font-medium py-2.5 transition-colors ${
                    p.highlight ? "gradient-primary text-white shadow-glow" : "border border-border bg-card hover:bg-accent"
                  }`}
                >
                  {p.cta}
                </Link>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-muted-foreground">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="customers" className="px-4 lg:px-8 py-24 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Customers</div>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">Loved by operators who run real marketplaces.</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="glass-card rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90 flex-1">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center text-xs font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl relative overflow-hidden rounded-3xl gradient-primary p-10 lg:p-16 shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">Bring your marketplace into focus.</h2>
              <p className="mt-4 text-white/80 max-w-xl">Spin up VendorPulse in under 5 minutes. Connect your data, invite your team, and start shipping decisions today.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white text-primary text-sm font-semibold px-5 py-3">
                  Open live demo <ArrowRight className="size-4" />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-white text-sm font-medium px-5 py-3 hover:bg-white/10">
                  Sign in
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { i: BarChart3, l: "Real-time" },
                { i: Users, l: "Vendor 360°" },
                { i: Zap, l: "Instant alerts" },
                { i: ShieldCheck, l: "Enterprise-grade" },
              ].map((c) => (
                <div key={c.l} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 text-white">
                  <c.i className="size-5" />
                  <div className="mt-3 text-sm font-medium">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 lg:px-8 pt-16 pb-10 border-t border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">The performance OS for multi-vendor marketplaces. Built for operators, finance, and procurement teams.</p>
          </div>
          {[
            { h: "Product", l: [{ t: "Features", to: "#features" }, { t: "Pricing", to: "#pricing" }, { t: "Changelog", to: "/changelog" }, { t: "Roadmap", to: "#" }] },
            { h: "Company", l: [{ t: "About", to: "#" }, { t: "Customers", to: "#customers" }, { t: "Careers", to: "#" }, { t: "Contact", to: "#" }] },
            { h: "Resources", l: [{ t: "Docs", to: "/docs" }, { t: "API", to: "/docs" }, { t: "Vendor portal", to: "/login?as=vendor" }, { t: "Status", to: "#" }] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.l.map((i) => (
                  <li key={i.t}><a className="text-foreground/80 hover:text-foreground" href={i.to}>{i.t}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} VendorPulse Inc. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
