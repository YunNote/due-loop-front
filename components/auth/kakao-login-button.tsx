"use client";

import Script from "next/script";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, socialLogin } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/auth-context";
import { KAKAO_APP_KEY } from "@/lib/auth/config";
import { resolveSafeNext } from "@/lib/auth/safe-redirect";

interface KakaoAuthObject {
  access_token: string;
}

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Auth: {
        login: (options: {
          success: (auth: KakaoAuthObject) => void;
          fail: (err: unknown) => void;
        }) => void;
      };
    };
  }
}

export function KakaoLoginButton({ next }: { next?: string }) {
  const [status, setStatus] = useState<"idle" | "exchanging" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
    window.Kakao.Auth.login({
      success: async (authObj) => {
setStatus("exchanging");
        setErrorMessage("");
        try {
          const tokens = await socialLogin("KAKAO", authObj.access_token);
          auth.login({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
          router.replace(resolveSafeNext(next));
        } catch (err) {
          setStatus("error");
          setErrorMessage(
            err instanceof ApiError ? err.message : "카카오 로그인에 실패했습니다. 다시 시도해주세요."
          );
        }
      },
      fail: () => {
        setStatus("error");
        setErrorMessage("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
      },
    });
  }, [auth, next, router]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Script src="https://developers.kakao.com/sdk/js/kakao.min.js" strategy="afterInteractive" />
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "exchanging"}
        className="relative h-11 w-full rounded-lg bg-kakao-bg text-sm font-medium text-kakao-fg transition-all duration-150 hover:brightness-95 active:brightness-90 disabled:opacity-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2C5.582 2 2 5.134 2 9c0 2.42 1.376 4.554 3.46 5.857L4.5 18.5l4.38-2.76c.36.05.727.076 1.12.076 4.418 0 8-3.134 8-7 0-3.866-3.582-7-8-7z"
            fill="#3c1e1e"
          />
        </svg>
        {status === "exchanging" ? "로그인 처리 중..." : "카카오로 계속하기"}
      </button>
      {status === "error" && <p className="text-[11px] text-tier-today">{errorMessage}</p>}
    </div>
  );
}
