import { CategoryIcon } from "@/components/category-icon";
import { BadgePill } from "@/components/badge-pill";
import { CATEGORY_META } from "@/lib/categories";
import { getBadgeLabel, getDaysUntil, getDueLabel, getUrgencyTier } from "@/lib/due-date";
import type { Item } from "@/lib/types";

interface ItemRowProps {
  item: Item;
}

export function ItemRow({ item }: ItemRowProps) {
  const tier = getUrgencyTier(getDaysUntil(item.dueDate));

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <CategoryIcon category={item.category} char={item.name.charAt(0)} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <p className="truncate text-xs text-foreground-secondary">
          {CATEGORY_META[item.category].label} · {getDueLabel(item.dueDate)}
        </p>
      </div>
      <BadgePill tier={tier} label={getBadgeLabel(item.dueDate)} />
    </div>
  );
}
