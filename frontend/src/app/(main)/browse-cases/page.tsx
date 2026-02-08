"use client";

import { useState } from "react";
import {
  CasesFilterBar,
  FilterParams,
} from "@/components/cases/CasesFilterBar";
import { CaseCard, CaseCardData } from "@/components/cases/CaseCard";
import { useRouter } from "next/navigation";

const dummyCases: CaseCardData[] = [
  {
    id: "1",
    title: "Potential Breach of Employment Contract",
    description:
      "Client was terminated abruptly after restructuring. Seeking legal advice on recovery of unpaid salary.",
    category: "Employment Law",
    jurisdiction: "Singapore",
    createdAt: "2025-10-15",

    clientLabel: "Client: F",
    attachmentsCount: 2,

    access: {
      status: "GRANTED",
      grantedAt: "15 Oct 2025",
    },

    actions: {
      canOpen: true,
      canRequestAccess: false,
      canWithdraw: false,
    },
  },
  {
    id: "2",
    title: "Child Custody & Access Arrangement",
    description:
      "A 34-year-old female professional was dismissed without notice following a company restructuring.",
    category: "Family Law",
    jurisdiction: "Singapore",
    createdAt: "2025-10-10",

    clientLabel: "Client: M",
    attachmentsCount: 1,

    access: {
      status: null,
      grantedAt: null,
    },

    actions: {
      canOpen: false,
      canRequestAccess: true,
      canWithdraw: false,
    },
  },
  {
    id: "3",
    title: "Non-Payment in Service Agreement",
    description:
      "A local SME owner reports non-payment from a client after project completion.",
    category: "Commercial",
    jurisdiction: "Singapore",
    createdAt: "2025-10-12",

    clientLabel: "Client: F",
    attachmentsCount: 3,

    access: {
      status: "REQUESTED",
      grantedAt: "12 Oct 2025",
    },

    actions: {
      canOpen: false,
      canRequestAccess: false,
      canWithdraw: true,
    },
  },
];

export default function BrowseCases() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterParams>({});

  function handleOpenCase(id: string) {
    router.push(`/browse-cases/${id}`);
  }

  function handleRequestAccess(id: string) {
    console.log("Request access for case:", id);
  }

  function handleWithdraw(id: string) {
    console.log("Open withdraw modal for case:", id);
  }

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
        {dummyCases.map((item) => (
          <CaseCard
            key={item.id}
            data={item}
            onOpenCase={handleOpenCase}
            onRequestAccess={handleRequestAccess}
            onWithdraw={handleWithdraw}
          />
        ))}
      </div>
    </div>
  );
}
