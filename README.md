# Frolic : TikTok-Style Social Feed UI

## Project Overview

Frolic is a frontend-only, TikTok-style social media platform UI built with Next.js App Router. The project focuses on component architecture, state management, responsive design, and clean UI/UX patterns — no backend, API integration, or video playback is included, as per assessment scope. All data is powered by static mock data to simulate a real social feed experience.

## Features Implemented

- **Home Feed** — displays user avatar, username, caption, likes, comments, and functional Like / Save / Share actions with live UI feedback
- **Search Page** — live search and filtering of mock users by name/username, with navigation to individual profiles
- **Profile Page** — own profile and other users' profiles, with Posts / Saved tabs and a working Follow button
- **Notifications Page** — mock notifications list with mark-as-read (individual and mark-all) functionality
- **Messages Page** — conversation list and a full chat view supporting sending mock messages in real time
- **Settings Page** — theme toggle (light/dark), notification on/off toggle, and language selector, each with visible save feedback
- **Reusable Components** — Button, Avatar, Card, Modal, Navbar, ThemeToggle, SearchInput, TabSwitcher — used consistently across all pages
- **Responsive Design** — fully responsive across mobile, tablet, and desktop, including a bottom tab bar on mobile and a top navbar on larger screens
- **Loading & Empty States** — skeleton loading placeholders and meaningful empty states across feed, search, notifications, and messages
- **Light & Dark Theming** — custom Purple and Orange color palette, toggle-able and persisted via next-themes

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Theming:** next-themes (light/dark mode)
- **State Management:** React useState (component-level state)

## Installation Instructions

1. Clone the repository:
```bash
   git clone <your-repo-url>
   cd TikTok-style-UI
   cd tiktok-ui
```
2. Install dependencies:
```bash
   npm install
```

## Run Instructions

Start the development server:
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000).

To create a production build:
```bash
npm run build
npm run start
```

## Design Decisions

- **Purple as primary, orange as accent:** purple is used throughout as the dominant brand color (navbar, buttons, active states), while orange is reserved for specific attention cues — liked posts and unread indicators — so it stands out rather than competing with purple.
- **Mobile-first navigation:** a bottom tab bar is used on mobile (matching real TikTok-style app conventions), switching to a top navbar on tablet/desktop where horizontal space allows.
- **Component reusability:** all core UI elements (Button, Card, Avatar, etc.) were built as generic, prop-driven components first, then composed into pages — avoiding page-specific one-off styling.
- **Mock data layer:** a single typed mock data file centralizes all fake users, posts, notifications, and messages, keeping page components focused on UI logic rather than data shape.

