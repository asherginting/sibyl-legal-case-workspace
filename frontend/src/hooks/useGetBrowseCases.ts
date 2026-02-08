"use client";

import { useEffect, useState } from "react";
import { CaseCardData } from "@/components/cases/CaseCard";

export type BrowseCasesParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  jurisdiction?: string;
  posted?: "any" | "7d" | "30d";
  sort?: "recent" | "oldest";
};

function buildQueryParams(params: BrowseCasesParams) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== ""
    )
  );
}

export function useGetBrowseCases(params: BrowseCasesParams = {}) {
  const [cases, setCases] = useState<CaseCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCases() {
    setLoading(true);
    setError(null);

    try {
      const query = buildQueryParams({ ...params, limit: 6 });
      const searchParams = new URLSearchParams(
        query as Record<string, string>
      ).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases?${searchParams}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error();

      const json = await res.json();
      setCases(json.data);
    } catch {
      setError("Failed to load cases");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCases();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return {
    cases,
    loading,
    error,
    refetch: fetchCases,
  };
}

