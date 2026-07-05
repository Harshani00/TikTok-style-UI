"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { mockNotifications, getUserById, Notification } from "@/lib/TestData";

const typeIcon: Record<Notification["type"], string> = {
  like: "❤️",
  comment: "💬",
  follow: "➕",
  mention: "📣",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg">
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </h1>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-3">🔔</div>
          <h2 className="font-semibold mb-1">You're all caught up</h2>
          <p className="text-sm text-zinc-500">New notifications will show up here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => {
            const user = getUserById(n.userId);
            if (!user) return null;
            return (
              <Card
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  !n.read
                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
                    : ""
                }`}
              >
                <Avatar name={user.name} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{user.name}</span> {n.message}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{n.timestamp}</p>
                </div>
                <span className="text-lg">{typeIcon[n.type]}</span>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}