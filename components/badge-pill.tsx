import type { UrgencyTier } from "@/lib/types";

const TIER_CLASSES: Record<UrgencyTier, string> = {
  today: "bg-badge-today-bg text-badge-today-fg",
  soon: "bg-badge-soon-bg text-badge-soon-fg",
  month: "bg-badge-month-bg text-badge-month-fg",
};

interface BadgePillProps {
  tier: UrgencyTier;
  label: string;
}

export function BadgePill({ tier, label }: BadgePillProps) {
  return (
    <span
      className={`inline-flex h-[22px] items-center justify-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium ${TIER_CLASSES[tier]}`}
    >
      {label}
    </span>
  );
}
