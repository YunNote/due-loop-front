import type { ReactNode } from "react";

interface TopBarProps {
  title: ReactNode;
  right?: ReactNode;
}

export function TopBar({ title, right }: TopBarProps) {
  return (
    <header className="flex h-[50px] shrink-0 items-center justify-between border-b-[0.5px] border-border px-4">
      <div className="text-[15px] font-medium text-foreground">{title}</div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </header>
  );
}
