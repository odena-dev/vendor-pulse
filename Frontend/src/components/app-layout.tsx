import { AppSidebar } from "./app-sidebar";
import { MobileNav } from "./mobile-nav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
