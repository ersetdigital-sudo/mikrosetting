"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Login gagal.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full h-11 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-[var(--blue)] focus:ring-4 focus:ring-blue-100 transition"
          placeholder="••••••••••"
        />
      </div>
      {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full h-11 rounded-xl bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white font-bold transition disabled:opacity-50"
      >
        {loading ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
