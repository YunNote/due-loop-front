"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/list", label: "전체 목록" },
  { href: "#", label: "알림 설정" },
  { href: "#", label: "내 정보" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[210px] shrink-0 flex-col border-r-[0.5px] border-border bg-surface md:flex">
      <Link href="/" className="flex items-center justify-center px-5 py-5">
        <Image
          src="/logo-trimmed.png"
          alt="DueLoop"
          width={130}
          height={122}
          className="h-16 w-auto object-contain"
          priority
        />
      </Link>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-[34px] items-center rounded-lg px-3 text-sm ${
                active
                  ? "bg-brand-soft font-medium text-brand-soft-foreground"
                  : "text-foreground-secondary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
