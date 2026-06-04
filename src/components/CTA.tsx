"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CTA() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("cta");

  return (
    <section className="bg-[#07070c] py-20 md:py-[120px] px-4 md:px-12 font-jost border-t border-white/10">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12 text-center md:text-left">
        <h2 className="font-cormorant font-light text-[clamp(28px,4.5vw,62px)] text-white leading-[1.1] md:leading-[1.05] tracking-[-0.01em] max-w-[560px]">
          {t("title")}
        </h2>
        <div className="flex flex-col items-center md:items-end gap-4 md:gap-5 flex-shrink-0">
          <Link href={`/${locale}/booking`} className="inline-flex items-center gap-4 md:gap-5 font-jost text-[10px] md:text-[11px] tracking-[0.22em] md:tracking-[0.25em] uppercase text-white border border-white/40 hover:border-white py-3 md:py-4 px-6 md:px-10 bg-transparent no-underline font-medium whitespace-nowrap transition-all hover:bg-white/10">
            {t("button")}
            <span className="opacity-60 text-base md:text-lg font-extralight">→</span>
          </Link>
          <p className="text-xs md:text-sm font-medium text-white/60 tracking-[0.06em] md:tracking-[0.08em] text-center md:text-right">
            {t("reply")}
          </p>
        </div>
      </div>
    </section>
  );
}
