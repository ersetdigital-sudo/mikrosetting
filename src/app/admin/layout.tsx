import type { Metadata } from "next";
import { isAdminAuthed } from "@/lib/admin-auth";
import AdminSidebar from "./AdminSidebar";

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
    <div className="min-h-screen bg-slate-100 lg:flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
