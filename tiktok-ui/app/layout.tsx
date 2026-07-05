import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pulse — Social",
  description: "A TikTok-style social feed UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="max-w-2xl mx-auto pb-20 md:pb-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}