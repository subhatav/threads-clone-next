import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";

import "../globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Connect with your friends online!",
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} afterSignOutUrl="/">
      <html lang="en">
        <body className={font.className}>
          <main className="flex flex-row">
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
