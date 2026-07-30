import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthed } from "@/lib/admin-auth";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthed();

  if (!authed) {
    // Halaman login berdiri sendiri tanpa chrome admin
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 bg-[var(--navy)] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link href="/admin" className="flex items-center gap-2 font-head font-extrabold tracking-tight">
              <Image src="/images/logo-mark-white.png" alt="MikroSetting" width={28} height={28} className="w-7 h-7" />
              MikroSetting <span className="text-[var(--cyan)]">Admin</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm text-blue-100">
              <Link href="/admin" className="hover:text-white transition">Artikel</Link>
              <Link href="/admin/artikel/baru" className="hover:text-white transition">+ Tulis Baru</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/blog" target="_blank" rel="noopener" className="text-sm text-blue-100 hover:text-white transition">
              Lihat Blog ↗
            </a>
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
