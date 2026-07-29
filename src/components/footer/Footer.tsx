"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE, EMAIL, BUSINESS_HOURS, WHATSAPP_URL } from "@/constants";

// Anchor yang tersedia di semua halaman (footer dipasang site-wide)
const GLOBAL_ANCHORS = ["#kontak"];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    if (isHome || GLOBAL_ANCHORS.includes(href)) return href;
    return `/${href}`;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  const anchorLink = (href: string, label: string) => {
    const resolved = resolveHref(href);
    return (
      <Link
        href={resolved}
        onClick={
          resolved.startsWith("#")
            ? (e) => handleAnchorClick(e, resolved)
            : undefined
        }
        className="hover:text-white transition"
      >
        {label}
      </Link>
    );
  };

  return (
    <footer id="kontak" className="bg-[var(--navy)] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] text-white font-head font-bold">
              M
            </span>
            <span className="font-head font-extrabold text-lg text-white">
              Mikro<span className="text-[var(--cyan)]">Setting</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400">
            Solusi profesional untuk setting jaringan MikroTik, OLT, Ruijie, dan Access Point.
          </p>
        </div>
        <div>
          <h4 className="font-head font-semibold text-white mb-3">Layanan</h4>
          <ul className="space-y-2 text-sm">
            <li>{anchorLink("#layanan", "Jasa Setting MikroTik")}</li>
            <li>{anchorLink("#layanan", "Jasa Setting OLT")}</li>
            <li>{anchorLink("#layanan", "Jasa Setting Ruijie")}</li>
            <li>{anchorLink("#layanan", "Jasa Setting Access Point")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-head font-semibold text-white mb-3">
            Mikhmon & Port Forwarding
          </h4>
          <ul className="space-y-2 text-sm">
            <li>{anchorLink("#produk", "Mikhmon Online")}</li>
            <li>{anchorLink("#produk", "VPN Port Forwarding")}</li>
            <li>{anchorLink("#faq", "FAQ")}</li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog & Panduan
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-white transition">
                Tentang Kami
              </Link>
            </li>
            <li>{anchorLink("#kontak", "Kontak")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-head font-semibold text-white mb-3">Kontak Kami</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-[var(--cyan)]">✆</span> {PHONE}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--cyan)]">✉</span> {EMAIL}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--cyan)]">◷</span> {BUSINESS_HOURS}
            </li>
            <li className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="grid place-items-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid place-items-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                ◎
              </a>
              <a
                href={WHATSAPP_URL}
                aria-label="WhatsApp"
                className="grid place-items-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                ✆
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© 2026 MikroSetting. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}