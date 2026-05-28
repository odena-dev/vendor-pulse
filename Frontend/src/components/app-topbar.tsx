import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function AppTopbar({ cta = "New Analysis" }: { cta?: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 px-4 lg:px-8 py-4 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          placeholder="Search vendors, transactions, or reports..."
          className="w-full h-11 rounded-xl bg-card border border-border pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>
      <Link to="/notifications" className="size-11 grid place-items-center rounded-xl border border-border bg-card hover:bg-accent transition-colors relative">
        <Bell className="size-4" />
        <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-destructive" />
      </Link>
      <div className="h-8 w-px bg-border hidden sm:block" />
      <Button className="gradient-primary border-0 text-white shadow-glow h-11 px-5 rounded-xl">
        <Plus className="size-4" /> {cta}
      </Button>
    </header>
  );
}
