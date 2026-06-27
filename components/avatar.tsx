"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { decodeJwtPayload } from "@/lib/auth/jwt";

export function Avatar() {
  const { accessToken, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const payload = accessToken ? decodeJwtPayload(accessToken) : null;
  const email = payload?.email as string | undefined;
  const name = payload?.name as string | undefined;
  const initial = (name?.[0] ?? email?.[0])?.toUpperCase() ?? "U";

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.replace("/login");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex size-[30px] items-center justify-center rounded-full bg-brand-soft text-[13px] font-medium text-brand-soft-foreground hover:opacity-80"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-[38px] z-50 w-[200px] overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
          {(name || email) && (
            <div className="border-b border-border px-4 py-3">
              {name && <p className="truncate text-[13px] font-medium text-foreground">{name}</p>}
              {email && <p className="truncate text-[12px] text-foreground-secondary">{email}</p>}
            </div>
          )}
          <div className="p-1">
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] text-foreground-secondary hover:bg-border/40 hover:text-foreground"
            >
              내 정보
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] text-tier-today hover:bg-badge-today-bg"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
