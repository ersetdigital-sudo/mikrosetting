"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { className?: string };

const DEFAULT_CLASS = "text-sm font-bold rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition disabled:opacity-50";

export default function LogoutButton({ className }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={className ?? DEFAULT_CLASS}
    >
      {loading ? "..." : "Logout"}
    </button>
  );
}
