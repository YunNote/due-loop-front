"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, socialLogin } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/auth-context";
import { NAVER_CLIENT_ID } from "@/lib/auth/config";
import { resolveSafeNext } from "@/lib/auth/safe-redirect";

const STATE_KEY = "naver_oauth_state";
const NEXT_KEY = "naver_oauth_next";

function startNaverOAuth(callbackUrl: string, next?: string) {
  const state = crypto.randomUUID();
  sessionStorage.setItem(STATE_KEY, state);
  if (next) sessionStorage.setItem(NEXT_KEY, next);
  const params = new URLSearchParams({
    client_id: NAVER_CLIENT_ID,
    redirect_uri: callbackUrl,
    response_type: "token",
    state,
  });
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params}`;
}

function consumeNaverCallback(): string | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  const state = params.get("state");
  if (!token || !state) return null;
  const stored = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);
  if (stored !== state) return null;
  history.replaceState(null, "", window.location.pathname + window.location.search);
return token;
}

export function NaverLoginButton({ next }: { next?: string }) {
  const [status, setStatus] = useState<"idle" | "exchanging" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const exchange = useCallback(
    async (token: string) => {
      setStatus("exchanging");
      setErrorMessage("");
      const storedNext = sessionStorage.getItem(NEXT_KEY);
      sessionStorage.removeItem(NEXT_KEY);
      try {
        const tokens = await socialLogin("NAVER", token);
        auth.login({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
        router.replace(resolveSafeNext(storedNext ?? next));
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof ApiError ? err.message : "네이버 로그인에 실패했습니다. 다시 시도해주세요."
        );
      }
    },
    [auth, next, router]
  );

  // Handle OAuth callback on mount (token arrives in URL hash after redirect)
  useEffect(() => {
    const token = consumeNaverCallback();
    if (token) exchange(token);
  }, [exchange]);

  function handleClick() {
    startNaverOAuth(`${window.location.origin}/login`, next);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "exchanging"}
        className="relative h-11 w-full rounded-lg bg-naver-bg text-sm font-medium text-naver-fg transition-all duration-150 hover:brightness-95 active:brightness-90 disabled:opacity-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <rect width="20" height="20" rx="3" fill="white" fillOpacity="0.9" />
          <path
            d="M5 15V5h3.3l3.7 5.8V5H15v10h-3.3L8 9.2V15H5z"
            fill="#03c75a"
          />
        </svg>
        {status === "exchanging" ? "로그인 처리 중..." : "네이버로 계속하기"}
      </button>
      {status === "error" && <p className="text-[11px] text-tier-today">{errorMessage}</p>}
    </div>
  );
}
