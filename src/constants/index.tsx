import { NavLink, StatItem, FaqItem, HeroSlide, ProductItem } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#layanan", label: "Layanan" },
  { href: "#produk", label: "Produk" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export const WHATSAPP_NUMBER = "6281112001036";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const APP_URL = "https://app.mikrosetting.com/";
export const PHONE = "+62 811-1200-1036";
export const EMAIL = "admin@mikrosetting.com";
export const BUSINESS_HOURS = "Setiap hari, 08.00 â€“ 21.00 WIB";

export const HERO_SLIDES: HeroSlide[] = [
  {
    badge: "Solusi Jaringan Profesional",
    titleLines: [
      [{ text: "Jasa Setting" }],
      [{ text: "MikroTik", color: "cyan" }, { text: ", OLT &" }],
      [{ text: "Ruijie " }, { text: "Profesional", color: "blue-light" }],
    ],
    description:
      "Kami membantu Anda membangun jaringan yang cepat, aman, stabil dan mudah dikelola untuk RT/RW Net, Hotel, Kantor, Sekolah, dan ISP.",
    features: [
      "MikroTik (PPPoE, Hotspot, VPN, Load Balance)",
      "OLT (Data, VSOL, HSGQ, Global, Hioso)",
      "Ruijie & Access Point",
      "Jaringan Kabel & Wireless",
    ],
    image: "/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
    primaryCta: { text: "Konsultasi WhatsApp", href: WHATSAPP_URL },
    secondaryCta: { text: "Lihat Layanan", href: "#layanan" },
  },
  {
    badge: "Akses Remote Aman",
    titleLines: [
      [{ text: "VPN " }, { text: "Port", color: "cyan" }],
      [{ text: "Forwarding", color: "blue-light" }],
    ],
    description:
      "Akses perangkat Anda dari mana saja dengan koneksi VPN yang aman dan stabil â€” tanpa ribet IP Public.",
    features: [
      "Akses CCTV / NVR dari HP",
      "Remote Router / Mikrotik / RDP",
      "Akses Exam / ANBK / ACB",
      "Koneksi Terenkripsi & Anti Putus",
    ],
    image: "/images/751c3bc4-1bc6-40bd-aa78-5b5dde4f7868.png",
    primaryCta: { text: "Pesan VPN Sekarang", href: WHATSAPP_URL },
    secondaryCta: { text: "Pelajari Lebih", href: "#produk" },
  },
  {
    badge: "Manajemen Hotspot",
    titleLines: [
      [{ text: "Mikhmon", color: "cyan" }],
      [{ text: "Online", color: "blue-light" }],
    ],
    description:
      "Kelola jaringan hotspot & voucher Anda dari mana saja, kapan saja â€” langsung dari browser tanpa perlu VPS.",
    features: [
      "Multi Router Management",
      "Voucher & User Management",
      "Monitoring Real-time",
      "Laporan & Statistik Lengkap",
    ],
    image: "/images/b016bc02-0547-4245-9a6f-6b3b9d2b540e.png",
    primaryCta: { text: "Login / Daftar", href: APP_URL },
    secondaryCta: { text: "Chat WhatsApp", href: WHATSAPP_URL },
  },
];

export const STATS: StatItem[] = [
  {
    icon: "router",
    value: "500+",
    label: "Router MikroTik Setup",
  },
  {
    icon: "hotspot",
    value: "100+",
    label: "PPPoE & Hotspot",
  },
  {
    icon: "olt",
    value: "50+",
    label: "Implementasi OLT",
  },
  {
    icon: "guarantee",
    value: "100%",
    label: "Garansi Konfigurasi",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Berapa lama proses pengerjaan setting jaringan?",
    answer:
      "Tergantung kompleksitas jaringan. Setting dasar MikroTik/OLT umumnya selesai dalam 1â€“3 jam, sementara instalasi skala ISP bisa memakan waktu beberapa hari.",
  },
  {
    question: "Apakah bisa setting jaringan secara remote?",
    answer:
      "Bisa. Selama perangkat dapat diakses via VPN atau remote access yang aman, kami dapat mengerjakan konfigurasi dari jarak jauh.",
  },
  {
    question: "Apakah ada garansi setelah pengerjaan?",
    answer:
      "Ya, kami memberikan garansi konfigurasi 100%. Jika ada kendala pada hasil setting, kami perbaiki tanpa biaya tambahan.",
  },
  {
    question: "Apakah melayani seluruh wilayah Indonesia?",
    answer:
      "Untuk layanan remote menjangkau seluruh Indonesia. Untuk kunjungan on-site, silakan konsultasi terlebih dahulu via WhatsApp.",
  },
  {
    question: "Bagaimana cara konsultasi atau pemesanan?",
    answer:
      "Cukup klik tombol Chat WhatsApp di halaman ini, jelaskan kebutuhan Anda, dan tim kami akan membantu prosesnya.",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    badge: "Mikhmon Online",
    title: "Mikhmon Online",
    description:
      "Kelola jaringan hotspot Anda dengan mudah, kapanpun dan dimanapun.",
    features: [
      "Multi Router Management",
      "Voucher & User Management",
      "Monitoring Real-time",
      "Laporan & Statistik Lengkap",
    ],
    image: "/images/62d4909b-d648-4e4f-9666-8ac9016fb1d0.png",
    imageAlt: "Dashboard Mikhmon Online",
    primaryCta: { text: "Login / Daftar", href: APP_URL },
    secondaryCta: { text: "Chat WhatsApp", href: WHATSAPP_URL },
  },
  {
    badge: "Port Forwarding",
    title: "VPN Port Forwarding",
    description:
      "Akses perangkat Anda dari mana saja dengan koneksi VPN yang aman.",
    features: [
      "Akses CCTV / NVR",
      "Akses Router / RDP",
      "Akses Exam / ACB",
      "Aman & Stabil",
    ],
    image: "/images/3b178193-e609-4f9d-8f03-8af3123245a9.png",
    imageAlt: "Ilustrasi VPN Port Forwarding",
    primaryCta: { text: "Login / Daftar", href: APP_URL },
    secondaryCta: { text: "Chat WhatsApp", href: WHATSAPP_URL },
  },
];
