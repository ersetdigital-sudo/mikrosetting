import { requireAdmin } from "@/lib/admin-auth";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-[var(--blue)]">Pengaturan</p>
        <h1 className="font-head font-extrabold text-2xl text-[var(--navy)] mt-1">Ganti Password Admin</h1>
        <p className="text-sm text-slate-500 mt-1">
          Password baru berlaku untuk semua login berikutnya dan tersimpan permanen. Kamu tetap login di perangkat ini.
        </p>
      </div>
      <ChangePasswordForm />
    </main>
  );
}
