import Image from "next/image";
import { WHATSAPP_URL } from "@/constants";
import {
  RouterIcon,
  OltIcon,
  RuijieIcon,
  AccessPointIcon,
} from "@/components/common/Icons";
import { getHomepageServices, type HomeServiceId } from "@/lib/homepage-services";

const icons: Record<HomeServiceId, React.ReactNode> = {
  mikrotik: <RouterIcon />,
  olt: <OltIcon />,
  ruijie: <RuijieIcon />,
  "access-point": <AccessPointIcon />,
};

export default async function ServicesSection() {
  const services = await getHomepageServices();
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
          {services.map((service) => {
            const icon = icons[service.id];
            const hasImage = Boolean(service.image);

            return (
              <div
                key={service.id}
                className="card-hover bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] border-b border-slate-100 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                  {hasImage && (
                    <Image
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <div
                    className={hasImage
                      ? "absolute inset-0 bg-gradient-to-t from-[var(--navy)]/75 via-[var(--navy)]/15 to-transparent"
                      : "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(219,234,254,0.72),_rgba(207,250,254,0.88))]"
                    }
                  />
                  <span
                    className={hasImage
                      ? "absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/92 text-[var(--blue)] shadow-lg"
                      : "absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white text-[var(--blue)] shadow-md"
                    }
                  >
                    {icon}
                  </span>
                  {service.badge && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-[var(--navy)]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      {service.badge}
                    </span>
                  )}
                </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}