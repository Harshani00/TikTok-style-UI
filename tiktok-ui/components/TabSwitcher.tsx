"use client";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer relative ${
            activeTab === tab
              ? "text-primary-600 dark:text-primary-400"
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}