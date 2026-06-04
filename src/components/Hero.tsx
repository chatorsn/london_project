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
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,7,12,0.92)] via-[rgba(6,7,12,0.3)] to-[rgba(6,7,12,0.5)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,12,0.75)] via-transparent to-transparent" />

      <div className="absolute bottom-16 left-12 z-10 max-w-[680px]">
        <div className="flex items-center gap-3.5 mb-5 text-[9.5px] tracking-[0.35em] uppercase text-[rgba(150,170,200,0.55)] font-light">
          <span className="inline-block w-7 h-px bg-[rgba(150,170,200,0.4)]" />
          {t("badge")}
        </div>

        <h1 className="font-cormorant font-light text-[clamp(72px,11vw,118px)] leading-[0.9] tracking-[-0.01em] text-[rgba(240,244,252,1)] m-0">
          LONDON<br />
          ROUTE<br />
          <span className="text-[rgba(200,212,232,0.7)]">TRANSFERS</span>
        </h1>

        <div className="flex items-end gap-12 mt-8">
          <p className="text-[11.5px] font-extralight text-[rgba(175,190,215,0.85)] tracking-[0.06em] leading-[1.9] max-w-[240px] m-0 whitespace-pre-line">
            {t("subtitle")}
          </p>

          <Link href={`/${locale}/booking`} className="inline-flex items-center gap-5 font-jost text-[9.5px] tracking-[0.28em] uppercase text-[rgba(210,222,238,0.9)] border border-[rgba(175,200,228,0.3)] py-3.5 px-8 bg-[rgba(255,255,255,0.03)] no-underline font-light whitespace-nowrap">
            {t("button")}
            <span className="opacity-45 text-base font-extralight">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
