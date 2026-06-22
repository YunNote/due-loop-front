import type { Item } from "./types";

function addDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const MOCK_ITEMS: Item[] = [
  {
    id: "netflix",
    name: "Netflix 구독",
    category: "subscription",
    dueDate: addDays(0),
  },
  {
    id: "car-insurance",
    name: "자동차 보험",
    category: "insurance",
    dueDate: addDays(3),
  },
  {
    id: "notion",
    name: "Notion 연간",
    category: "subscription",
    dueDate: addDays(5),
  },
  {
    id: "gym",
    name: "헬스장 회원권",
    category: "membership",
    dueDate: addDays(13),
  },
  {
    id: "drivers-license",
    name: "운전면허 갱신",
    category: "public",
    dueDate: addDays(23),
  },
];
