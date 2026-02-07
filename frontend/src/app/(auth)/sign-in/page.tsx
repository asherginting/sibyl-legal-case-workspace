"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SibylLogo } from "@/icons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      router.replace("/browse-cases");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-weak">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div className="justify-center flex">
          <SibylLogo className="w-12 h-6 text-brand-dark" />
        </div>
        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-8 rounded py-2text-white font-medium transition cursor-pointer"
          style={{
            background:
              "linear-gradient(0deg, #FF6A2B, #FF6A2B), linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)",
            border: "1px solid",
            borderImageSource:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)",
            borderImageSlice: 1,
            boxShadow:
              "0px 0px 0px 1px #FF6A2B, 0px 1px 2px 0px rgba(18,17,15,0.24)",
          }}
        >
          <p className="text-sm text-white">{loading ? "Signing in..." : "Sign in"}</p>
        </button>
      </form>
    </div>
  );
}
