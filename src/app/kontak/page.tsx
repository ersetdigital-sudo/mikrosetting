import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { WHATSAPP_URL, PHONE, EMAIL, BUSINESS_HOURS } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";

const siteUrl = "https://mikrosetting.com";
const pageUrl = `${siteUrl}/kontak`;
const description =
  "Hubungi MikroSetting — jasa setting MikroTik, OLT, Ruijie & Access Point. WhatsApp aktif setiap hari 08.00–21.00 WIB, respons cepat, konsultasi awal gratis, melayani seluruh Indonesia.";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", title: "Kontak Kami | MikroSetting", description, url: pageUrl },
};

const directAnswer =
  "Cara tercepat menghubungi MikroSetting adalah melalui WhatsApp — aktif setiap hari pukul 08.00–21.00 WIB dengan respons biasanya di bawah 15 menit pada jam kerja. Anda juga dapat mengirim email ke admin@mikrosetting.com. Konsultasi awal gratis dan layanan remote menjangkau seluruh Indonesia.";

const contactCards = [
  {
    title: "WhatsApp",
    badge: "Respons tercepat",
    value: PHONE,
    note: "Chat langsung dengan tim teknisi — konsultasi awal gratis.",
    href: WHATSAPP_URL,
    cta: "Chat Sekarang",
    primary: true,
  },
  {
    title: "Telepon",
    badge: "Jam kerja",
    value: PHONE,
    note: "Untuk diskusi kebutuhan yang lebih detail.",
    href: `tel:${PHONE.replace(/[^+\d]/g, "")}`,
    cta: "Telepon",
    primary: false,
  },
  {
    title: "Email",
    badge: "Dokumen & penawaran",
    value: EMAIL,
    note: "Cocok untuk permintaan penawaran resmi atau kerja sama.",
    href: `mailto:${EMAIL}`,
    cta: "Kirim Email",
    primary: false,
  },
];

const steps = [
  {
    title: "Chat & ceritakan kebutuhan",
    body: "Sampaikan kondisi jaringan Anda: jumlah user, perangkat yang dipakai, dan masalah yang dihadapi.",
  },
  {
    title: "Konsultasi & estimasi gratis",
    body: "Kami analisis kebutuhan, lalu berikan rekomendasi solusi beserta estimasi biaya dan waktu pengerjaan.",
  },
  {
    title: "Pengerjaan + garansi",
    body: "Eksekusi remote atau on-site dengan dokumentasi rapi, dilanjutkan garansi konfigurasi 100%.",
  },
];

const faqItems: [string, string][] = [
  [
    "Apakah konsultasi dikenakan biaya?",
    "Tidak. Konsultasi awal 100% gratis — ceritakan saja kebutuhan jaringan Anda, kami bantu rekomendasi solusi dan estimasinya.",
  ],
  [
    "Berapa lama biasanya respons WhatsApp?",
    "Pada jam operasional (08.00–21.00 WIB) pesan biasanya dibalas dalam waktu kurang dari 15 menit.",
  ],
  [
    "Apakah melayani di luar kota?",
    "Ya. Pengerjaan remote menjangkau seluruh Indonesia. Untuk kunjungan on-site, silakan konsultasikan lokasi Anda terlebih dahulu.",
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Kontak Kami — MikroSetting",
      description,
      url: pageUrl,
      inLanguage: "id-ID",
      mainEntity: {
        "@type": "Organization",
        name: "MikroSetting",
        url: siteUrl,
        email: EMAIL,
        telephone: PHONE,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          availableLanguage: ["Indonesian"],
          hoursAvailable: "Mo-Su 08:00-21:00",
        },
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

export default function KontakPage() {
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
              Kontak
            </span>
            <h1 className="font-head font-extrabold leading-[1.1] text-4xl sm:text-5xl xl:text-6xl drop-shadow">
              Hubungi <span className="text-[var(--cyan)]">Mikro</span>
              <span className="text-[var(--blue-light)]">Setting</span>
            </h1>
            <p className="mt-6 text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
              {directAnswer}
            </p>
          </div>
        </section>
        {/* Kartu kontak */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pilih cara favoritmu</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              Kami siap merespons
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {contactCards.map((c) => (
                <article key={c.title} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 flex flex-col">
                  <span className="inline-block self-start rounded-full bg-blue-50 text-[var(--blue)] text-[11px] font-bold uppercase tracking-widest px-3 py-1">
                    {c.badge}
                  </span>
                  <h3 className="font-head font-extrabold text-xl text-[var(--navy)] mt-4">{c.title}</h3>
                  <p className="font-head font-bold text-[var(--blue)] mt-1 break-all">{c.value}</p>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed grow">{c.note}</p>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener" : undefined}
                    className={`mt-6 inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl transition ${
                      c.primary
                        ? "btn-green text-white"
                        : "bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white"
                    }`}
                  >
                    {c.primary && <WhatsAppIcon className="w-5 h-5" />}
                    {c.cta}
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-[var(--soft)] border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-[var(--navy)]">Jam operasional:</span> {BUSINESS_HOURS}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Biasanya membalas di bawah 15 menit pada jam kerja
              </span>
            </div>
          </div>
        </section>

        {/* Langkah */}
        <section className="bg-[var(--soft)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Alurnya simpel</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              Dari chat pertama sampai garansi
            </h2>
            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              {steps.map((s, i) => (
                <div key={s.title} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-100 text-[var(--blue)] font-head font-extrabold">
                    {i + 1}
                  </span>
                  <h3 className="font-head font-bold text-[var(--navy)] mt-4">{s.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Area layanan */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Area layanan</span>
              <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
                Melayani seluruh Indonesia
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                Pengerjaan dilakukan secara remote melalui koneksi aman (VPN atau remote access terenkripsi), sehingga lokasi bukan halangan. Untuk kebutuhan survei atau instalasi fisik, jadwalkan kunjungan on-site melalui konsultasi.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600 text-sm sm:text-base">
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> Remote RT/RW Net, ISP, hotel, kantor, dan sekolah di seluruh Indonesia</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> On-site dengan penjadwalan terlebih dahulu</li>
                <li className="flex items-start gap-3"><span className="text-[var(--cyan)] font-bold">✓</span> Dukungan purna jual via WhatsApp setiap hari</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[var(--navy)] via-[var(--blue)] to-[var(--blue-light)] text-white p-7 sm:p-9 relative overflow-hidden">
              <div className="grid-overlay absolute inset-0 opacity-30" />
              <div className="relative">
                <span className="text-[var(--cyan)] text-xs font-bold tracking-widest uppercase">Respons cepat</span>
                <h3 className="font-head font-extrabold text-2xl sm:text-3xl mt-2">
                  Jaringan bermasalah sekarang?
                </h3>
                <p className="text-blue-100 text-sm mt-3 leading-relaxed">
                  Ceritakan kendalanya — tim kami bantu diagnosa awal gratis lewat WhatsApp.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 bg-white text-[var(--blue)] hover:bg-slate-100 font-semibold px-6 py-3 rounded-xl transition shadow-lg">
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat WhatsApp Sekarang
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--soft)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pertanyaan umum</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mt-2">
              Sebelum menghubungi kami
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
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
