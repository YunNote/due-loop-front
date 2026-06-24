import { API_BASE_URL } from "./config";
import type { SocialProvider, TokenResponse } from "./types";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
  }
}

async function throwApiError(res: Response): Promise<never> {
  const body = await res.json().catch(() => null);
  throw new ApiError(
    body?.code ?? "UNKNOWN",
    body?.message ?? "요청에 실패했습니다.",
    res.status
  );
}

export async function socialLogin(provider: SocialProvider, token: string): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/social`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, token }),
  });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function refreshTokens(refreshToken: string): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function logoutRequest(refreshToken: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) await throwApiError(res);
}
