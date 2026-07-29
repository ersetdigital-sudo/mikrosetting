"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HERO_SLIDES } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";

export default function HeroSection() {
  return (
    <section id="home" className="hero-bg text-white relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        speed={700}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ el: ".hero-swiper .swiper-pagination", clickable: true }}
        className="hero-swiper"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide flex items-center relative">
              <Image
                src={slide.image}
                alt={slide.badge}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                <div className="max-w-xl">
                  <span className="inline-block text-[var(--cyan)] font-semibold tracking-[.2em] text-xs uppercase mb-4">
                    {slide.badge}
                  </span>
                  <h1 className="font-head font-extrabold leading-[1.08] text-4xl sm:text-5xl xl:text-6xl drop-shadow">
                    {slide.titleLines.map((line, lineIndex) => (
                      <Fragment key={lineIndex}>
                        {lineIndex > 0 && <br />}
                        {line.map((segment, segmentIndex) => (
                          <span
                            key={segmentIndex}
                            className={
                              segment.color === "cyan"
                                ? "text-[var(--cyan)]"
                                : segment.color === "blue-light"
                                  ? "text-[var(--blue-light)]"
                                  : undefined
                            }
                          >
                            {segment.text}
                          </span>
                        ))}
                      </Fragment>
                    ))}
                  </h1>
                  <p className="mt-5 text-slate-200 text-base sm:text-lg">
                    {slide.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm sm:text-base">
                    {slide.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="text-[var(--cyan)]">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={slide.primaryCta.href}
                      target={slide.primaryCta.href.startsWith("http") ? "_blank" : undefined}
                      rel={slide.primaryCta.href.startsWith("http") ? "noopener" : undefined}
                      className={`inline-flex items-center gap-2 ${
                        slide.primaryCta.text === "Login / Daftar"
                          ? "bg-[var(--blue)] hover:bg-[var(--navy-2)]"
                          : "btn-green"
                      } text-white font-semibold px-5 py-3 rounded-xl transition`}
                    >
                      {slide.primaryCta.text.includes("WhatsApp") && (
                        <WhatsAppIcon className="w-5 h-5" />
                      )}
                      {slide.primaryCta.text}
                    </a>
                    <Link
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-3 rounded-xl transition"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </section>
  );
}