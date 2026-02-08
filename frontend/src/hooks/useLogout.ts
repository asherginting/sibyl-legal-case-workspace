"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function useLogout() {
  const router = useRouter();
  const { clear } = useAuth();

  async function logout() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } finally {
      clear();
      router.replace("/sign-in");
      router.refresh();
    }
  }

  return { logout };
}
