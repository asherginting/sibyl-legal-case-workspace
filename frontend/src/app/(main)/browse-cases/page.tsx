"use client";

import { useState } from "react";
import {
  CasesFilterBar,
  FilterParams,
} from "@/components/cases/CasesFilterBar";
import { CaseCard } from "@/components/cases/CaseCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetBrowseCases } from "@/hooks/useGetBrowseCases";
import { WithdrawAccessModal } from "@/components/cases/WithdrawAccessModal";
import { useRequestCaseAccess } from "@/hooks/useRequestCaseAccess";
import { useWithdrawCaseAccess } from "@/hooks/useWithdrawCaseAccess";

export default function BrowseCases() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [withdrawCaseId, setWithdrawCaseId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const { cases, loading, error, refetch } = useGetBrowseCases({
    ...filters,
    limit: 6,
    search,
  });
  const { requestAccess } = useRequestCaseAccess();
  const { withdrawAccess } = useWithdrawCaseAccess();

  function handleOpenCase(id: string) {
    router.push(`/browse-cases/${id}`);
  }

  async function handleRequestAccess(id: string) {
    try {
      await requestAccess(id);
      await refetch();
    } catch {}
  }

  function handleWithdraw(id: string) {
    setWithdrawCaseId(id);
  }

  async function handleConfirmWithdraw() {
    if (!withdrawCaseId) return;

    try {
      await withdrawAccess(withdrawCaseId);
      await refetch();
    } catch {
    } finally {
      setWithdrawCaseId(null);
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <CasesFilterBar
        jurisdiction={filters.jurisdiction}
        category={filters.category}
        posted={filters.posted}
        sort={filters.sort}
        total={cases.length}
        onChange={(next) =>
          setFilters((prev) => ({
            ...prev,
            ...next,
          }))
        }
      />

      {loading && <div className="text-sm text-muted">Loading cases...</div>}

      {error && <div className="text-sm text-red-500">{error}</div>}

      {!loading && !error && cases.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-sm text-muted">
          Case not found!
        </div>
      )}

      {cases.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
          {cases.map((item) => (
            <CaseCard
              key={item.id}
              data={item}
              onOpenCase={handleOpenCase}
              onRequestAccess={handleRequestAccess}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>
      )}

      <WithdrawAccessModal
        open={withdrawCaseId !== null}
        title="Withdraw access request?"
        description="You’ll be removed from the client’s list of requesting lawyers. You can request access again later."
        onCancel={() => setWithdrawCaseId(null)}
        onWithdraw={handleConfirmWithdraw}
      />
    </div>
  );
}
