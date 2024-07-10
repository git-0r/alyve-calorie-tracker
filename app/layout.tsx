import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food tracker",
  description: "Created by git-0r",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={cn(spaceGrotesk.className, "p-4 max-w-xl m-auto bg-white")}
        >
          <nav className="flex gap-4 border-b p-4">
            <Link href="/">Home</Link>
            <Link href="/analytics">Analytics</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
