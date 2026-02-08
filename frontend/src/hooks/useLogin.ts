"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      const json = await res.json();
      setUser(json.data.user);
      router.replace("/browse-cases");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
