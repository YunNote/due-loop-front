import type { UrgencyTier } from "@/lib/types";

const TIER_BAR_CLASSES: Record<UrgencyTier, string> = {
  today: "bg-tier-today",
  soon: "bg-tier-soon",
  month: "bg-tier-month",
};

const TIER_NUMBER_CLASSES: Record<UrgencyTier, string> = {
  today: "text-badge-today-fg",
  soon: "text-badge-soon-fg",
  month: "text-badge-month-fg",
};

interface StatCardProps {
  tier: UrgencyTier;
  label: string;
  count: number;
}

export function StatCard({ tier, label, count }: StatCardProps) {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden rounded-[10px] bg-surface py-3 pl-[14px] pr-3">
      <div className={`absolute left-0 top-0 h-full w-[3px] ${TIER_BAR_CLASSES[tier]}`} />
      <p className="text-[11px] font-medium text-foreground-secondary">{label}</p>
      <p className={`mt-2 text-[26px] font-medium leading-none ${TIER_NUMBER_CLASSES[tier]}`}>
        {count}
      </p>
    </div>
  );
}
