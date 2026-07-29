import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { WHATSAPP_URL, EMAIL } from "@/constants";

const siteUrl = "https://mikrosetting.com";
const pageUrl = `${siteUrl}/privacy-policy`;
const description =
  "Kebijakan Privasi MikroSetting — bagaimana kami mengumpulkan, menggunakan, melindungi, dan menghapus data Anda saat menggunakan layanan setting jaringan dan produk digital kami.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", title: "Privacy Policy | MikroSetting", description, url: pageUrl },
};

const updated = "29 Juli 2026";

const sections: [string, string[]][] = [
  [
    "1. Informasi yang Kami Kumpulkan",
    [
      "Kami mengumpulkan informasi yang Anda berikan secara langsung saat menghubungi kami melalui WhatsApp, email, atau formulir konsultasi, seperti nama, nomor telepon, alamat email, dan detail kebutuhan jaringan Anda.",
      "Saat pengerjaan konfigurasi, kami dapat menerima data teknis seperti alamat IP, kredensial akses perangkat, dan topologi jaringan — selalu atas izin Anda dan hanya untuk keperluan pengerjaan.",
      "Kami juga dapat mengumpulkan data penggunaan website yang bersifat umum dan tidak mengidentifikasi individu, seperti jenis perangkat dan halaman yang dikunjungi.",
    ],
  ],
  [
    "2. Cara Kami Menggunakan Informasi",
    [
      "Informasi digunakan untuk menyediakan layanan setting jaringan dan produk digital (Mikhmon Online dan VPN Port Forwarding), berkomunikasi terkait pengerjaan, penagihan, dukungan purna jual, serta peningkatan kualitas layanan kami.",
      "Kami tidak menggunakan data Anda untuk tujuan pemasaran pihak ketiga dan tidak mengirimkan promosi tanpa persetujuan Anda.",
    ],
  ],
  [
    "3. Akses Perangkat dan Kerahasiaan Konfigurasi",
    [
      "Kredensial dan akses remote yang Anda berikan digunakan semata-mata untuk proses konfigurasi yang disepakati. Kami tidak menyimpan kredensial lebih lama dari yang diperlukan untuk menyelesaikan pekerjaan dan masa garansi.",
      "Demi keamanan, kami menyarankan Anda mengganti password perangkat setelah pengerjaan selesai. Seluruh konfigurasi jaringan Anda diperlakukan sebagai informasi rahasia.",
    ],
  ],
  [
    "4. Berbagi Informasi dengan Pihak Ketiga",
    [
      "Kami tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak mana pun.",
      "Data hanya dapat dibagikan kepada penyedia infrastruktur yang menunjang layanan (misalnya penyedia VPS untuk produk VPN Port Forwarding) sebatas yang diperlukan untuk mengoperasikan layanan, atau bila diwajibkan oleh hukum yang berlaku di Indonesia.",
    ],
  ],
  [
    "5. Keamanan Data",
    [
      "Kami menerapkan langkah pengamanan yang wajar, termasuk pembatasan akses internal, penggunaan kanal komunikasi resmi, dan koneksi terenkripsi pada layanan yang kami kelola.",
      "Meski demikian, tidak ada sistem yang 100% aman. Bila Anda mencurigai penyalahgunaan data terkait layanan kami, segera hubungi kami agar dapat ditindaklanjuti.",
    ],
  ],
  [
    "6. Penyimpanan dan Retensi Data",
    [
      "Data disimpan selama diperlukan untuk menyediakan layanan, memenuhi kewajiban garansi, serta mematuhi kewajiban hukum dan pembukuan. Setelah tidak diperlukan, data akan dihapus atau dianonimkan secara aman.",
    ],
  ],
  [
    "7. Hak Anda atas Data Pribadi",
    [
      "Anda berhak meminta akses, koreksi, atau penghapusan data pribadi yang kami simpan, serta menarik persetujuan penggunaan data untuk keperluan tertentu. Ajukan permintaan melalui email atau WhatsApp resmi kami dan kami akan menindaklanjuti dalam waktu yang wajar.",
    ],
  ],
  [
    "8. Cookie dan Pelacakan",
    [
      "Saat ini website kami tidak menggunakan cookie iklan atau pelacak pihak ketiga. Jika di kemudian hari kami menambahkan alat analitik untuk meningkatkan layanan, kebijakan ini akan diperbarui dan diumumkan di halaman yang sama.",
    ],
  ],
  [
    "9. Perubahan Kebijakan Privasi",
    [
      "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Versi terbaru selalu dipublikasikan di halaman ini beserta tanggal pembaruan. Penggunaan layanan setelah pembaruan berarti Anda menyetujui versi terbaru.",
    ],
  ],
  [
    "10. Hubungi Kami",
    [
      "Untuk pertanyaan seputar privasi dan perlindungan data, hubungi kami melalui email resmi atau WhatsApp pada jam operasional setiap hari pukul 08.00 sampai 21.00 WIB.",
    ],
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — MikroSetting",
  description,
  url: pageUrl,
  inLanguage: "id-ID",
  dateModified: "2026-07-29",
};

export default function PrivacyPolicyPage() {
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
              Privacy <span className="text-[var(--cyan)]">Policy</span>
            </h1>
            <p className="mt-5 text-slate-200 text-sm sm:text-base">
              Terakhir diperbarui: {updated}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <p className="text-slate-600 leading-relaxed text-base">
              Kebijakan Privasi ini menjelaskan bagaimana MikroSetting mengumpulkan, menggunakan, melindungi, dan menghapus informasi Anda ketika menggunakan website, layanan setting jaringan, dan produk digital kami. Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan di halaman ini.
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
                <h2 className="font-head font-extrabold text-xl">Ada pertanyaan soal privasi?</h2>
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
