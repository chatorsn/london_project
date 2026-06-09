import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: "15+", labelKey: "years" },
    { value: "5", labelKey: "airports" },
    { value: "24/7", labelKey: "available" },
  ];

  return (
    <section id="about" className="bg-[#07070c] py-20 md:py-[140px] px-4 md:px-12 font-jost">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <p className="text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.38em] uppercase text-white/50 font-medium mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
            <span className="inline-block w-6 md:w-8 h-px bg-white/30" />
            {t("sectionLabel")}
          </p>
          <h2 className="font-cormorant font-light text-[clamp(32px,4.5vw,58px)] text-white leading-[1.1] md:leading-[1.05] tracking-[-0.01em] mb-6 md:mb-10">
            {t("title")}<br />
            {t("subtitleLine1")}<br />
            <span className="text-white/50">{t("subtitleLine2")}</span>
          </h2>
          <p className="text-sm md:text-base font-normal text-white/75 leading-7 md:leading-8 tracking-[0.02em] mb-4 md:mb-6">
            {t("text1")}
          </p>
          <p className="text-sm md:text-base font-normal text-white/75 leading-7 md:leading-8 tracking-[0.02em]">
            {t("text2")}
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {stats.map((s, i) => (
            <div key={s.value} className="py-6 md:py-10 flex items-center justify-between border-t border-white/10" style={{ borderBottom: i === stats.length - 1 ? "0.5px solid rgba(255,255,255,0.1)" : "none" }}>
              <span className="font-cormorant font-medium text-[clamp(40px,5vw,72px)] text-white tracking-[-0.02em] leading-none">{s.value}</span>
              <span className="text-[11px] md:text-sm font-normal text-white/50 tracking-[0.12em] md:tracking-[0.15em] uppercase text-right">{t(`stats.${s.labelKey}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
