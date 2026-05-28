import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VendorLayout } from "@/components/vendor-layout";
import { vendorReviews } from "@/lib/vendor-data";
import { Star, MessageSquare, Send } from "lucide-react";

export const Route = createFileRoute("/vendor/reviews")({
  component: VendorReviews,
  head: () => ({
    meta: [
      { title: "Reviews — Vendor Portal · VendorPulse" },
      { name: "description", content: "Customer reviews for your storefront and reply composer." },
    ],
  }),
});

function VendorReviews() {
  const [reply, setReply] = useState("");
  const [active, setActive] = useState<number | null>(vendorReviews.find((r) => !r.replied)?.id ?? null);
  const avg = (vendorReviews.reduce((s, r) => s + r.rating, 0) / vendorReviews.length).toFixed(1);

  return (
    <VendorLayout>
      <div className="px-4 lg:px-8 pb-10 space-y-6">
        <div className="pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Hear directly from your customers — and respond.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Average</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl font-bold">{avg}</span>
              <Star className="size-5 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Total reviews</div>
            <div className="mt-2 text-3xl font-bold">{vendorReviews.length * 32}</div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Awaiting reply</div>
            <div className="mt-2 text-3xl font-bold text-amber-400">{vendorReviews.filter((r) => !r.replied).length}</div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Response rate</div>
            <div className="mt-2 text-3xl font-bold text-emerald-400">96%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card rounded-2xl divide-y divide-border">
            {vendorReviews.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`w-full text-left p-5 transition ${active === r.id ? "bg-accent/40" : "hover:bg-accent/20"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center text-xs font-bold text-white">
                      {r.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.author}</div>
                      <div className="text-[11px] text-muted-foreground">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/90">{r.body}</p>
                {!r.replied && <div className="mt-2 text-[11px] font-semibold text-amber-400">Awaiting reply</div>}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-5 h-fit sticky top-24">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="size-4 text-primary" /> Reply composer
            </div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Thank you for the kind words…"
              className="mt-3 w-full h-40 rounded-xl bg-background border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none"
            />
            <button
              onClick={() => { setReply(""); }}
              className="mt-3 w-full h-11 rounded-xl gradient-primary text-white text-sm font-medium inline-flex items-center justify-center gap-2 shadow-glow"
            >
              <Send className="size-4" /> Send reply
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
