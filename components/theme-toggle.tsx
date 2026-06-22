"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="테마 전환"
      className="flex size-[30px] items-center justify-center rounded-full border-[0.5px] border-border bg-surface text-[15px] text-foreground-secondary"
    >
      ◔
    </button>
  );
}
