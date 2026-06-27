"use client";

import { useState } from "react";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";
import type { BillingCycle, Category } from "@/lib/types";

const NOTIFY_OPTIONS = ["당일", "1일 전", "3일 전", "7일 전", "14일 전", "30일 전"];
const DEFAULT_NOTIFY = ["당일", "1일 전"];

interface AddItemFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export function AddItemForm({ onCancel, onSubmit }: AddItemFormProps) {
  const [category, setCategory] = useState<Category>("subscription");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [notifyOffsets, setNotifyOffsets] = useState<string[]>(DEFAULT_NOTIFY);

  function toggleOffset(offset: string) {
    setNotifyOffsets((prev) =>
      prev.includes(offset) ? prev.filter((o) => o !== offset) : [...prev, offset]
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
      <div>
        <label className="mb-2 block text-xs font-medium text-foreground-secondary">
          항목 이름
        </label>
        <input
          type="text"
          placeholder="예: Netflix 구독"
          className="h-9 w-full rounded-lg border-[0.5px] border-border bg-surface px-2.5 text-sm text-foreground placeholder:text-foreground-muted"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-2 block text-xs font-medium text-foreground-secondary">
            만료일
          </label>
          <input
            type="date"
            className="h-9 w-full rounded-lg border-[0.5px] border-border bg-surface px-2.5 text-sm text-foreground"
          />
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-xs font-medium text-foreground-secondary">
            카테고리
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="h-9 w-full rounded-lg border-[0.5px] border-border bg-surface px-2.5 text-sm text-foreground"
          >
            {CATEGORY_ORDER.filter((c) => c !== "etc").map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {category === "subscription" && (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-foreground-secondary">
              구독료
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-foreground-muted">
                ₩
              </span>
              <input
                type="number"
                placeholder="9,900"
                min={0}
                className="h-9 w-full rounded-lg border-[0.5px] border-border bg-surface pl-6 pr-2.5 text-sm text-foreground placeholder:text-foreground-muted"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-foreground-secondary">
              갱신 주기
            </label>
            <div className="flex h-9 rounded-lg border-[0.5px] border-border bg-surface p-0.5">
              {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`flex-1 rounded-md text-xs font-medium transition-colors ${
                    billingCycle === cycle
                      ? "bg-brand text-white"
                      : "text-foreground-secondary"
                  }`}
                >
                  {cycle === "monthly" ? "월간" : "연간"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="mb-2 block text-xs font-medium text-foreground-secondary">
          알림 설정
        </label>
        <div className="flex flex-wrap gap-2">
          {NOTIFY_OPTIONS.map((offset) => {
            const selected = notifyOffsets.includes(offset);
            return (
              <button
                key={offset}
                type="button"
                onClick={() => toggleOffset(offset)}
                className={`h-[26px] rounded-full border-[0.5px] px-3 text-xs font-medium ${
                  selected
                    ? "border-brand bg-brand-soft text-brand-soft-foreground"
                    : "border-border text-foreground-secondary"
                }`}
              >
                {offset}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-foreground-secondary">
          메모 (선택)
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg border-[0.5px] border-border bg-surface px-2.5 py-2 text-sm text-foreground"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 w-[100px] rounded-lg border-[0.5px] border-border text-sm text-foreground-secondary"
        >
          취소
        </button>
        <button
          type="submit"
          className="h-11 flex-1 rounded-lg bg-brand text-sm font-medium text-white"
        >
          저장
        </button>
      </div>
    </form>
  );
}
