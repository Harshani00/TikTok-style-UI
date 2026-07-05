"use client";

import { InputHTMLAttributes } from "react";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm outline-none focus:ring-2 focus:ring-primary-400 transition-all"
        {...props}
      />
    </div>
  );
}