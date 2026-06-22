export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col md:flex-row">
      <div className="hidden w-[420px] shrink-0 flex-col items-center justify-center border-r-[0.5px] border-brand bg-brand-soft px-8 md:flex">
        <span className="text-5xl font-bold text-brand">✓</span>
        <p className="mt-3 text-[28px] font-medium text-brand-soft-foreground">DueLoop</p>
        <p className="mt-2 text-sm text-brand-soft-foreground">
          마감과 갱신, 놓치기 전에 먼저 알려드려요
        </p>
        <p className="mt-2 text-xs text-brand">
          구독 · 보험 · 면허 · 멤버십 — 모든 만료일을 한눈에
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-16">
        <div className="flex flex-col items-center md:hidden">
          <div className="flex size-[60px] items-center justify-center rounded-2xl bg-brand-soft">
            <span className="text-[26px] font-bold text-brand">✓</span>
          </div>
          <p className="mt-4 text-[22px] font-medium text-foreground">DueLoop</p>
          <p className="mt-1 text-xs text-foreground-secondary">
            마감과 갱신, 놓치기 전에 먼저 알려드려요
          </p>
        </div>

        <div className="hidden text-center md:block">
          <p className="text-[22px] font-medium text-foreground">시작하기</p>
          <p className="mt-1 text-[13px] text-foreground-secondary">
            소셜 계정으로 간편 로그인하세요
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[320px] flex-col gap-3">
          <button
            type="button"
            className="h-11 rounded-lg border-[0.5px] border-border bg-surface text-sm text-foreground"
          >
            G&nbsp;&nbsp;&nbsp;구글로 계속하기
          </button>
          <button type="button" className="h-11 rounded-lg bg-kakao-bg text-sm text-kakao-fg">
            카카오로 계속하기
          </button>
          <button type="button" className="h-11 rounded-lg bg-naver-bg text-sm text-naver-fg">
            네이버로 계속하기
          </button>
        </div>

        <p className="mt-6 max-w-[320px] text-center text-[11px] text-foreground-muted">
          로그인 시 이용약관 및 개인정보처리방침에 동의합니다.
        </p>
      </div>
    </div>
  );
}
