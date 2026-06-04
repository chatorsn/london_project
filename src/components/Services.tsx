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
    <section id="services" className="bg-[#09090e] py-[140px] px-12 font-jost">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[9px] tracking-[0.38em] uppercase text-[rgba(180,195,220,0.5)] font-light mb-16 flex items-center gap-4">
          <span className="inline-block w-8 h-px bg-[rgba(180,195,220,0.4)]" />
          {t("sectionLabel")}
        </p>

        <div>
          {services.map((s, i) => (
            <div
              key={s.number}
              className="grid grid-cols-[64px_1fr_1fr] items-center gap-12 py-10 border-t border-[rgba(200,215,235,0.15)] transition-all duration-300 cursor-default"
              style={{ borderBottom: i === services.length - 1 ? "0.5px solid rgba(200,215,235,0.15)" : "none" }}
              onMouseEnter={(e) => {
                setActiveIndex(i);
                e.currentTarget.style.paddingLeft = "16px";
              }}
              onMouseLeave={(e) => {
                setActiveIndex(null);
                e.currentTarget.style.paddingLeft = "0px";
              }}
            >
              <span className="text-[10px] tracking-[0.15em] text-[rgba(180,195,220,0.35)] font-light">{s.number}</span>
              <div>
                <h3 className={`font-cormorant font-light text-[clamp(28px,3.5vw,42px)] leading-tight tracking-[-0.01em] transition-colors duration-300 mb-2.5 ${activeIndex === i ? "text-white" : "text-[rgba(225,232,245,0.9)]"}`}>
                  {t(s.titleKey)}
                </h3>
                <p className="text-[10px] tracking-[0.15em] text-[rgba(170,185,210,0.55)] font-light uppercase">{t(s.subKey)}</p>
              </div>
              <p className="text-xs font-light text-[rgba(170,185,210,0.65)] leading-relaxed tracking-[0.04em] text-right">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
