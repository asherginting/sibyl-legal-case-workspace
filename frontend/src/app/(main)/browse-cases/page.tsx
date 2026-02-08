"use client";

import { useState } from "react";
import {
  CasesFilterBar,
  FilterParams,
} from "@/components/cases/CasesFilterBar";

export default function BrowseCases() {
  const [filters, setFilters] = useState<FilterParams>({});
  return (
    <div className="flex flex-col gap-3">
      <CasesFilterBar
        jurisdiction={filters.jurisdiction}
        category={filters.category}
        posted={filters.posted}
        sort={filters.sort}
        onChange={(next) =>
          setFilters((prev) => ({
            ...prev,
            ...next,
          }))
        }
      />
    </div>
  );
}
