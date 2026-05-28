import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Top Seller": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Enterprise: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    "Review Due": "bg-rose-500/15 text-rose-300 border-rose-500/30",
    Active: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    Ready: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Failed: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Processing: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    Refunded: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border", map[status] ?? "bg-muted text-muted-foreground border-border")}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
