"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RouteGuard } from "@/components/auth/route-guard";
import { ServiceIcon } from "@/components/subscription/service-icon";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mock-items";
import { ConfirmDialog } from "@/components/ui/dialog";

const MOCK_HISTORY = [
  { date: "2026.05.03", amount: 17000, status: "완료" },
  { date: "2026.04.03", amount: 17000, status: "완료" },
  { date: "2026.03.03", amount: 17000, status: "완료" },
  { date: "2026.02.03", amount: 17000, status: "완료" },
];

export default function SubscriptionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const sub = MOCK_SUBSCRIPTIONS.find((s) => s.id === id);

  if (!sub) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground-muted">구독 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  function handleDelete() {
    setShowDeleteDialog(false);
    router.back();
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <header className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex size-9 items-center justify-center rounded-full bg-surface border border-border"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="flex size-9 items-center justify-center rounded-full bg-surface border border-border">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </header>

        <div className="mx-auto max-w-lg px-4 pb-24">
          {/* 서비스 정보 카드 */}
          <div className="mb-4 rounded-[20px] bg-gradient-to-br from-brand to-[#8B7FFF] p-5 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <ServiceIcon name={sub.name} size={52} />
              <div>
                <p className="text-[20px] font-bold">{sub.name}</p>
                <p className="text-[13px] opacity-80">{sub.cat}</p>
              </div>
            </div>
            <div className="flex border-t border-white/20 pt-3.5">
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">월 요금</p>
                <p className="text-[18px] font-bold">₩{sub.amount.toLocaleString("ko-KR")}</p>
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">결제일</p>
                <p className="text-[18px] font-bold">매월 {sub.date}일</p>
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[11px] opacity-75">다음 결제</p>
                <p className="text-[18px] font-bold">D-{sub.dday}</p>
              </div>
            </div>
          </div>

          {/* 결제 내역 */}
          <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-[14px] font-semibold text-foreground">결제 내역</p>
              <p className="text-[12px] text-foreground-muted">최근 4회</p>
            </div>
            {MOCK_HISTORY.map((h, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-[13px] ${
                  i < MOCK_HISTORY.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div>
                  <p className="text-[14px] text-foreground">{h.date}</p>
                  <span className="mt-1 inline-block rounded-full bg-[#E8F9EE] px-2 py-[2px] text-[11px] font-medium text-[#10A37F]">
                    {h.status}
                  </span>
                </div>
                <p className="text-[15px] font-semibold text-foreground">
                  ₩{h.amount.toLocaleString("ko-KR")}
                </p>
              </div>
            ))}
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-4 text-[15px] font-semibold text-[#E53E3E] shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
            구독 삭제
          </button>
        </div>

        {showDeleteDialog && (
          <ConfirmDialog
            title="구독을 삭제할까요?"
            message={`${sub.name} 구독을 삭제하면 되돌릴 수 없어요.`}
            confirmLabel="삭제"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteDialog(false)}
            destructive
          />
        )}
      </div>
    </RouteGuard>
  );
}
