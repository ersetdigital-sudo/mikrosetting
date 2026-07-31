"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    const data = (await res.json().catch(() => null)) as { ok: boolean; error?: string } | null;
    setSaving(false);

    if (!res.ok || !data?.ok) {
      setNotice({ ok: false, text: data?.error ?? "Gagal mengganti password." });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNotice({ ok: true, text: "Password berhasil diganti." });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5">Password saat ini</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5">Password baru</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
        />
        <p className="text-[11px] text-slate-400 mt-1.5">Minimal 8 karakter.</p>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5">Konfirmasi password baru</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
        />
      </div>

      {notice && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            notice.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {notice.text}
        </div>
      )}

      <button
        type="submit"
        disabled={saving || !currentPassword || !newPassword || !confirmPassword}
        className="w-full h-11 rounded-xl bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white font-bold transition disabled:opacity-50"
      >
        {saving ? "Menyimpan..." : "Simpan Password Baru"}
      </button>
    </form>
  );
}
