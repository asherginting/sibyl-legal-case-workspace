"use client";

import { createContext, useContext, useState } from "react";

type User = {
  id: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clear: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: false,
        setUser,
        clear: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
