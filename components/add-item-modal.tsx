"use client";

import { AddItemForm } from "@/components/add-item-form";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddItemModal({ open, onClose }: AddItemModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 p-6 md:flex">
      <div className="w-full max-w-md rounded-2xl bg-background shadow-xl">
        <div className="flex h-[50px] items-center justify-between border-b-[0.5px] border-border px-4">
          <p className="text-[15px] font-medium text-foreground">항목 추가</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-lg text-foreground-secondary"
          >
            ✕
          </button>
        </div>
        <AddItemForm onCancel={onClose} onSubmit={onClose} />
      </div>
    </div>
  );
}
