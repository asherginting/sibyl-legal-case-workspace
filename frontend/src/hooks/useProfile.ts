import { useAuth } from "@/providers/AuthProvider";

export function useProfile() {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    roleInitial: user?.role?.slice(0, 2).toUpperCase(),
  };
}
