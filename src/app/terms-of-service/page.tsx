import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { WHATSAPP_URL, EMAIL } from "@/constants";

const siteUrl = "https://mikrosetting.com";
const pageUrl = `${siteUrl}/terms-of-service`;
const description =
  "Syarat dan Ketentuan Layanan MikroSetting — ketentuan pemesanan, pelaksanaan, garansi konfigurasi, produk digital, dan tanggung jawab pengguna layanan setting jaringan kami.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", title: "Terms of Service | MikroSetting", description, url: pageUrl },
};

const updated = "29 Juli 2026";

const sections: [string, string[]][] = [
  [
    "1. Penerimaan Syarat",
    [
      "Dengan memesan atau menggunakan layanan MikroSetting, Anda menyatakan telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini. Jika Anda tidak menyetujui salah satu ketentuan, mohon untuk tidak melanjutkan penggunaan layanan kami.",
    ],
  ],
  [
    "2. Deskripsi Layanan",
    [
      "MikroSetting menyediakan jasa setting dan konfigurasi jaringan meliputi MikroTik, OLT, Ruijie, dan Access Point untuk RT/RW Net, hotel, kantor, sekolah, dan ISP, baik secara remote maupun on-site sesuai kesepakatan.",
      "Kami juga menyediakan produk digital berupa Mikhmon Online (manajemen hotspot dan voucher berbasis web) serta layanan VPN Port Forwarding untuk akses remote perangkat tanpa IP publik.",
    ],
  ],
  [
    "3. Pemesanan dan Pembayaran",
    [
      "Pemesanan dilakukan melalui WhatsApp resmi kami. Rincian pekerjaan, estimasi waktu, dan biaya akan disepakati terlebih dahulu sebelum pengerjaan dimulai.",
      "Pembayaran dilakukan sesuai kesepakatan yang tertulis pada saat pemesanan (di muka, DP, atau setelah pengerjaan). Pengerjaan produk digital dimulai setelah pembayaran terkonfirmasi.",
    ],
  ],
  [
    "4. Akses dan Pelaksanaan Pekerjaan",
    [
      "Untuk pengerjaan remote, Anda memberikan akses ke perangkat secara sukarela (misalnya melalui VPN atau remote access yang aman) dan berhak mendampingi selama proses berlangsung. Akses hanya digunakan untuk pekerjaan yang disepakati.",
      "Setiap hasil konfigurasi didokumentasikan dan diserahkan kepada Anda. Waktu pengerjaan dapat bervariasi tergantung kompleksitas jaringan dan akan diinformasikan di awal.",
    ],
  ],
  [
    "5. Garansi Konfigurasi",
    [
      "Kami memberikan garansi konfigurasi 100%. Jika terjadi kendala pada hasil setting yang kami kerjakan, kami akan memperbaikinya tanpa biaya tambahan selama masa garansi yang disepakati.",
      "Garansi tidak mencakup kerusakan perangkat keras, gangguan dari sisi ISP, pemadaman listrik, perubahan konfigurasi oleh pihak lain setelah serah terima, atau kebutuhan fitur baru di luar kesepakatan awal.",
    ],
  ],
  [
    "6. Tanggung Jawab Pengguna",
    [
      "Anda bertanggung jawab memberikan informasi yang akurat mengenai topologi dan kebutuhan jaringan, memastikan akses yang diberikan adalah sah dan milik Anda sendiri atau pihak yang Anda wakili, serta melakukan backup data penting sebelum pengerjaan dimulai.",
      "Setelah serah terima, Anda bertanggung jawab menjaga kerahasiaan kredensial perangkat dan tidak membagikannya kepada pihak yang tidak berkepentingan.",
    ],
  ],
  [
    "7. Ketentuan Produk Digital",
    [
      "Mikhmon Online dan VPN Port Forwarding diberikan sebagai lisensi penggunaan sesuai paket yang dibeli, bukan penjualan hak cipta. Anda tidak diperkenankan mendistribusikan ulang, menjual kembali, atau memodifikasi produk tanpa izin tertulis dari kami.",
      "Gangguan layanan produk digital yang berasal dari penyedia infrastruktur pihak ketiga akan kami bantu pulihkan secepatnya sesuai kemampuan teknis yang tersedia.",
    ],
  ],
  [
    "8. Batasan Tanggung Jawab",
    [
      "Layanan disediakan dengan itikad dan keahlian terbaik. Kami tidak bertanggung jawab atas kerugian tidak langsung seperti kehilangan keuntungan, data, atau gangguan usaha yang timbul di luar kendali kami.",
      "Sejauh diizinkan hukum, total tanggung jawab kami atas klaim apa pun dibatasi maksimal sebesar biaya layanan yang telah Anda bayarkan untuk pekerjaan terkait.",
    ],
  ],
  [
    "9. Kekayaan Intelektual",
    [
      "Seluruh konten website, termasuk teks, desain, logo, dan dokumentasi, adalah milik MikroSetting dan dilindungi oleh hukum kekayaan intelektual yang berlaku. Penggunaan tanpa izin tertulis tidak diperkenankan.",
    ],
  ],
  [
    "10. Perubahan Syarat dan Ketentuan",
    [
      "Kami dapat memperbarui Syarat dan Ketentuan ini dari waktu ke waktu. Versi terbaru selalu dipublikasikan di halaman ini beserta tanggal pembaruan, dan penggunaan layanan setelah pembaruan berarti Anda menyetujui versi terbaru.",
    ],
  ],
  [
    "11. Hukum yang Berlaku dan Kontak",
    [
      "Syarat dan Ketentuan ini tunduk pada hukum Republik Indonesia. Segala perselisihan akan diselesaikan terlebih dahulu secara musyawarah dengan itikad baik.",
      "Untuk pertanyaan mengenai ketentuan ini, hubungi kami melalui email resmi atau WhatsApp pada jam operasional setiap hari pukul 08.00 sampai 21.00 WIB.",
    ],
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — MikroSetting",
  description,
  url: pageUrl,
  inLanguage: "id-ID",
  dateModified: "2026-07-29",
};

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section className="hero-bg text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20 relative z-10">
            <span className="inline-block text-[var(--cyan)] font-semibold tracking-[.2em] text-xs uppercase mb-4">
              Legal
            </span>
            <h1 className="font-head font-extrabold leading-[1.1] text-4xl sm:text-5xl drop-shadow">
              Terms of <span className="text-[var(--cyan)]">Service</span>
            </h1>
            <p className="mt-5 text-slate-200 text-sm sm:text-base">
              Terakhir diperbarui: {updated}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <p className="text-slate-600 leading-relaxed text-base">
              Syarat dan Ketentuan ini mengatur penggunaan layanan jasa setting jaringan serta produk digital MikroSetting. Mohon dibaca dengan saksama sebelum memesan layanan kami.
            </p>
            <div className="reading-prose mt-4">
              {sections.map(([heading, paras]) => (
                <div key={heading}>
                  <h2>{heading}</h2>
                  {paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] text-white p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h2 className="font-head font-extrabold text-xl">Butuh penjelasan lebih lanjut?</h2>
                <p className="text-blue-100 text-sm mt-1">Email: {EMAIL} — atau chat kami langsung.</p>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="shrink-0 inline-flex justify-center bg-[var(--green)] hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition">
                Chat WhatsApp →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
