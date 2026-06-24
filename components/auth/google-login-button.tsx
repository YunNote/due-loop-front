"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { ApiError, socialLogin } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/auth-context";
import { GOOGLE_CLIENT_ID } from "@/lib/auth/config";
import { resolveSafeNext } from "@/lib/auth/safe-redirect";

interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, string | number>) => void;
        };
      };
    };
  }
}

export function GoogleLoginButton({ next }: { next?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "exchanging" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      setStatus("exchanging");
      setErrorMessage("");
      try {
        const tokens = await socialLogin("GOOGLE", response.credential);
        auth.login({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
        router.replace(resolveSafeNext(next));
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof ApiError ? err.message : "구글 로그인에 실패했습니다. 다시 시도해주세요."
        );
      }
    },
    [auth, next, router]
  );

  const handleScriptLoad = useCallback(() => {
    if (!window.google || !containerRef.current) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(containerRef.current, {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      logo_alignment: "left",
      text: "continue_with",
      locale: "ko",
      width: 320,
    });
  }, [handleCredentialResponse]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div
        ref={containerRef}
        className={status === "exchanging" ? "pointer-events-none opacity-50" : ""}
      />
      {status === "exchanging" && (
        <p className="text-[11px] text-foreground-secondary">로그인 처리 중...</p>
      )}
      {status === "error" && <p className="text-[11px] text-tier-today">{errorMessage}</p>}
    </div>
  );
}
