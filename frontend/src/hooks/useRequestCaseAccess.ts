"use client";

import { useState } from "react";

export function useRequestCaseAccess() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function requestAccess(caseId: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases/${caseId}/lawyer/request-access`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to request access");
      }
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    requestAccess,
    loading,
    error,
  };
}
