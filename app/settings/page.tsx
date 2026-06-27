"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { RouteGuard } from "@/components/auth/route-guard";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import { decodeJwtPayload } from "@/lib/auth/jwt";

type Theme = "light" | "dark" | "system";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-[28px] w-[50px] rounded-full transition-colors ${
        checked ? "bg-brand" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[23px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function SettingsRow({ label, sub, right }: { label: string; sub?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-[14px]">
      <div>
        <p className="text-[14px] text-foreground">{label}</p>
        {sub && <p className="mt-0.5 text-[12px] text-foreground-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export default function SettingsPage() {
  const { accessToken, logout } = useAuth();
  const router = useRouter();

  const payload = accessToken ? decodeJwtPayload(accessToken) : null;
  const name = (payload?.name as string) || (payload?.sub as string) || "사용자";
  const email = (payload?.email as string) || "";

  const [notify, setNotify] = useState(true);
  const [dday7, setDday7] = useState(true);
  const [dday3, setDday3] = useState(true);
  const [dday1, setDday1] = useState(true);
  const [theme, setTheme] = useState<Theme>("system");

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  const themeOptions: { value: Theme; label: string }[] = [
    { value: "light", label: "라이트" },
    { value: "dark", label: "다크" },
    { value: "system", label: "시스템" },
  ];

  return (
    <RouteGuard>
      <AppShell
        title="설정"
        headerRight={<ThemeToggle />}
      >
        <div className="mx-auto max-w-lg px-4 py-4 pb-24 md:pb-8">

          {/* 프로필 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#8B7FFF] text-[18px] font-bold text-white">
                {name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{name}</p>
                <p className="text-[13px] text-foreground-muted">{email}</p>
              </div>
            </div>
          </div>

          {/* 알림 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
              알림 설정
            </p>
            <div className="divide-y divide-border px-4">
              <SettingsRow
                label="알림 활성화"
                sub="결제일 전 알림을 받습니다"
                right={<Toggle checked={notify} onChange={setNotify} />}
              />
              {notify && (
                <>
                  <SettingsRow label="7일 전 알림" right={<Toggle checked={dday7} onChange={setDday7} />} />
                  <SettingsRow label="3일 전 알림" right={<Toggle checked={dday3} onChange={setDday3} />} />
                  <SettingsRow label="1일 전 알림" right={<Toggle checked={dday1} onChange={setDday1} />} />
                </>
              )}
            </div>
          </div>

          {/* 테마 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
              테마
            </p>
            <div className="px-4 pb-3 pt-2">
              <div className="flex gap-2">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex-1 rounded-xl py-2 text-[13px] font-medium transition-all ${
                      theme === opt.value
                        ? "bg-brand text-white"
                        : "bg-border/30 text-foreground-secondary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 일반 */}
          <div className="mb-4 rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
              일반
            </p>
            <div className="divide-y divide-border px-4">
              <button className="flex w-full items-center justify-between py-[14px]">
                <span className="text-[14px] text-foreground">이용약관</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
              <button className="flex w-full items-center justify-between py-[14px]">
                <span className="text-[14px] text-foreground">개인정보처리방침</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
              <div className="flex items-center justify-between py-[14px]">
                <span className="text-[14px] text-foreground">앱 버전</span>
                <span className="text-[13px] text-foreground-muted">0.1.0</span>
              </div>
            </div>
          </div>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-2xl border border-border bg-surface py-4 text-[15px] font-semibold text-[#E53E3E] shadow-sm"
          >
            로그아웃
          </button>
        </div>
      </AppShell>
    </RouteGuard>
  );
}
