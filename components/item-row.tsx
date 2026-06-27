import { CategoryIcon } from "@/components/category-icon";
import { BadgePill } from "@/components/badge-pill";
import { CATEGORY_META } from "@/lib/categories";
import { getBadgeLabel, getDaysUntil, getDueLabel, getUrgencyTier } from "@/lib/due-date";
import type { Item } from "@/lib/types";

interface ItemRowProps {
  item: Item;
}

function formatPrice(price: number, cycle?: Item["billingCycle"]) {
  const formatted = price.toLocaleString("ko-KR");
  return `₩${formatted}/${cycle === "yearly" ? "년" : "월"}`;
}

export function ItemRow({ item }: ItemRowProps) {
  const tier = getUrgencyTier(getDaysUntil(item.dueDate));
  const priceLabel =
    item.category === "subscription" && item.price != null
      ? formatPrice(item.price, item.billingCycle)
      : null;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <CategoryIcon category={item.category} char={item.name.charAt(0)} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <p className="truncate text-xs text-foreground-secondary">
          {CATEGORY_META[item.category].label} · {getDueLabel(item.dueDate)}
          {priceLabel && <span className="ml-1.5 font-medium text-brand">{priceLabel}</span>}
        </p>
      </div>
      <BadgePill tier={tier} label={getBadgeLabel(item.dueDate)} />
    </div>
  );
}
