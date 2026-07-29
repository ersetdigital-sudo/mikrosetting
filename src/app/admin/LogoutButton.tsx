"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
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
      className="text-sm font-bold rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition disabled:opacity-50"
    >
      {loading ? "..." : "Logout"}
    </button>
  );
}
