"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Card from "@/components/Card";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  function handleNotificationToggle() {
    setNotifications((prev) => !prev);
    flashSaved();
  }

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    flashSaved();
  }

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">Settings</h1>
        {saved && (
          <span className="text-xs text-primary-600 dark:text-primary-400 animate-pulse">
            Saved ✓
          </span>
        )}
      </div>

      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">Theme</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Currently using {theme === "dark" ? "dark" : "light"} mode
          </p>
        </div>
        <ThemeToggle />
      </Card>

      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">Notifications</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Get notified about likes, comments, and follows
          </p>
        </div>
        <button
          onClick={handleNotificationToggle}
          className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
            notifications ? "bg-primary-600 justify-end" : "bg-zinc-300 dark:bg-zinc-700 justify-start"
          }`}
          aria-label="Toggle notifications"
        >
          <span className="w-5 h-5 bg-white rounded-full shadow" />
        </button>
      </Card>

      <Card className="p-4">
        <p className="font-medium text-sm mb-2">Language</p>
        <div className="flex gap-2 flex-wrap">
          {["English", "Sinhala", "Tamil"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                language === lang
                  ? "bg-primary-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}