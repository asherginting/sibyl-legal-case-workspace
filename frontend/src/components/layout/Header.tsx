"use client";

import { Notification, Search } from "@/icons";
import { usePathname, useRouter } from "next/navigation";

const TITLE_MAP: Record<string, string> = {
  "/browse-cases": "Browse Cases",
  "/my-cases": "My Cases",
  "/messages": "Messages",
};

const PLACEHOLDER_MAP: Record<string, string> = {
  "/browse-cases": "Search cases...",
  "/my-cases": "Search my cases...",
  "/messages": "Search messages...",
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const title = TITLE_MAP[pathname] ?? "";
  const placeholder = PLACEHOLDER_MAP[pathname] ?? "";

  async function handleLogout() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } finally {
      router.replace("/sign-in");
    }
  }

  return (
    <div className="py-4 px-6 border-b border-faded flex items-center justify-between">
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-faded rounded-md w-60">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted text-muted"
          />
        </div>
        <div className="h-6 border-l border-faded" />
        <Notification className="w-5 h-5 text-muted" />
        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-xs font-medium">
          P
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-1 rounded hover:bg-faded transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-muted"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
