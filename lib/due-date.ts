import type { UrgencyTier } from "./types";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDaysUntil(date: Date, today: Date = new Date()): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round(
    (startOfDay(date).getTime() - startOfDay(today).getTime()) / msPerDay
  );
}

export function getUrgencyTier(days: number): UrgencyTier {
  if (days <= 0) return "today";
  if (days <= 7) return "soon";
  return "month";
}

/** Subtitle date label, e.g. "오늘" or "6월 25일". */
export function getDueLabel(date: Date, today: Date = new Date()): string {
  const days = getDaysUntil(date, today);
  if (days === 0) return "오늘";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

/** Badge pill label, e.g. "오늘" or "3일 후". */
export function getBadgeLabel(date: Date, today: Date = new Date()): string {
  const days = getDaysUntil(date, today);
  if (days <= 0) return "오늘";
  return `${days}일 후`;
}
