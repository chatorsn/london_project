"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("hero");

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0d0f14] font-jost">
      <div className="absolute inset-0 bg-[url('/london-bg.jpg')] bg-cover bg-center saturate-30 brightness-50 contrast-120" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-20 md:bottom-24 left-4 md:left-16 right-4 z-10 max-w-[680px]">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.35em] uppercase text-white/60 font-medium">
          <span className="inline-block w-6 md:w-10 h-px bg-white/40" />
          {t("badge")}
        </div>

        <h1 className="font-cormorant font-bold text-[clamp(50px,12vw,130px)] leading-[0.9] tracking-[-0.01em] text-white m-0">
          LONDON<br />
          ROUTE<br />
          <span className="text-white/80">TRANSFERS</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-12 mt-6 md:mt-10">
          <p className="text-[11px] md:text-[13px] font-medium text-white/70 tracking-[0.06em] md:tracking-[0.08em] leading-relaxed max-w-[260px] m-0 whitespace-pre-line">
            {t("subtitle")}
          </p>

          <Link href={`/${locale}/booking`} className="inline-flex items-center gap-4 md:gap-5 font-jost text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.28em] uppercase text-white border border-white/40 hover:border-white py-3 md:py-4 px-6 md:px-10 bg-transparent no-underline font-medium whitespace-nowrap transition-all hover:bg-white/10">
            {t("button")}
            <span className="opacity-60 text-base md:text-lg font-light">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
