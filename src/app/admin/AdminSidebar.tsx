"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "@/components/common/Icons";
import LogoutButton from "./LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Artikel" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/pengaturan", label: "Pengaturan" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean): string {
  return `block rounded-lg px-3 py-2.5 text-sm font-bold transition ${
    active ? "bg-white/15 text-white" : "text-blue-100 hover:bg-white/10 hover:text-white"
  }`;
}

const SIDEBAR_LOGOUT_CLASS =
  "block w-full text-center text-sm font-bold rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2.5 transition disabled:opacity-50";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar + dropdown menu */}
      <div className="lg:hidden sticky top-0 z-40 bg-[var(--navy)] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/admin" className="flex items-center gap-2 font-head font-extrabold tracking-tight" onClick={() => setOpen(false)}>
            <Image src="/images/logo-mark-white.png" alt="MikroSetting" width={26} height={26} className="w-6.5 h-6.5" />
            MikroSetting <span className="text-[var(--cyan)]">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu admin"
            aria-expanded={open}
            className="grid place-items-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
        {open && (
          <div className="border-t border-white/10 px-4 py-3 space-y-1 bg-[var(--navy)]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={navLinkClass(isActive(pathname, item.href))}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/artikel/baru"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-[var(--blue)] hover:bg-[var(--navy-2)] px-3 py-2.5 text-sm font-bold text-white text-center transition mt-2"
            >
              + Tulis Artikel Baru
            </Link>
            <a
              href="/blog"
              target="_blank"
              rel="noopener"
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-100 hover:bg-white/10 hover:text-white transition text-center"
            >
              Lihat Blog ↗
            </a>
            <div className="pt-1">
              <LogoutButton className={SIDEBAR_LOGOUT_CLASS} />
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen bg-[var(--navy)] text-white">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2 font-head font-extrabold tracking-tight">
            <Image src="/images/logo-mark-white.png" alt="MikroSetting" width={28} height={28} className="w-7 h-7 shrink-0" />
            <span>
              MikroSetting <span className="text-[var(--cyan)]">Admin</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(isActive(pathname, item.href))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <Link
            href="/admin/artikel/baru"
            className="block rounded-lg bg-[var(--blue)] hover:bg-[var(--navy-2)] px-3 py-2.5 text-sm font-bold text-white text-center transition"
          >
            + Tulis Artikel Baru
          </Link>
          <a
            href="/blog"
            target="_blank"
            rel="noopener"
            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-100 hover:bg-white/10 hover:text-white transition text-center"
          >
            Lihat Blog ↗
          </a>
          <LogoutButton className={SIDEBAR_LOGOUT_CLASS} />
        </div>
      </aside>
    </>
  );
}
