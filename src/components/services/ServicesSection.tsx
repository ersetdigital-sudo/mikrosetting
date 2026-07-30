import Image from "next/image";
import { WHATSAPP_URL } from "@/constants";
import {
  RouterIcon,
  OltIcon,
  RuijieIcon,
  AccessPointIcon,
} from "@/components/common/Icons";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  image?: string;
  imageAlt?: string;
};

const services: Service[] = [
  {
    icon: <RouterIcon />,
    badge: "MikroTik",
    image: "/images/jasa-setting-mikrotik-v2.png",
    imageAlt: "Teknisi mengonfigurasi MikroTik di ruang server",
    title: "Jasa Setting MikroTik",
    description: "Konfigurasi MikroTik untuk berbagai kebutuhan jaringan Anda.",
    features: [
      "PPPoE Server",
      "Load Balance",
      "VPN & Firewall",
      "VLAN & Routing",
    ],
  },
  {
    icon: <OltIcon />,
    title: "Jasa Setting OLT",
    description: "Setting OLT untuk ISP, RT/RW Net, dan jaringan fiber optik.",
    features: [
      "VSOL, OLT",
      "HSGQ OLT",
      "Global / Hioso",
      "Registrasi ONU/ONT",
    ],
  },
  {
    icon: <RuijieIcon />,
    title: "Jasa Setting Ruijie",
    description: "Konfigurasi Ruijie untuk jaringan yang stabil dan terkelola.",
    features: [
      "Ruijie Gateway",
      "Ruijie Access Point",
      "Cloud Management",
      "Switch Managed",
    ],
  },
  {
    icon: <AccessPointIcon />,
    title: "Jasa Setting Access Point",
    description: "Optimasi WiFi untuk Hotel, Kantor, Sekolah & area publik.",
    features: [
      "Penempatan AP",
      "Optimasi Coverage",
      "SSID & VLAN",
      "Manajemen Bandwidth",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="layanan" className="bg-[var(--soft)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[var(--blue)] font-semibold tracking-widest text-xs uppercase">
            Layanan Kami
          </span>
          <h2 className="font-head font-extrabold text-3xl md:text-4xl mt-2 text-[var(--navy)]">
            Solusi Setting Jaringan Lengkap
          </h2>
          <p className="text-[var(--muted)] mt-3">
            Dikerjakan teknisi berpengalaman dengan konfigurasi rapi dan terdokumentasi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
            >
              {service.image ? (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt ?? service.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {service.badge && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-[var(--navy)]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      {service.badge}
                    </span>
                  )}
                </div>
              ) : (
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-blue-50 text-[var(--blue)] m-6 mb-0">
                  {service.icon}
                </span>
              )}
              <div className="p-6 flex flex-col grow">
                <h3 className="font-head font-bold text-lg text-[var(--navy)]">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mt-1 mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--green)]">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto text-center btn-green text-white text-sm font-semibold py-2.5 rounded-lg transition"
                >
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}