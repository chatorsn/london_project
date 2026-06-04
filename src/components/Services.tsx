"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("services");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const services = [
    { number: "01", titleKey: "airport.title", subKey: "airport.sub", descKey: "airport.desc" },
    { number: "02", titleKey: "corporate.title", subKey: "corporate.sub", descKey: "corporate.desc" },
    { number: "03", titleKey: "group.title", subKey: "group.sub", descKey: "group.desc" },
    { number: "04", titleKey: "private.title", subKey: "private.sub", descKey: "private.desc" },
  ];

  return (
    <section id="services" className="bg-[#09090e] py-20 md:py-[140px] px-4 md:px-12 font-jost">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.38em] uppercase text-white/50 font-medium mb-10 md:mb-16 flex items-center gap-3 md:gap-4">
          <span className="inline-block w-6 md:w-8 h-px bg-white/30" />
          {t("sectionLabel")}
        </p>

        <div>
          {services.map((s, i) => (
            <div
              key={s.number}
              className="flex flex-col md:grid md:grid-cols-[64px_1fr_1fr] items-start md:items-center gap-4 md:gap-12 py-6 md:py-10 border-t border-white/10 transition-all duration-300 cursor-default"
              style={{ borderBottom: i === services.length - 1 ? "0.5px solid rgba(255,255,255,0.1)" : "none" }}
              onMouseEnter={(e) => {
                setActiveIndex(i);
                e.currentTarget.style.paddingLeft = "16px";
              }}
              onMouseLeave={(e) => {
                setActiveIndex(null);
                e.currentTarget.style.paddingLeft = "0px";
              }}
            >
              <span className="text-[10px] tracking-[0.15em] text-white/40 font-light mb-2 md:mb-0">{s.number}</span>
              <div className="mb-4 md:mb-0">
                <h3 className={`font-cormorant font-light text-[clamp(24px,3.5vw,42px)] leading-tight tracking-[-0.01em] transition-colors duration-300 ${activeIndex === i ? "text-white" : "text-white/90"}`}>
                  {t(s.titleKey)}
                </h3>
                <p className="text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] text-white/40 font-light uppercase mt-1">{t(s.subKey)}</p>
              </div>
              <p className="text-[11px] md:text-xs font-light text-white/60 leading-relaxed tracking-[0.04em] text-left md:text-right">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
