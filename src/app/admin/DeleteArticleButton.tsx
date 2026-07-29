"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Hapus artikel "${title}"?\n\nAksi ini tidak bisa dibatalkan.`)) return;
    setLoading(true);
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Gagal menghapus artikel.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
    >
      {loading ? "..." : "Hapus"}
    </button>
  );
}
