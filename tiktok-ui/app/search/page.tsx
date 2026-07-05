"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import { mockUsers } from "@/lib/TestData";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search users by name or username..."
      />

      {query && filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-3">🔎</div>
          <h2 className="font-semibold mb-1">No results found</h2>
          <p className="text-sm text-zinc-500">
            Try searching a different name or username.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {(query ? filteredUsers : mockUsers).map((user) => (
            <Link key={user.id} href={`/profile/${user.id}`}>
              <Card className="p-3 flex items-center gap-3 hover:border-primary-400 dark:hover:border-primary-600 transition-colors cursor-pointer">
                <Avatar name={user.name} online={user.online} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-zinc-500">@{user.username}</p>
                </div>
                <span className="text-xs text-zinc-400">
                  {user.followers.toLocaleString()} followers
                </span>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}