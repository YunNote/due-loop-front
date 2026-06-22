import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { TopBar } from "@/components/layout/top-bar";

interface AppShellProps {
  title: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, headerRight, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-[60px] md:pb-0">
        <TopBar title={title} right={headerRight} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
