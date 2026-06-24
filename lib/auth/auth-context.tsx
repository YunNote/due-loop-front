"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { logoutRequest, refreshTokens } from "./api";
import { isTokenExpired } from "./jwt";
import { clearStoredTokens, readStoredTokens, writeStoredTokens } from "./storage";
import type { TokenPair } from "./types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  login: (tokens: TokenPair) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<TokenPair | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const stored = readStoredTokens();
      if (!stored) {
        setIsLoading(false);
        return;
      }
      if (!isTokenExpired(stored.accessToken)) {
        setTokens(stored);
        setIsLoading(false);
        return;
      }
      try {
        const refreshed = await refreshTokens(stored.refreshToken);
        if (cancelled) return;
        const next = { accessToken: refreshed.accessToken, refreshToken: refreshed.refreshToken };
        writeStoredTokens(next);
        setTokens(next);
      } catch {
        clearStoredTokens();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((next: TokenPair) => {
    writeStoredTokens(next);
    setTokens(next);
  }, []);

  const logout = useCallback(async () => {
    const current = tokens ?? readStoredTokens();
    clearStoredTokens();
    setTokens(null);
    if (current) {
      await logoutRequest(current.refreshToken).catch(() => {});
    }
  }, [tokens]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: tokens !== null,
        isLoading,
        accessToken: tokens?.accessToken ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
