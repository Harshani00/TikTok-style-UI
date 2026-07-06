export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  followers: number;
  following: number;
  online: boolean;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "mention";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  userId: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export const mockUsers: User[] = [
  { id: "u1", name: "Ann Silva", username: "ann.s", bio: "ML & healthcare data research enthusiast", followers: 1240, following: 180, online: true },
  { id: "u2", name: "Jhon Doe", username: "jhon.d", bio: "Frontend developer 👨‍🎓", followers: 890, following: 210, online: true },
  { id: "u3", name: "Rebecca Ross", username: "rebbeca@r", bio: "Photographer 📸 traveling the island", followers: 3400, following: 95, online: false },
  { id: "u4", name: "Tahereh Mafi", username: "tahereh.m", bio: "Writer", followers: 560, following: 340, online: true },
  { id: "u5", name: "Alex Franklin", username: "Alex_F", bio: "Singer 🎵", followers: 2100, following: 150, online: false },
];

export const currentUser: User = {
  id: "u1",
  name: "Ann Silva",
  username: "ann.s",
  bio: "ML & healthcare data research enthusiast | building things with data",
  followers: 1240,
  following: 180,
  online: true,
};

export const mockPosts: Post[] = [
  { id: "p1", userId: "u2", caption: "Shipped a new feature today 🚀 feels good", likes: 245, comments: 12, liked: false, saved: false, timestamp: "2h ago" },
  { id: "p2", userId: "u3", caption: "Sunrise over Ella this morning, worth the early wake up 🌄", likes: 892, comments: 45, liked: true, saved: true, timestamp: "5h ago" },
  { id: "p3", userId: "u4", caption: "A word after a word after a word is power", likes: 156, comments: 23, liked: false, saved: false, timestamp: "8h ago" },
  { id: "p4", userId: "u5", caption: "New track dropping this Friday, stay tuned 🎵", likes: 430, comments: 67, liked: false, saved: false, timestamp: "1d ago" },
  { id: "p5", userId: "u2", caption: "Tried making kottu for the first time, verdict: 8/10 👌 😄", likes: 78, comments: 34, liked: false, saved: false, timestamp: "1d ago" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", userId: "u2", type: "like", message: "liked your post", timestamp: "10m ago", read: false },
  { id: "n2", userId: "u3", type: "follow", message: "started following you", timestamp: "1h ago", read: false },
  { id: "n3", userId: "u4", type: "comment", message: "commented: \"this is great!\"", timestamp: "3h ago", read: true },
  { id: "n4", userId: "u5", type: "mention", message: "mentioned you in a comment", timestamp: "1d ago", read: true },
];

export const mockConversations: Message[] = [
  { id: "c1", userId: "u2", lastMessage: "Hey, did you check the deployment?", timestamp: "2m ago", unread: true },
  { id: "c2", userId: "u3", lastMessage: "Those photos turned out amazing", timestamp: "1h ago", unread: false },
  { id: "c3", userId: "u4", lastMessage: "Sending the recipe now 🍜", timestamp: "3h ago", unread: true },
  { id: "c4", userId: "u5", lastMessage: "Let me know what you think of the track", timestamp: "1d ago", unread: false },
];

export const mockChatHistory: Record<string, ChatMessage[]> = {
  u2: [
    { id: "m1", senderId: "u2", text: "Hey, did you check the deployment?", timestamp: "10:02 AM" },
    { id: "m2", senderId: "u1", text: "Yep, looks good on my end!", timestamp: "10:05 AM" },
  ],
  u3: [
    { id: "m3", senderId: "u3", text: "Those photos turned out amazing 😇", timestamp: "9:00 AM" },
  ],
  u4: [
    { id: "m4", senderId: "u4", text: "Sending the recipe now 🍜", timestamp: "7:45 AM" },
  ],
  u5: [
    { id: "m5", senderId: "u5", text: "Let me know what you think of the track 🎵", timestamp: "Yesterday" },
  ],
};

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id) || (id === currentUser.id ? currentUser : undefined);
}