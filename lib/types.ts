export type Category = "subscription" | "insurance" | "membership" | "public" | "etc";

export type UrgencyTier = "today" | "soon" | "month";

export type BillingCycle = "monthly" | "yearly";

export interface Item {
  id: string;
  name: string;
  category: Category;
  dueDate: Date;
  note?: string;
  price?: number;
  billingCycle?: BillingCycle;
}
