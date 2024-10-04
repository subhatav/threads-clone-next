import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter as FontSans } from "next/font/google";

import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import TopBar from "@/components/shared/TopBar";

import "../globals.css";

const fontSans = FontSans({
  subsets: ["latin"], variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Threads Clone", creator: "Ph4nToM",
  description: "Connect with your friends online!"
};

export default function RootLayout(
  // eslint-disable-next-line no-undef
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(fontSans.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
