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
    price: 17000,
    billingCycle: "monthly",
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
    price: 96000,
    billingCycle: "yearly",
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

export interface Subscription {
  id: string;
  name: string;
  cat: string;
  amount: number;
  date: number;
  dday: number;
}

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: "netflix",   name: "Netflix",   cat: "영상",  amount: 17000, date: 3,  dday: 3  },
  { id: "spotify",   name: "Spotify",   cat: "음악",  amount: 10900, date: 8,  dday: 8  },
  { id: "youtube",   name: "YouTube",   cat: "영상",  amount: 14900, date: 12, dday: 12 },
  { id: "appleone",  name: "Apple One", cat: "멤버십", amount: 20900, date: 15, dday: 15 },
  { id: "chatgpt",   name: "ChatGPT",   cat: "AI",   amount: 22000, date: 18, dday: 18 },
  { id: "notion",    name: "Notion",    cat: "생산성", amount: 8000,  date: 22, dday: 22 },
];
