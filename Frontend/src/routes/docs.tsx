import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, ArrowLeft, Search, Book, Key, Users, Webhook, Gauge } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: Docs,
  head: () => ({
    meta: [
      { title: "Docs — VendorPulse" },
      { name: "description", content: "Developer documentation for the VendorPulse API, webhooks, and integrations." },
      { property: "og:title", content: "VendorPulse Documentation" },
      { property: "og:description", content: "Build on top of VendorPulse." },
    ],
  }),
});

const sections = [
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "authentication", label: "Authentication", icon: Key },
  { id: "vendors-api", label: "Vendors API", icon: Users },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "rate-limits", label: "Rate Limits", icon: Gauge },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Docs() {
  const [active, setActive] = useState<SectionId>("getting-started");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg gradient-primary grid place-items-center shadow-glow"><Activity className="size-4 text-white" /></div>
              <span className="text-base font-bold tracking-tight">Vendor<span className="text-primary">Pulse</span></span>
            </Link>
            <span className="hidden md:inline text-xs uppercase tracking-widest text-muted-foreground border-l border-border pl-6">Docs</span>
          </div>
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md ml-10">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input placeholder="Search docs…" className="w-full h-10 rounded-xl bg-card border border-border pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 self-start">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition ${
                  active === s.id ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                }`}
              >
                <s.icon className="size-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          {active === "getting-started" && (
            <Article title="Getting Started" lede="Make your first VendorPulse API request in under five minutes.">
              <p>The VendorPulse API gives programmatic access to every vendor, transaction, payout, and analytics surface in your marketplace. Endpoints are organized around REST and return JSON.</p>
              <h3>Base URL</h3>
              <Code>{`https://api.vendorpulse.io/v1`}</Code>
              <h3>Your first request</h3>
              <Code>{`curl https://api.vendorpulse.io/v1/vendors \\
  -H "Authorization: Bearer sk_live_••••••••••••"`}</Code>
              <p>Responses are wrapped in a predictable envelope with <code>data</code>, <code>meta</code>, and <code>pagination</code>.</p>
            </Article>
          )}

          {active === "authentication" && (
            <Article title="Authentication" lede="All requests are authenticated with a bearer token over TLS 1.2+.">
              <p>API keys are scoped per environment (<code>test</code> or <code>live</code>) and per workspace. Never embed live keys in client-side code.</p>
              <h3>Sending the token</h3>
              <Code>{`Authorization: Bearer sk_live_••••••••••••
X-VendorPulse-Version: 2024-10-01`}</Code>
              <h3>Rotating keys</h3>
              <p>From the dashboard, open <strong>Settings → API keys → Rotate</strong>. Old keys remain valid for 24 hours so deploys don't break.</p>
            </Article>
          )}

          {active === "vendors-api" && (
            <Article title="Vendors API" lede="List, retrieve, create, and update vendor records.">
              <h3>List vendors</h3>
              <Code>{`GET /v1/vendors?status=active&limit=50`}</Code>
              <h3>Example response</h3>
              <Code>{`{
  "data": [
    {
      "id": "ven_8f2a91",
      "name": "Nova Dynamics",
      "category": "logistics",
      "status": "active",
      "rating": 4.8,
      "created_at": "2022-03-14T09:21:00Z"
    }
  ],
  "pagination": { "next_cursor": "ven_8f2a91" }
}`}</Code>
            </Article>
          )}

          {active === "webhooks" && (
            <Article title="Webhooks" lede="Subscribe to events instead of polling.">
              <p>VendorPulse signs every webhook with <code>X-VendorPulse-Signature</code> using HMAC-SHA256. Always verify the signature before trusting the payload.</p>
              <h3>Available events</h3>
              <ul>
                <li><code>vendor.created</code> · <code>vendor.updated</code></li>
                <li><code>order.completed</code> · <code>order.refunded</code></li>
                <li><code>payout.scheduled</code> · <code>payout.sent</code></li>
                <li><code>review.posted</code></li>
              </ul>
              <h3>Verifying a signature</h3>
              <Code>{`const sig = req.headers['x-vendorpulse-signature'];
const expected = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');
if (sig !== expected) return res.status(401).end();`}</Code>
            </Article>
          )}

          {active === "rate-limits" && (
            <Article title="Rate Limits" lede="Generous defaults; predictable burst behavior.">
              <p>Each API key gets <strong>120 requests per second</strong> with a 240 request burst. Limits are enforced per workspace.</p>
              <h3>Headers</h3>
              <Code>{`X-RateLimit-Limit: 120
X-RateLimit-Remaining: 117
X-RateLimit-Reset: 1730000000`}</Code>
              <p>When throttled, responses return <code>429 Too Many Requests</code> with a <code>Retry-After</code> hint.</p>
            </Article>
          )}
        </main>
      </div>
    </div>
  );
}

function Article({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <article className="prose-doc max-w-3xl">
      <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Reference</div>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{lede}</p>
      <div className="mt-8 space-y-5 text-sm text-foreground/90 leading-relaxed [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-1 [&>h3]:text-foreground [&>p]:text-foreground/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-card [&_code]:border [&_code]:border-border [&_code]:text-xs [&_code]:font-mono [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:text-foreground/80">
        {children}
      </div>
    </article>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-border bg-card p-5 overflow-x-auto text-xs font-mono leading-relaxed text-foreground/90">
      <code>{children}</code>
    </pre>
  );
}
