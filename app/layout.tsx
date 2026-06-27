import type { Metadata } from "next";
import { ThemeScript } from "@/components/theme-script";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "DueLoop",
  description: "마감과 갱신, 놓치기 전에 먼저 알려드려요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full ${notoSansKR.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeScript />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
