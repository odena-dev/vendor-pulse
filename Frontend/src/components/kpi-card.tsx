import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  tone = "blue",
  spark,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "stable";
  icon: React.ComponentType<{ className?: string }>;
  tone?: "blue" | "purple" | "green" | "orange" | "rose";
  spark?: number[];
}) {
  const tones: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-500/5 text-blue-400",
    purple: "from-purple-500/20 to-purple-500/5 text-purple-400",
    green: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
    orange: "from-orange-500/20 to-orange-500/5 text-orange-400",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-400",
  };
  const trendColor =
    trend === "up" ? "text-emerald-400 bg-emerald-500/10" : trend === "down" ? "text-rose-400 bg-rose-500/10" : "text-muted-foreground bg-muted";

  const sp = spark ?? [3, 5, 2, 6, 4, 7, 5, 9];
  const max = Math.max(...sp);

  return (
    <div className="glass-card rounded-2xl p-5 group hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between">
        <div className={cn("size-11 rounded-xl grid place-items-center bg-gradient-to-br border border-white/5", tones[tone])}>
          <Icon className="size-5" />
        </div>
        {delta && (
          <span className={cn("text-[11px] font-semibold px-2 py-1 rounded-full", trendColor)}>
            {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {delta}
          </span>
        )}
      </div>
      <div className="mt-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-4 flex items-end gap-1 h-8">
        {sp.map((v, i) => (
          <div
            key={i}
            className={cn("flex-1 rounded-sm bg-gradient-to-t opacity-70 group-hover:opacity-100 transition", tones[tone])}
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
