"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: "15+", labelKey: "years" },
    { value: "5", labelKey: "airports" },
    { value: "24/7", labelKey: "available" },
  ];

  return (
    <section id="about" className="bg-[#07070c] py-[140px] px-12 font-jost">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <p className="text-[9px] tracking-[0.38em] uppercase text-[rgba(180,195,220,0.5)] font-light mb-8 flex items-center gap-4">
            <span className="inline-block w-8 h-px bg-[rgba(180,195,220,0.4)]" />
            {t("sectionLabel")}
          </p>
          <h2 className="font-cormorant font-light text-[clamp(38px,4.5vw,58px)] text-[rgba(225,232,245,0.92)] leading-[1.05] tracking-[-0.01em] mb-10">
            {t("title")}<br />
            {t("subtitleLine1")}<br />
            <span className="text-[rgba(180,195,218,0.4)]">{t("subtitleLine2")}</span>
          </h2>
          <p className="text-xs font-extralight text-[rgba(170,185,210,0.65)] leading-8 tracking-[0.04em] mb-4">{t("text1")}</p>
          <p className="text-xs font-extralight text-[rgba(170,185,210,0.65)] leading-8 tracking-[0.04em]">{t("text2")}</p>
        </div>

        <div className="flex flex-col gap-0">
          {stats.map((s, i) => (
            <div key={s.value} className="py-10 flex items-center justify-between border-t border-[rgba(200,215,235,0.12)]" style={{ borderBottom: i === stats.length - 1 ? "0.5px solid rgba(200,215,235,0.12)" : "none" }}>
              <span className="font-cormorant font-light text-[clamp(42px,5vw,64px)] text-[rgba(225,232,245,0.88)] tracking-[-0.02em] leading-none">{s.value}</span>
              <span className="text-[10px] font-light text-[rgba(170,185,210,0.5)] tracking-[0.15em] uppercase text-right">{t(`stats.${s.labelKey}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
