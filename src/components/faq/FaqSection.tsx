"use client";

import { FAQ_ITEMS } from "@/constants";

export default function FaqSection() {
  return (
    <section id="tentang" className="bg-[var(--soft)] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[var(--blue)] font-semibold tracking-widest text-xs uppercase">
            FAQ
          </span>
          <h2 className="font-head font-extrabold text-3xl md:text-4xl mt-2 text-[var(--navy)]">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between gap-4 p-5 font-semibold text-[var(--navy)] cursor-pointer">
                {item.question}
                <span className="faq-icon text-[var(--blue)] text-2xl leading-none shrink-0">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-[var(--muted)]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}