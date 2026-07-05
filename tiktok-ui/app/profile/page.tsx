"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import TabSwitcher from "@/components/TabSwitcher";
import { currentUser, mockPosts } from "@/lib/TestData";

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");

  const postsTab = mockPosts.filter((p) => p.userId === currentUser.id);
  const savedTab = mockPosts.filter((p) => p.saved);

  const shown = activeTab === "Posts" ? postsTab : savedTab;

  return (
    <div>
      <div className="p-6 flex flex-col items-center text-center border-b border-zinc-200 dark:border-zinc-800">
        <Avatar name={currentUser.name} size="xl" online={currentUser.online} />
        <h1 className="font-semibold text-lg mt-3">{currentUser.name}</h1>
        <p className="text-sm text-zinc-500">@{currentUser.username}</p>
        <p className="text-sm mt-2 max-w-xs">{currentUser.bio}</p>

        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <p className="font-semibold">{currentUser.followers.toLocaleString()}</p>
            <p className="text-zinc-500 text-xs">Followers</p>
          </div>
          <div>
            <p className="font-semibold">{currentUser.following.toLocaleString()}</p>
            <p className="text-zinc-500 text-xs">Following</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="mt-4">
          Edit Profile
        </Button>
      </div>

      <TabSwitcher
        tabs={["Posts", "Saved"]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="p-4">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">{activeTab === "Posts" ? "📷" : "🔖"}</div>
            <h2 className="font-semibold mb-1">
              {activeTab === "Posts" ? "No posts yet" : "Nothing saved yet"}
            </h2>
            <p className="text-sm text-zinc-500">
              {activeTab === "Posts"
                ? "Your posts will show up here."
                : "Posts you save will show up here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {shown.map((post) => (
              <div
                key={post.id}
                className="aspect-square rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs p-2 text-center"
              >
                {post.caption.slice(0, 30)}...
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}