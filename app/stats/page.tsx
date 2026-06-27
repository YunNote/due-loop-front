"use client";

import { AppShell } from "@/components/layout/app-shell";
import { RouteGuard } from "@/components/auth/route-guard";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar } from "@/components/avatar";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mock-items";

const CATEGORY_COLORS = ["#6C63FF", "#FF6B6B", "#10A37F", "#FF9F0A", "#4FACFE", "#43E97B"];

const MONTHLY_DATA = [
  { month: "1월", amount: 85000 },
  { month: "2월", amount: 91000 },
  { month: "3월", amount: 85000 },
  { month: "4월", amount: 93700 },
  { month: "5월", amount: 90700 },
  { month: "6월", amount: 93700 },
];

export default function StatsPage() {
  const total = MOCK_SUBSCRIPTIONS.reduce((a, s) => a + s.amount, 0);

  // Group by category
  const byCategory = MOCK_SUBSCRIPTIONS.reduce<Record<string, number>>((acc, s) => {
    acc[s.cat] = (acc[s.cat] || 0) + s.amount;
    return acc;
  }, {});
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  // SVG Donut
  const cx = 80, cy = 80, r = 55, stroke = 24;
  const circumference = 2 * Math.PI * r;
  let cumulativePercent = 0;

  const maxBar = Math.max(...MONTHLY_DATA.map((d) => d.amount));

  return (
    <RouteGuard>
      <AppShell
        title="통계"
        headerRight={
          <>
            <ThemeToggle />
            <Avatar />
          </>
        }
      >
        <div className="mx-auto max-w-lg px-4 py-4 pb-24 md:pb-8">
          {/* 요약 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <p className="mb-1 text-[12px] text-foreground-muted">이번 달 총 지출</p>
            <p className="text-[28px] font-black tracking-tight text-foreground">
              ₩{total.toLocaleString("ko-KR")}
            </p>
            <p className="mt-0.5 text-[12px] text-foreground-muted">
              구독 {MOCK_SUBSCRIPTIONS.length}개 서비스
            </p>
          </div>

          {/* 도넛 차트 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <p className="mb-4 text-[14px] font-semibold text-foreground">카테고리별 지출</p>
            <div className="flex items-center gap-6">
              <div className="shrink-0">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
                  {categories.map(([cat, amount], i) => {
                    const pct = amount / total;
                    const offset = circumference * (1 - cumulativePercent);
                    const dash = circumference * pct;
                    cumulativePercent += pct;
                    return (
                      <circle
                        key={cat}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="none"
                        stroke={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                        strokeWidth={stroke}
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        strokeDashoffset={offset}
                        style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
                      />
                    );
                  })}
                  <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700">
                    ₩{Math.round(total / 1000)}k
                  </text>
                  <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--foreground-muted)" fontSize="10">
                    월 합계
                  </text>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                {categories.map(([cat, amount], i) => (
                  <div key={cat} className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-sm shrink-0"
                      style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                    />
                    <div>
                      <p className="text-[12px] font-medium text-foreground">{cat}</p>
                      <p className="text-[11px] text-foreground-muted">
                        ₩{amount.toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 월별 추이 바 차트 */}
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[14px] font-semibold text-foreground">월별 지출 추이</p>
              <span className="rounded-full bg-brand-soft px-2 py-1 text-[11px] font-medium text-brand-soft-foreground">
                2026
              </span>
            </div>
            <div className="flex items-end justify-between gap-1 h-[100px]">
              {MONTHLY_DATA.map((d, i) => {
                const isLast = i === MONTHLY_DATA.length - 1;
                const heightPct = (d.amount / maxBar) * 100;
                return (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                    <div className="w-full flex items-end" style={{ height: "80px" }}>
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                          height: `${heightPct}%`,
                          background: isLast ? "var(--brand)" : "var(--border)",
                        }}
                      />
                    </div>
                    <p className={`text-[10px] ${isLast ? "font-semibold text-brand" : "text-foreground-muted"}`}>
                      {d.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AppShell>
    </RouteGuard>
  );
}
