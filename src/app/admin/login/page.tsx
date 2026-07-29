import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) redirect("/admin");

  return (
    <main className="min-h-screen grid place-items-center bg-gradient-to-br from-[var(--navy)] via-[var(--navy-2)] to-[var(--blue)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-white font-head font-extrabold text-2xl">M</span>
          <h1 className="font-head font-extrabold text-2xl text-white mt-4">Admin MikroSetting</h1>
          <p className="text-sm text-blue-100 mt-1">Masuk untuk mengelola artikel blog.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
