import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { WHATSAPP_URL, PHONE, EMAIL, BUSINESS_HOURS } from "@/constants";
import { siteUrl } from "@/lib/site";

const pageUrl = `${siteUrl}/tentang`;
const description =
  "Mengenal MikroSetting — penyedia jasa setting MikroTik, OLT, Ruijie & Access Point profesional untuk RT/RW Net, hotel, kantor, sekolah, dan ISP di seluruh Indonesia.";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    title: "Tentang Kami | MikroSetting",
    description,
    url: pageUrl,
  },
};

const aboutAnswer =
  "MikroSetting adalah penyedia jasa setting MikroTik, OLT, Ruijie, dan Access Point profesional asal Indonesia. Melayani kebutuhan jaringan RT/RW Net, hotel, kantor, sekolah, dan ISP — dikerjakan teknisi berpengalaman secara remote ke seluruh Indonesia, setiap hari pukul 08.00–21.00 WIB, dengan garansi konfigurasi 100%.";

const faqItems: [string, string][] = [
  [
    "MikroSetting melayani area mana saja?",
    "Layanan remote menjangkau seluruh Indonesia selama perangkat dapat diakses via VPN atau remote access yang aman. Untuk kunjungan on-site, silakan konsultasikan lokasi Anda terlebih dahulu via WhatsApp.",
  ],
  [
    "Apakah ada garansi hasil pengerjaan?",
    "Ada. Kami memberikan garansi konfigurasi 100% — jika ada kendala pada hasil setting, kami perbaiki tanpa biaya tambahan.",
  ],
  [
    "Bagaimana cara order atau konsultasi?",
    "Cukup chat WhatsApp kami, jelaskan kebutuhan jaringan Anda, dan tim kami akan membantu dari perencanaan sampai konfigurasi selesai. Konsultasi awal gratis.",
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "Tentang Kami — MikroSetting",
      description,
      url: pageUrl,
      inLanguage: "id-ID",
      mainEntity: {
        "@type": "Organization",
        name: "MikroSetting",
        url: siteUrl,
        description: aboutAnswer,
        email: EMAIL,
        telephone: PHONE,
        areaServed: "ID",
        openingHours: "Mo-Su 08:00-21:00",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const stats = [
  { value: "500+", label: "Router MikroTik Setup" },
  { value: "100+", label: "PPPoE & Hotspot" },
  { value: "50+", label: "Implementasi OLT" },
  { value: "100%", label: "Garansi Konfigurasi" },
];

export default function TentangPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-bg text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
            <span className="inline-block text-[var(--cyan)] font-semibold tracking-[.2em] text-xs uppercase mb-4">
              Tentang Kami
            </span>
            <h1 className="font-head font-extrabold leading-[1.1] text-4xl sm:text-5xl xl:text-6xl drop-shadow">
              Tentang <span className="text-[var(--cyan)]">Mikro</span>
              <span className="text-[var(--blue-light)]">Setting</span>
            </h1>
            <p className="mt-6 text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
              {aboutAnswer}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[var(--navy)] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-white">
                <div className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--cyan)]">
                  {s.value}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Layanan */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Apa yang kami kerjakan</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              Spesialis setting jaringan
            </h2>
            <p className="text-slate-500 mt-4 max-w-3xl leading-relaxed">
              Kami fokus pada satu hal: membangun jaringan yang cepat, aman, stabil, dan mudah dikelola. Empat layanan utama kami meliputi:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              <article className="card-hover rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-head font-bold text-lg text-[var(--navy)]">Setting MikroTik</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">PPPoE server, hotspot voucher, VPN, load balance multi-ISP, firewall, VLAN, dan routing untuk berbagai skala jaringan.</p>
              </article>
              <article className="card-hover rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-head font-bold text-lg text-[var(--navy)]">Setting OLT</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Konfigurasi OLT VSOL, HSGQ, Global, dan Hioso untuk ISP serta RT/RW Net, termasuk registrasi ONU/ONT pelanggan.</p>
              </article>
              <article className="card-hover rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-head font-bold text-lg text-[var(--navy)]">Setting Ruijie</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Ruijie gateway, Access Point, cloud management, dan switch managed untuk jaringan yang stabil dan terkelola.</p>
              </article>
              <article className="card-hover rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-head font-bold text-lg text-[var(--navy)]">Setting Access Point</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Site survey, penempatan AP, optimasi kanal dan transmit power untuk WiFi hotel, kantor, sekolah, dan area publik.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Proses */}
        <section className="bg-[var(--soft)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Cara kami bekerja</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              Proses rapi dari awal sampai garansi
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-100 text-[var(--blue)] font-head font-extrabold">1</span>
                <h3 className="font-head font-bold text-[var(--navy)] mt-4">Konsultasi Gratis</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Ceritakan kebutuhan jaringan Anda via WhatsApp. Kami bantu analisis tanpa biaya.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-100 text-[var(--blue)] font-head font-extrabold">2</span>
                <h3 className="font-head font-bold text-[var(--navy)] mt-4">Perencanaan</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Topologi dan konfigurasi disiapkan sesuai kebutuhan, kapasitas perangkat, dan jumlah pengguna.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-100 text-[var(--blue)] font-head font-extrabold">3</span>
                <h3 className="font-head font-bold text-[var(--navy)] mt-4">Eksekusi</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Pengerjaan remote atau on-site dengan konfigurasi rapi, terdokumentasi, dan teruji.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-100 text-[var(--blue)] font-head font-extrabold">4</span>
                <h3 className="font-head font-bold text-[var(--navy)] mt-4">Garansi</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Garansi konfigurasi 100%. Kendala pada hasil setting kami perbaiki tanpa biaya tambahan.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Kenapa kami + kontak */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Kenapa MikroSetting</span>
              <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
                Dipercaya berbagai jenis jaringan
              </h2>
              <ul className="mt-8 space-y-3 text-slate-600 text-sm sm:text-base">
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> 500+ router MikroTik telah kami konfigurasi</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> 100+ sistem PPPoE dan hotspot voucher berjalan</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> 50+ implementasi OLT untuk ISP dan RT/RW Net</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> Layanan remote menjangkau seluruh Indonesia</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> Konfigurasi rapi, terdokumentasi, dan mudah dirawat teknisi berikutnya</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> Garansi konfigurasi 100% tanpa biaya tambahan</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--navy)] text-white p-7 sm:p-8">
              <span className="text-[var(--cyan)] text-xs font-bold tracking-widest uppercase">Kontak kami</span>
              <h3 className="font-head font-extrabold text-2xl mt-2">Siap membantu setiap hari</h3>
              <ul className="mt-6 space-y-3 text-sm text-blue-100">
                <li className="flex items-center gap-3"><span className="text-[var(--cyan)]">✆</span> {PHONE}</li>
                <li className="flex items-center gap-3"><span className="text-[var(--cyan)]">✉</span> {EMAIL}</li>
                <li className="flex items-center gap-3"><span className="text-[var(--cyan)]">◷</span> {BUSINESS_HOURS}</li>
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="mt-7 inline-flex items-center gap-2 btn-green text-white font-semibold px-5 py-3 rounded-xl transition">
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--soft)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pertanyaan umum</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              FAQ tentang MikroSetting
            </h2>
            <div className="mt-8 divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 px-6 sm:px-8">
              {faqItems.map(([q, a], i) => (
                <details key={q} className="group py-5" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[var(--navy)]">
                    {q}
                    <span className="text-[var(--blue)] text-xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-500 mt-3 pr-8">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
            <div className="rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] text-white p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[var(--cyan)]">Mulai sekarang</p>
                <h2 className="font-head font-extrabold text-2xl sm:text-3xl mt-2">Bangun jaringan yang stabil bersama kami</h2>
                <p className="text-blue-100 text-sm mt-2">Konsultasi awal gratis — ceritakan kebutuhan Anda hari ini.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex justify-center bg-[var(--green)] hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition">
                  Chat WhatsApp →
                </a>
                <Link href="/" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-3 rounded-xl transition">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
