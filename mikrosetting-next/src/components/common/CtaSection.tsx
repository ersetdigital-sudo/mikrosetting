import { WHATSAPP_URL } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";

export default function CtaSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-16 md:py-16 text-center bg-gradient-to-br from-[var(--navy)] via-[var(--blue)] to-[var(--blue-light)] shadow-[0_30px_70px_-25px_rgba(13,32,102,.6)]">
          <div className="grid-overlay absolute inset-0 opacity-30" />
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[var(--cyan)]/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--cyan)] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />{" "}
              Siap Membantu
            </span>
            <h2 className="font-head font-extrabold text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Butuh solusi jaringan terbaik?
            </h2>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Konsultasikan kebutuhan jaringan Anda sekarang. Tim teknisi kami siap membantu
              dari perencanaan sampai konfigurasi — gratis konsultasi awal.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-white text-[var(--blue)] hover:bg-slate-100 font-semibold px-7 py-3.5 rounded-xl transition shadow-lg hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat WhatsApp Sekarang
              </a>
              <a
                href="#layanan"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl transition"
              >
                Lihat Layanan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}