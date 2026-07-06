"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  mockConversations,
  mockChatHistory,
  getUserById,
  ChatMessage,
} from "@/lib/TestData";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  function openChat(userId: string) {
    setActiveChat(userId);
    setConversations((prev) =>
      prev.map((c) => (c.userId === userId ? { ...c, unread: false } : c))
    );
  }

  function sendMessage() {
    if (!draft.trim() || !activeChat) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: "u1",
      text: draft.trim(),
      timestamp: "Just now",
    };
    setChatHistory((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg],
    }));
    setDraft("");
  }

  // Chat detail view 

  if (activeChat) {
    const user = getUserById(activeChat);
    const messages = chatHistory[activeChat] || [];

    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveChat(null)}
            className="text-xl cursor-pointer"
            aria-label="Back"
          >
            ←
          </button>
          <Avatar name={user?.name || "Unknown"} online={user?.online} size="sm" />
          <p className="font-semibold text-sm">{user?.name}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-sm text-zinc-500">Say hello to start the conversation.</p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
               className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                m.senderId === "u1"
              ? "self-end bg-primary-600 text-white"
             : "self-start bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
             }`}
              >
                {m.text}
                <p
                  className={`text-[10px] mt-1 ${
                    m.senderId === "u1" ? "text-primary-100" : "text-zinc-500"
                  }`}
                >
                  {m.timestamp}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-primary-400"
          />
          <Button size="sm" onClick={sendMessage} disabled={!draft.trim()}>
            Send
          </Button>
        </div>
      </div>
    );
  }

  // Conversation list view
  return (
    <div className="p-4">
      <h1 className="font-semibold text-lg mb-4">Messages</h1>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="font-semibold mb-1">No conversations yet</h2>
          <p className="text-sm text-zinc-500">Messages from other users appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {conversations.map((c) => {
            const user = getUserById(c.userId);
            if (!user) return null;
            return (
              <Card
                key={c.id}
                onClick={() => openChat(c.userId)}
                className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
              >
                <Avatar name={user.name} online={user.online} />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{user.name}</p>
                  <p className="text-xs text-zinc-500 truncate max-w-[200px]">
                    {c.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-xs text-zinc-400">{c.timestamp}</p>
                  {c.unread && <span className="w-2 h-2 rounded-full bg-accent-500" />}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}