import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  return (
    <section className="bg-[#0a0a12] py-20 md:py-24 px-4 md:px-12 font-jost">
      <div className="max-w-[1320px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] md:text-[11px] tracking-[0.38em] uppercase text-white/50 font-medium mb-4 flex items-center justify-center gap-4">
            <span className="inline-block w-8 h-px bg-white/30" />
            Advantages
            <span className="inline-block w-8 h-px bg-white/30" />
          </p>
          <h2 className="font-cormorant font-light text-3xl md:text-5xl text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Кому подходят услуги */}
          <div className="bg-white/5 p-6 md:p-8 rounded-lg border border-white/10">
            <h3 className="font-cormorant text-2xl md:text-3xl text-white mb-6">
              {t("clients.title")}
            </h3>
            <ul className="space-y-3">
              {t.raw("clients.items").map((item: string, idx: number) => (
                <li key={idx} className="text-sm text-white/60 leading-relaxed flex items-start gap-3">
                  <span className="text-white/40 text-lg">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Почему выбирают нас */}
          <div className="bg-white/5 p-6 md:p-8 rounded-lg border border-white/10">
            <h3 className="font-cormorant text-2xl md:text-3xl text-white mb-6">
              {t("advantages.title")}
            </h3>
            <ul className="space-y-3">
              {t.raw("advantages.items").map((item: string, idx: number) => (
                <li key={idx} className="text-sm text-white/60 leading-relaxed flex items-start gap-3">
                  <span className="text-white/40 text-lg">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
