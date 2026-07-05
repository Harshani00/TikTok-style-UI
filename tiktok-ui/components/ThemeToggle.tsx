"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 dark:bg-zinc-800 hover:bg-primary-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? "🌛" : "🌞" }
    </button>
  );
}