import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.08)] dark:shadow-[0_0_20px_rgba(255,255,255,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}