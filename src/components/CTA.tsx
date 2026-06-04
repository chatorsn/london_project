"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CTA() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("cta");

  return (
    <section className="bg-[#07070c] py-[120px] px-12 font-jost border-t border-[rgba(200,215,235,0.08)]">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-12">
        <h2 className="font-cormorant font-light text-[clamp(36px,4.5vw,62px)] text-[rgba(225,232,245,0.9)] leading-[1.05] tracking-[-0.01em] max-w-[560px]">
          {t("title")}
        </h2>
        <div className="flex flex-col items-end gap-5 flex-shrink-0">
          <Link href={`/${locale}/booking`} className="inline-flex items-center gap-5 font-jost text-[10px] tracking-[0.25em] uppercase text-[rgba(210,222,238,0.9)] border border-[rgba(175,200,228,0.35)] py-4 px-9 bg-[rgba(255,255,255,0.03)] no-underline font-light whitespace-nowrap transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]">
            {t("button")}
            <span className="opacity-45 text-lg font-extralight">→</span>
          </Link>
          <p className="text-[10px] font-extralight text-[rgba(170,185,215,0.55)] tracking-[0.08em] text-right">{t("reply")}</p>
        </div>
      </div>
    </section>
  );
}
