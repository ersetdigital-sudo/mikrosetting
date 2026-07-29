import Image from "next/image";
import { PRODUCTS, WHATSAPP_URL } from "@/constants";

export default function ProductsSection() {
  return (
    <section id="produk" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[var(--blue)] font-semibold tracking-widest text-xs uppercase">
            Produk Digital
          </span>
          <h2 className="font-head font-extrabold text-3xl md:text-4xl mt-2 text-[var(--navy)]">
            Mikhmon Online & Port Forwarding
          </h2>
          <p className="text-[var(--muted)] mt-3">
            Produk digital untuk memudahkan pengelolaan jaringan dan akses remote Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {PRODUCTS.map((product, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 overflow-hidden"
            >
              <div className="bg-[var(--soft)] px-6 py-3 text-xs font-semibold tracking-wide text-[var(--blue)] uppercase">
                {product.badge}
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-head font-bold text-xl text-[var(--navy)]">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mt-2 mb-4">
                    {product.description}
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 mb-5">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--green)]">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={product.primaryCta.href}
                      className="inline-flex items-center gap-1.5 bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                      {product.primaryCta.text}
                    </a>
                    <a
                      href={product.secondaryCta.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 btn-green text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                      {product.secondaryCta.text}
                    </a>
                  </div>
                </div>
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={400}
                  height={300}
                  className="w-full rounded-xl border border-slate-100"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}