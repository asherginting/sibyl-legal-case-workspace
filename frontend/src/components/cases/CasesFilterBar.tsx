"use client";

import { useEffect, useRef, useState } from "react";
import { SortDesc, ChevronDown } from "@/icons";

type PostedValue = "any" | "7d" | "30d";
type SortValue = "recent" | "oldest";

export type FilterParams = {
  jurisdiction?: string;
  category?: string;
  posted?: PostedValue;
  sort?: SortValue;
};

type CasesFilterBarProps = FilterParams & {
  onChange: (params: FilterParams) => void;
};

type Option = {
  label: string;
  value?: string;
};

type DropdownProps = {
  id: string;
  label: string;
  value?: string;
  options: Option[];
  isOpen: boolean;
  leadingIcon?: React.ReactNode;
  noWrap?: boolean;
  onToggle: (id: string) => void;
  onSelect: (value?: string) => void;
};

function Dropdown({
  id,
  label,
  value,
  options,
  isOpen,
  leadingIcon,
  noWrap,
  onToggle,
  onSelect,
}: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`
          flex items-center gap-2
          rounded-sm border border-faded bg-white
          px-2.5 py-2
          text-sm hover:bg-weak cursor-pointer
          ${noWrap ? "whitespace-nowrap" : ""}
        `}
      >
        {leadingIcon && (
          <span className="flex items-center">{leadingIcon}</span>
        )}

        <span className="text-muted text-sm font-normal">{label}:</span>

        <span className="text-black-soft text-sm font-normal">
          {value ?? "-"}
        </span>

        <ChevronDown className="size-5 text-placeholder" />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-1 w-full rounded-md border border-faded bg-white shadow-sm">
          {options.map((opt, idx) => (
            <button
              key={`${opt.label}-${idx}`}
              type="button"
              onClick={() => onSelect(opt.value)}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CasesFilterBar({
  jurisdiction,
  category,
  posted,
  sort,
  onChange,
}: CasesFilterBarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDropdown(id: string) {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }

  return (
    <div ref={wrapperRef} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Dropdown
          id="jurisdiction"
          label="Jurisdiction"
          value={jurisdiction}
          isOpen={openDropdown === "jurisdiction"}
          onToggle={toggleDropdown}
          onSelect={(value) => {
            onChange({ jurisdiction: value });
            setOpenDropdown(null);
          }}
          options={[
            { label: "-", value: undefined },
            { label: "Indonesia", value: "Indonesia" },
            { label: "Singapore", value: "Singapore" },
          ]}
        />

        <Dropdown
          id="category"
          label="Category"
          value={category}
          isOpen={openDropdown === "category"}
          onToggle={toggleDropdown}
          onSelect={(value) => {
            onChange({ category: value });
            setOpenDropdown(null);
          }}
          options={[
            { label: "-", value: undefined },
            { label: "Family Law", value: "Family Law" },
            { label: "Commercial", value: "Commercial" },
            {
              label: "Intellectual Property",
              value: "Intellectual Property",
            },
            { label: "Employment Law", value: "Employment Law" },
          ]}
        />

        <Dropdown
          id="posted"
          label="Posted"
          value={
            posted === "any"
              ? "Any time"
              : posted === "7d"
                ? "Last 7 days"
                : posted === "30d"
                  ? "Last 30 days"
                  : undefined
          }
          isOpen={openDropdown === "posted"}
          onToggle={toggleDropdown}
          onSelect={(value) => {
            onChange({ posted: value as PostedValue | undefined });
            setOpenDropdown(null);
          }}
          options={[
            { label: "-", value: undefined },
            { label: "Any time", value: "any" },
            { label: "Last 7 days", value: "7d" },
            { label: "Last 30 days", value: "30d" },
          ]}
        />

        <span className="ml-3 text-sm font-normal text-muted">
          Showing 4 cases
        </span>
      </div>
      <Dropdown
        id="sort"
        label="Sort by"
        value={
          sort === "recent"
            ? "Recent"
            : sort === "oldest"
              ? "Oldest"
              : undefined
        }
        isOpen={openDropdown === "sort"}
        onToggle={toggleDropdown}
        onSelect={(value) => {
          onChange({ sort: value as SortValue | undefined });
          setOpenDropdown(null);
        }}
        leadingIcon={<SortDesc className="size-5 text-placeholder" />}
        noWrap
        options={[
          { label: "-", value: undefined },
          { label: "Recent", value: "recent" },
          { label: "Oldest", value: "oldest" },
        ]}
      />
    </div>
  );
}
