import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  component: Changelog,
  head: () => ({
    meta: [
      { title: "Changelog — VendorPulse" },
      { name: "description", content: "Product updates, improvements, and fixes shipped to VendorPulse." },
      { property: "og:title", content: "VendorPulse Changelog" },
      { property: "og:description", content: "What's new in VendorPulse." },
    ],
  }),
});

const releases = [
  {
    version: "2.14",
    date: "Oct 24, 2024",
    title: "Vendor portal goes live",
    items: [
      { tag: "New" as const, text: "Dedicated vendor portal with orders, payouts, insights, and reviews." },
      { tag: "New" as const, text: "Persona-aware sign-in — pick admin or vendor on the login screen." },
      { tag: "Improved" as const, text: "Marketplace Health Score widget in the sidebar." },
    ],
  },
  {
    version: "2.13",
    date: "Oct 10, 2024",
    title: "Faster analytics pipeline",
    items: [
      { tag: "Improved" as const, text: "Cohort analytics rebuilt on a streaming OLAP engine — 4× faster." },
      { tag: "Fixed" as const, text: "PDF exports no longer truncate radar chart labels." },
    ],
  },
  {
    version: "2.12",
    date: "Sep 21, 2024",
    title: "Webhooks & API rate limits",
    items: [
      { tag: "New" as const, text: "Signed webhooks for vendor.created, payout.sent, and review.posted." },
      { tag: "New" as const, text: "Per-key API rate limits with burst windows." },
    ],
  },
  {
    version: "2.11",
    date: "Sep 04, 2024",
    title: "Compliance dashboard",
    items: [
      { tag: "New" as const, text: "SOC 2 evidence collection automated end-to-end." },
      { tag: "Improved" as const, text: "Audit log retention bumped from 90 to 365 days on Scale plans." },
    ],
  },
  {
    version: "2.10",
    date: "Aug 15, 2024",
    title: "Vendor comparison tooling",
    items: [
      { tag: "New" as const, text: "Side-by-side radar comparison of any two vendors." },
      { tag: "Fixed" as const, text: "Refund rate KPI now respects the selected currency." },
    ],
  },
  {
    version: "2.9",
    date: "Jul 30, 2024",
    title: "Mobile experience",
    items: [
      { tag: "Improved" as const, text: "Mobile bottom navigation with five-section quick switch." },
      { tag: "Fixed" as const, text: "Charts no longer overflow on narrow viewports." },
    ],
  },
];

const tagStyles: Record<string, string> = {
  New: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Improved: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Fixed: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

function Changelog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg gradient-primary grid place-items-center shadow-glow"><Activity className="size-4 text-white" /></div>
            <span className="text-base font-bold tracking-tight">Vendor<span className="text-primary">Pulse</span></span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 lg:px-8 py-16">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Changelog</div>
        <h1 className="mt-3 text-5xl font-bold tracking-tight">What's new</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">Every meaningful release we ship to VendorPulse. Subscribe via RSS or follow along here.</p>

        <div className="mt-14 space-y-14">
          {releases.map((r) => (
            <article key={r.version} className="grid md:grid-cols-[180px_1fr] gap-8 relative">
              <div className="md:sticky md:top-24 self-start">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{r.date}</div>
                <div className="mt-1 text-2xl font-bold">v{r.version}</div>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold tracking-tight">{r.title}</h2>
                <ul className="mt-4 space-y-3">
                  {r.items.map((it, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border shrink-0 ${tagStyles[it.tag]}`}>{it.tag}</span>
                      <span className="text-sm text-foreground/90 leading-relaxed">{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
