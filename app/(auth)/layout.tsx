import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";

import "../globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Connect with your friends online!"
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${font.className} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
