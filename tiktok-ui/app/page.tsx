"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { mockPosts, getUserById, Post } from "@/lib/TestData";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }

  function toggleSave(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
  }

  function handleShare(id: string) {
    navigator.clipboard?.writeText(`https://pulse.app/post/${id}`);
    alert("Link copied to clipboard!");
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-lg font-semibold mb-1">No posts yet</h2>
        <p className="text-zinc-500 text-sm">Follow people to see their posts here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-40 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </Card>
          ))
        : posts.map((post) => {
            const user = getUserById(post.userId);
            if (!user) return null;
            return (
              <Card key={post.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={user.name} online={user.online} />
                  <div>
                    <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{user.name}</p>
                    <p className="text-xs text-zinc-500">
                      @{user.username} · {post.timestamp}
                    </p>
                  </div>
                </div>

                <div className="w-full h-56 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm mb-3">
                  Video preview
                </div>

                <p className="text-sm mb-3 text-zinc-900 dark:text-zinc-50">{post.caption}</p>

                <div className="flex items-center gap-2">
                  <Button
                    variant={post.liked ? "accent" : "ghost"}
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                  >
                    {post.liked ? "❤️" : "🤍"} {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    💬 {post.comments}
                  </Button>
                  <Button
                    variant={post.saved ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => toggleSave(post.id)}
                  >
                    {post.saved ? "🔖 Saved" : "🏷 Save"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                    ↗️ Share
                  </Button>
                </div>
              </Card>
            );
          })}
    </div>
  );
}