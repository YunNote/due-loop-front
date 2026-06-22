import { CATEGORY_META } from "@/lib/categories";
import type { Category } from "@/lib/types";

interface CategoryIconProps {
  category: Category;
  /** Character shown inside the icon — defaults to the category's own initial. */
  char?: string;
  size?: number;
  rounded?: number;
}

export function CategoryIcon({
  category,
  char,
  size = 40,
  rounded = 12,
}: CategoryIconProps) {
  const meta = CATEGORY_META[category];
  return (
    <div
      className="flex shrink-0 items-center justify-center font-bold text-white"
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        fontSize: size * 0.375,
        backgroundImage: `linear-gradient(135deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
      }}
    >
      {char ?? meta.iconChar}
    </div>
  );
}
