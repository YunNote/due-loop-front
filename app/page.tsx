"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { RouteGuard } from "@/components/auth/route-guard";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar } from "@/components/avatar";
import { ServiceIcon } from "@/components/subscription/service-icon";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mock-items";

type ViewMode = "card" | "list";

export default function DashboardPage() {
  const [view, setView] = useState<ViewMode>("card");

  const total = MOCK_SUBSCRIPTIONS.reduce((a, s) => a + s.amount, 0);
  const totalStr = total.toLocaleString("ko-KR");
  const nextDday = Math.min(...MOCK_SUBSCRIPTIONS.map((s) => s.dday));

  return (
    <RouteGuard>
      <AppShell
        title={
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
              <path d="M23 4v6h-6"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            <span className="font-extrabold tracking-tight">DueLoop</span>
          </div>
        }
        headerRight={
          <>
            <ThemeToggle />
            <Avatar />
          </>
        }
      >
        <div className="mx-auto max-w-lg px-4 py-4 pb-20 md:pb-4">
          {/* 요약 카드 */}
          <div className="mb-4 rounded-[20px] bg-gradient-to-br from-brand to-[#8B7FFF] p-5 text-white shadow-lg">
            <p className="mb-1.5 text-[13px] opacity-85">이번 달 구독 지출</p>
            <p className="mb-1 text-[32px] font-black leading-none tracking-[-1.5px]">₩{totalStr}</p>
            <p className="mb-4 text-[12px] opacity-80">지난달 대비 ₩3,000 증가</p>
            <div className="flex border-t border-white/20 pt-3.5">
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">구독 서비스</p>
                <p className="text-[16px] font-bold">{MOCK_SUBSCRIPTIONS.length}개</p>
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">이번 주 결제</p>
                <p className="text-[16px] font-bold">2건</p>
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">다음 결제</p>
                <p className="text-[16px] font-bold">D-{nextDday}</p>
              </div>
            </div>
          </div>

          {/* 목록 헤더 + 뷰 토글 */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-foreground">
              구독 목록{" "}
              <span className="font-normal text-foreground-muted">{MOCK_SUBSCRIPTIONS.length}</span>
            </span>
            <div className="flex gap-[3px] rounded-[9px] bg-border/40 p-[3px]">
              <button
                onClick={() => setView("card")}
                className={`flex items-center rounded-[7px] px-[9px] py-[5px] transition-all ${
                  view === "card" ? "bg-brand text-white" : "text-foreground-secondary"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="9" rx="2"/>
                  <rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/>
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex items-center rounded-[7px] px-[9px] py-[5px] transition-all ${
                  view === "list" ? "bg-brand text-white" : "text-foreground-secondary"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* 카드 뷰 */}
          {view === "card" && (
            <div className="flex flex-col gap-[10px]">
              {MOCK_SUBSCRIPTIONS.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/subscription/${sub.id}`}
                  className="flex items-center gap-3 rounded-[14px] border border-border bg-surface p-[14px] shadow-sm"
                >
                  <ServiceIcon name={sub.name} size={46} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-foreground">{sub.name}</p>
                    <p className="text-[12px] text-foreground-muted">{sub.cat} · 매월 {sub.date}일</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[15px] font-bold text-foreground">₩{sub.amount.toLocaleString("ko-KR")}</p>
                    <span className="rounded-full bg-brand-soft px-2 py-[3px] text-[11px] font-semibold text-brand-soft-foreground">
                      D-{sub.dday}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 리스트 뷰 */}
          {view === "list" && (
            <div className="rounded-xl bg-surface">
              {MOCK_SUBSCRIPTIONS.map((sub, i) => (
                <Link
                  key={sub.id}
                  href={`/subscription/${sub.id}`}
                  className={`flex items-center gap-3 px-3 py-[12px] ${
                    i < MOCK_SUBSCRIPTIONS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <ServiceIcon name={sub.name} size={38} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-foreground">{sub.name}</p>
                    <p className="text-[12px] text-foreground-muted">매월 {sub.date}일</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[14px] font-semibold text-foreground">₩{sub.amount.toLocaleString("ko-KR")}</p>
                    <p className="text-[11px] font-medium text-brand">D-{sub.dday}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 shrink-0 text-border">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* FAB */}
        <Link
          href="/add"
          className="fixed bottom-[80px] right-5 z-10 flex size-[52px] items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/40 md:bottom-6"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </Link>
      </AppShell>
    </RouteGuard>
  );
}
