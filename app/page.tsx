import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar } from "@/components/avatar";
import { StatCard } from "@/components/stat-card";
import { ItemRow } from "@/components/item-row";
import { MOCK_ITEMS } from "@/lib/mock-items";
import { getDaysUntil, getUrgencyTier } from "@/lib/due-date";
import type { Item, UrgencyTier } from "@/lib/types";

const SECTION_META: { tier: UrgencyTier; label: string }[] = [
  { tier: "today", label: "오늘 마감" },
  { tier: "soon", label: "7일 이내" },
  { tier: "month", label: "30일 이내" },
];

function groupByTier(items: Item[]): Record<UrgencyTier, Item[]> {
  const grouped: Record<UrgencyTier, Item[]> = { today: [], soon: [], month: [] };
  for (const item of items) {
    grouped[getUrgencyTier(getDaysUntil(item.dueDate))].push(item);
  }
  return grouped;
}

export default function DashboardPage() {
  const grouped = groupByTier(MOCK_ITEMS);

  return (
    <AppShell
      title={
        <>
          <span className="md:hidden">안녕하세요 👋</span>
          <span className="hidden md:inline">대시보드</span>
        </>
      }
      headerRight={
        <>
          <ThemeToggle />
          <Avatar />
        </>
      }
    >
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex gap-4">
          <StatCard tier="today" label="오늘 마감" count={grouped.today.length} />
          <StatCard tier="soon" label="7일 이내" count={grouped.soon.length} />
          <StatCard tier="month" label="30일 이내" count={grouped.month.length} />
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {SECTION_META.filter((section) => grouped[section.tier].length > 0).map((section) => (
            <section key={section.tier}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-medium text-foreground-secondary">
                  {section.label}
                </p>
                <Link href="/list" className="text-[11px] text-brand">
                  전체보기 →
                </Link>
              </div>
              <div className="divide-y divide-border rounded-xl bg-surface">
                {grouped[section.tier].map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
