"use client";

import { useState } from "react";

export function useWithdrawCaseAccess() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function withdrawAccess(caseId: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases/${caseId}/lawyer/withdraw-access`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to withdraw access");
      }
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    withdrawAccess,
    loading,
    error,
  };
}
