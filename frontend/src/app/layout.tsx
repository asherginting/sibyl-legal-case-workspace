import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sibyl Legal Case Workspace",
  description: "Sibyl Legal Case Workspace by Asher Azriel Ginting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${dmSans.variable}
          ${newsreader.variable}
          antialiased
        `}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
