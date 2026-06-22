export type Category = "subscription" | "insurance" | "membership" | "public" | "etc";

export type UrgencyTier = "today" | "soon" | "month";

export interface Item {
  id: string;
  name: string;
  category: Category;
  dueDate: Date;
  note?: string;
}
