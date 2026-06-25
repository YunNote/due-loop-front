import Image from "next/image";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { KakaoLoginButton } from "@/components/auth/kakao-login-button";
import { NaverLoginButton } from "@/components/auth/naver-login-button";

const FEATURES = [
  { title: "구독 관리", desc: "넷플릭스, 유튜브 등 자동 갱신 구독을 한눈에" },
  { title: "보험 알림", desc: "만료 예정 보험을 미리 파악하고 준비" },
  { title: "면허 갱신", desc: "운전면허, 자격증 갱신일을 놓치지 않도록" },
  { title: "멤버십 추적", desc: "포인트 소멸, 등급 유지 조건까지" },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen">
      {/* Left — rich gradient panel */}
      <div className="hidden md:flex w-[460px] shrink-0 flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-12 py-10">
        {/* Logo */}
        <div className="rounded-2xl bg-white px-5 py-3">
          <Image src="/logo-trimmed.png" alt="DueLoop" width={180} height={169} className="h-14 w-auto object-contain" />
        </div>

        {/* Hero copy */}
        <div>
          <h1 className="text-[38px] font-bold leading-tight tracking-tight text-white">
            마감과 갱신,<br />
            놓치기 전에<br />
            먼저 알려드려요
          </h1>

          <div className="mt-10 space-y-5">
            {FEATURES.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-[13px] text-white/65">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-[12px] text-white/50">
          구독 · 보험 · 면허 · 멤버십 — 모든 만료일을 한눈에
        </p>
      </div>

      {/* Right — login form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 py-16">
        {/* Mobile header */}
        <div className="mb-10 flex flex-col items-center md:hidden">
          <Image src="/logo-trimmed.png" alt="DueLoop" width={220} height={220} className="w-56 h-auto object-contain" />
          <p className="mt-2 text-sm text-slate-600">
            마감과 갱신, 놓치기 전에 먼저 알려드려요
          </p>
        </div>

        <div className="w-full max-w-[340px]">
          <div className="mb-8 hidden text-center md:block">
            <h2 className="text-[28px] font-bold tracking-tight text-slate-900">시작하기</h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              소셜 계정으로 간편 로그인하세요
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <GoogleLoginButton next={next} />
            <KakaoLoginButton next={next} />
            <NaverLoginButton next={next} />
          </div>

          <p className="mt-8 text-center text-[11px] text-slate-500">
            로그인 시 이용약관 및 개인정보처리방침에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
