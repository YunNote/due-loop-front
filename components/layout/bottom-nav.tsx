"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: "⌂" },
  { href: "/list", label: "목록", icon: "≡" },
  { href: "/add", label: "추가", icon: "+" },
  { href: "#", label: "내 정보", icon: "◎" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 flex h-[60px] border-t-[0.5px] border-border bg-surface md:hidden">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const colorClass = active ? "text-brand" : "text-foreground-muted";
        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <span className={`text-xl ${colorClass}`}>{item.icon}</span>
            <span className={`text-[10px] ${active ? "font-medium" : ""} ${colorClass}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
