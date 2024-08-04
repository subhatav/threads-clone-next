import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter as FontSans } from "next/font/google";

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
        {/* <body className={`${fontSans.className} bg-dark-1`}> */}
        <body className={`${cn(fontSans.variable,
          "min-h-screen bg-background font-sans antialiased"
        )} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
