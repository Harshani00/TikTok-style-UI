// For viewing other users' profiles

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import TabSwitcher from "@/components/TabSwitcher";
import { getUserById, mockPosts } from "@/lib/TestData";

export default function UserProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("Posts");
  const [following, setFollowing] = useState(false);

  const user = getUserById(id);
  const postsTab = mockPosts.filter((p) => p.userId === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-4xl mb-3">🚫</div>
        <h2 className="font-semibold">User not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 flex flex-col items-center text-center border-b border-zinc-200 dark:border-zinc-800">
        <Avatar name={user.name} size="xl" online={user.online} />
        <h1 className="font-semibold text-lg mt-3 text-zinc-900 dark:text-zinc-50"></h1>
        <p className="text-sm text-zinc-500">@{user.username}</p>
        <p className="text-sm mt-2 max-w-xs">{user.bio}</p>

        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <p className="font-semibold">{user.followers.toLocaleString()}</p>
            <p className="text-zinc-500 text-xs">Followers</p>
          </div>
          <div>
            <p className="font-semibold">{user.following.toLocaleString()}</p>
            <p className="text-zinc-500 text-xs">Following</p>
          </div>
        </div>

        <Button
          variant={following ? "outline" : "primary"}
          size="sm"
          className="mt-4"
          onClick={() => setFollowing(!following)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>

      <TabSwitcher tabs={["Posts"]} activeTab={activeTab} onChange={setActiveTab} />

      <div className="p-4">
        {postsTab.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">📷</div>
            <h2 className="font-semibold mb-1">No posts yet</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {postsTab.map((post) => (
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