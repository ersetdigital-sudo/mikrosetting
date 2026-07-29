"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { NAV_LINKS, WHATSAPP_URL } from "@/constants";
import { MenuIcon, WhatsAppIcon } from "@/components/common/Icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] text-white font-head font-bold">
            M
          </span>
          <span className="font-head font-extrabold text-lg tracking-tight text-[var(--navy)]">
            Mikro<span className="text-[var(--blue)]">Setting</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--blue)] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex items-center gap-1.5 btn-green text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat WA
          </a>
          <a
            href="#kontak"
            className="inline-flex items-center gap-1.5 bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition"
          >
            Login / Daftar
          </a>
          <button
            onClick={toggleMobile}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700"
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${mobileOpen ? "" : "hidden"} border-t border-slate-200 bg-white`}
      >
        <nav className="px-4 py-3 flex flex-col text-sm font-medium text-slate-700">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`py-2.5 ${i < NAV_LINKS.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}