import { NavLink, StatItem, FaqItem, HeroSlide, ProductItem, BlogArticle } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#layanan", label: "Layanan" },
  { href: "#produk", label: "Produk" },
  { href: "/blog", label: "Blog" },
  { href: "#kontak", label: "Kontak" },
];

export const WHATSAPP_NUMBER = "6281234567890";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE = "+62 812-3456-7890";
export const EMAIL = "admin@mikrosetting.com";
export const BUSINESS_HOURS = "Setiap hari, 08.00 – 21.00 WIB";

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
      "Akses perangkat Anda dari mana saja dengan koneksi VPN yang aman dan stabil — tanpa ribet IP Public.",
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
      "Kelola jaringan hotspot & voucher Anda dari mana saja, kapan saja — langsung dari browser tanpa perlu VPS.",
    features: [
      "Multi Router Management",
      "Voucher & User Management",
      "Monitoring Real-time",
      "Laporan & Statistik Lengkap",
    ],
    image: "/images/b016bc02-0547-4245-9a6f-6b3b9d2b540e.png",
    primaryCta: { text: "Login / Daftar", href: "#kontak" },
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
      "Tergantung kompleksitas jaringan. Setting dasar MikroTik/OLT umumnya selesai dalam 1–3 jam, sementara instalasi skala ISP bisa memakan waktu beberapa hari.",
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
    primaryCta: { text: "Login / Daftar", href: "#kontak" },
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
    primaryCta: { text: "Login / Daftar", href: "#kontak" },
    secondaryCta: { text: "Chat WhatsApp", href: WHATSAPP_URL },
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "optimasi",
    title: "7 Langkah Optimasi MikroTik agar Jaringan Lebih Stabil",
    category: "MikroTik",
    date: "18 Feb 2025",
    readTime: "8 menit baca",
    lead: "Mulai dari pembagian bandwidth, DNS, firewall, sampai monitoring—ini checklist dasar yang membantu jaringan tetap cepat saat trafik sedang padat.",
    image: "/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
    featured: true,
    categoryColor: "text-[var(--blue)]",
  },
  {
    slug: "load-balance",
    title: "Cara Setting Load Balance 2 ISP Tanpa Bikin Koneksi Putus",
    category: "MikroTik",
    date: "12 Feb 2025",
    readTime: "7 menit baca",
    lead: "Panduan pembagian trafik yang lebih seimbang dengan failover otomatis saat salah satu jalur bermasalah.",
    image: "/images/751c3bc4-1bc6-40bd-aa78-5b5dde4f7868.png",
    categoryColor: "text-[var(--blue)]",
  },
  {
    slug: "olt",
    title: "Mengenal OLT, ODC, ODP, dan ONU untuk Pemula",
    category: "OLT & Fiber",
    date: "8 Feb 2025",
    readTime: "6 menit baca",
    lead: "Pahami fungsi setiap perangkat dalam jaringan FTTH sebelum mulai merancang distribusi fiber.",
    image: "/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
    categoryColor: "text-cyan-600",
  },
  {
    slug: "hotspot",
    title: "Checklist Membangun Hotspot Voucher yang Siap Jual",
    category: "WiFi",
    date: "3 Feb 2025",
    readTime: "9 menit baca",
    lead: "Dari desain paket, user profile, hingga cetak voucher dan laporan penjualan harian.",
    image: "/images/b016bc02-0547-4245-9a6f-6b3b9d2b540e.png",
    categoryColor: "text-violet-600",
  },
  {
    slug: "firewall",
    title: "5 Firewall Rule Wajib untuk Mengamankan Router",
    category: "Keamanan",
    date: "28 Jan 2025",
    readTime: "5 menit baca",
    lead: "Proteksi dasar untuk mengurangi risiko brute force, port scanning, dan akses router ilegal.",
    gradient: "from-slate-950 via-[var(--navy)] to-blue-700",
    icon: "shield",
    categoryColor: "text-emerald-600",
  },
  {
    slug: "vpn",
    title: "VPN atau Port Forwarding: Mana yang Lebih Aman?",
    category: "VPN",
    date: "21 Jan 2025",
    readTime: "6 menit baca",
    lead: "Perbandingan praktis untuk akses CCTV, router, server, dan perangkat kantor dari luar jaringan.",
    gradient: "from-blue-600 to-cyan-400",
    icon: "eye",
    categoryColor: "text-[var(--blue)]",
  },
  {
    slug: "access-point",
    title: "Cara Menentukan Posisi Access Point yang Ideal",
    category: "WiFi",
    date: "15 Jan 2025",
    readTime: "5 menit baca",
    lead: "Kurangi blank spot dan interferensi dengan penempatan AP yang tepat untuk rumah, hotel, dan kantor.",
    gradient: "from-indigo-950 via-blue-900 to-blue-500",
    icon: "wifi",
    categoryColor: "text-violet-600",
  },
];