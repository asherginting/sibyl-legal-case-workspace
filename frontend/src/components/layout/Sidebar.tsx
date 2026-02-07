"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SibylLogo, PageTextSearch, FolderPaper, BubbleMessage } from "@/icons";

const navItems = [
  {
    label: "Browse Cases",
    icon: PageTextSearch,
    href: "/browse-cases",
  },
  {
    label: "My Cases",
    icon: FolderPaper,
    href: "/my-cases",
  },
  {
    label: "Messages",
    icon: BubbleMessage,
    href: "/messages",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 pl-3 py-4 flex flex-col h-screen">
      <div className="p-3">
        <SibylLogo className="w-12 h-6 text-brand-dark" />
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center rounded-md gap-2 py-2 px-3 text-sm transition-colors
                ${
                  isActive
                    ? "bg-faded text-main font-medium"
                    : "text-secondary hover:bg-faded"
                }
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />{" "}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-white border border-faded rounded-lg p-3 shadow-sm cursor-pointer hover:border-brand/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-main">Get started</span>
            <div className="flex items-center gap-1 text-xs text-secondary">
              <span>2/2</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
          <div className="h-1.5 w-full bg-weak rounded-full overflow-hidden">
            <div className="h-full bg-brand w-full rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
