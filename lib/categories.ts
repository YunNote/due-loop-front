import type { Category } from "./types";

export interface CategoryMeta {
  label: string;
  iconChar: string;
  gradientFrom: string;
  gradientTo: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  subscription: {
    label: "구독",
    iconChar: "구",
    gradientFrom: "#f5576c",
    gradientTo: "#f093fb",
  },
  insurance: {
    label: "보험",
    iconChar: "보",
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
  },
  membership: {
    label: "멤버십",
    iconChar: "멤",
    gradientFrom: "#43e97b",
    gradientTo: "#38f9d7",
  },
  public: {
    label: "공공",
    iconChar: "공",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
  },
  etc: {
    label: "기타",
    iconChar: "기",
    gradientFrom: "#868f96",
    gradientTo: "#596164",
  },
};

export const CATEGORY_ORDER: Category[] = [
  "subscription",
  "insurance",
  "membership",
  "public",
  "etc",
];
