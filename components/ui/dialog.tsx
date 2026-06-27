"use client";

import { ReactNode } from "react";

interface DialogProps {
  title: string;
  message?: string;
  children?: ReactNode;
  onClose: () => void;
}

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    />
  );
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  destructive,
}: ConfirmDialogProps) {
  return (
    <>
      <Backdrop onClose={onCancel} />
      <div className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-[320px] sm:-translate-x-1/2">
        <div className="mb-3 flex items-center gap-2">
          {destructive && (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </div>
          )}
          <p className="text-[16px] font-bold text-foreground">{title}</p>
        </div>
        <p className="mb-5 text-[13px] text-foreground-secondary leading-relaxed">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border py-[11px] text-[14px] font-medium text-foreground-secondary"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-[11px] text-[14px] font-semibold text-white ${
              destructive ? "bg-[#E53E3E]" : "bg-brand"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}

export function ErrorDialog({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-[320px] sm:-translate-x-1/2">
        <div className="mb-3 flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#FFF0F0]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="mb-1 text-[16px] font-bold text-foreground">{title}</p>
          <p className="text-[13px] text-foreground-secondary leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl border border-border py-[11px] text-[14px] font-medium text-foreground"
        >
          확인
        </button>
      </div>
    </>
  );
}

export function SuccessDialog({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-[320px] sm:-translate-x-1/2">
        <div className="mb-3 flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#E8F9EE]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="mb-1 text-[16px] font-bold text-foreground">{title}</p>
          <p className="text-[13px] text-foreground-secondary leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-brand py-[11px] text-[14px] font-semibold text-white"
        >
          확인
        </button>
      </div>
    </>
  );
}
