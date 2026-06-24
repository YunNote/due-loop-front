"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { CategoryIcon } from "@/components/category-icon";
import { ItemRow } from "@/components/item-row";
import { AddItemModal } from "@/components/add-item-modal";
import { RouteGuard } from "@/components/auth/route-guard";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";
import { MOCK_ITEMS } from "@/lib/mock-items";

export default function ListPage() {
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = MOCK_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <RouteGuard>
      <AppShell
        title="전체 목록"
        headerRight={
          <>
            <Link
              href="/add"
              className="flex h-[30px] items-center rounded-lg bg-brand px-3 text-[13px] font-medium text-white md:hidden"
            >
              + 추가
            </Link>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="hidden h-[30px] items-center rounded-lg bg-brand px-3 text-[13px] font-medium text-white md:inline-flex"
            >
              + 항목 추가
            </button>
          </>
        }
      >
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="🔍  항목 검색..."
              className="h-9 flex-1 rounded-lg border-[0.5px] border-border bg-surface px-3 text-[13px] text-foreground placeholder:text-foreground-muted"
            />
            <button
              type="button"
              className="hidden h-9 w-20 shrink-0 items-center justify-center rounded-lg border-[0.5px] border-border text-[13px] text-foreground-secondary md:inline-flex"
            >
              필터
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {CATEGORY_ORDER.filter((category) => category !== "etc").map((category) => {
              const items = filtered.filter((item) => item.category === category);
              if (items.length === 0) return null;
              return (
                <section key={category}>
                  <div className="mb-2 flex items-center gap-2">
                    <CategoryIcon category={category} size={20} rounded={6} />
                    <p className="text-xs font-medium text-foreground-secondary">
                      {CATEGORY_META[category].label}
                    </p>
                  </div>
                  <div className="divide-y divide-border rounded-xl bg-surface">
                    {items.map((item) => (
                      <ItemRow key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}

            {filtered.length === 0 && (
              <p className="py-12 text-center text-sm text-foreground-secondary">
                검색 결과가 없어요.
              </p>
            )}
          </div>
        </div>

        <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} />
      </AppShell>
    </RouteGuard>
  );
}
