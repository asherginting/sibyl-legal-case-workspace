"use client";

import { Notification, Search } from "@/icons";
import { usePathname } from "next/navigation";

const TITLE_MAP: Record<string, string> = {
  "/browse-cases": "Browse Cases",
  "/my-cases": "My Cases",
  "/messages": "Messages",
};

const PLACEHOLDER_MAP: Record<string, string> = {
  "/browse-cases": "Search cases...",
  "/my-cases": "Search My cases...",
  "/messages": "Search messages...",
};

export default function Header() {
  const pathname = usePathname();
  const title = TITLE_MAP[pathname] ?? "";
  const placeholder = PLACEHOLDER_MAP[pathname] ?? "";

  return (
    <div className="py-4 px-6 border-b border-faded flex items-center justify-between">
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-faded rounded-md w-60">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            type="text"
            placeholder={placeholder }
            className="flex-1 text-sm font-normal outline-none bg-transparent placeholder:text-muted text-muted"
          />
        </div>
        <div className="h-6 border-l border-faded" />
        <Notification className="w-5 h-5 text-muted" />
        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-xs font-medium">
          JH
        </div>
      </div>
    </div>
  );
}
