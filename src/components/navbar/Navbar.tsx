"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, WHATSAPP_URL } from "@/constants";
import { MenuIcon, WhatsAppIcon } from "@/components/common/Icons";

// Anchor yang tersedia di semua halaman (footer dipasang site-wide)
const GLOBAL_ANCHORS = ["#kontak"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const resolveHref = useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return href;
      if (isHome || GLOBAL_ANCHORS.includes(href)) return href;
      return `/${href}`;
    },
    [isHome]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      setMobileOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    },
    []
  );

  const kontakHref = "/kontak";

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
          {NAV_LINKS.map((link) => {
            const resolved = resolveHref(link.href);
            return (
              <Link
                key={link.href}
                href={resolved}
                onClick={
                  resolved.startsWith("#")
                    ? (e) => handleAnchorClick(e, resolved)
                    : undefined
                }
                className="hover:text-[var(--blue)] transition"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex items-center gap-1.5 btn-green text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat WA
          </a>
          <Link
            href={kontakHref}
            onClick={
              kontakHref.startsWith("#")
                ? (e) => handleAnchorClick(e, kontakHref)
                : undefined
            }
            className="inline-flex items-center gap-1.5 bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition"
          >
            Login / Daftar
          </Link>
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
          {NAV_LINKS.map((link, i) => {
            const resolved = resolveHref(link.href);
            return (
              <Link
                key={link.href}
                href={resolved}
                onClick={
                  resolved.startsWith("#")
                    ? (e) => handleAnchorClick(e, resolved)
                    : () => setMobileOpen(false)
                }
                className={`py-2.5 ${i < NAV_LINKS.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}