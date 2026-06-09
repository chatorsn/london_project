import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: { locale: string };
}

export default function TransportTermsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("transportTerms");

  return (
    <main className="min-h-screen bg-[#07070c] pt-32 pb-20 px-4 md:px-12 font-jost">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${locale}`} className="text-white/60 hover:text-white text-xs md:text-sm tracking-[0.2em] uppercase no-underline inline-block mb-8">
          ← {t("back")}
        </Link>
        <h1 className="font-cormorant text-4xl md:text-5xl font-light text-white mb-6">
          {t("title")}
        </h1>
        <p className="text-white/60 text-sm md:text-base mb-10 leading-relaxed">
          {t("intro")}
        </p>
        <div className="space-y-6">
          {t.raw("sections").map((section: { title: string; content: string }, idx: number) => (
            <div key={idx} className="border border-white/10 rounded-lg p-5 md:p-6 bg-white/5">
              <h2 className="text-white text-lg md:text-xl font-medium mb-3">
                {section.title}
              </h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
