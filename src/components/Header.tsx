"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const otherLocale = locale === "en" ? "ru" : "en";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 font-jost">
      <Link href={`/${locale}`} className="font-extralight text-[10px] tracking-[0.3em] text-[rgba(210,218,230,0.7)] uppercase leading-relaxed no-underline">
        London Route<br />Transfers
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-9">
        <button
          onClick={() => scrollToSection("services")}
          className="text-[10px] tracking-[0.2em] text-[rgba(175,190,210,0.55)] uppercase font-light bg-none border-none cursor-pointer"
        >
          {t("services")}
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-[10px] tracking-[0.2em] text-[rgba(175,190,210,0.55)] uppercase font-light bg-none border-none cursor-pointer"
        >
          {t("about")}
        </button>
      </nav>

      <div className="flex items-center gap-6">
        <Link href={`/${otherLocale}`} className="text-[10px] tracking-[0.18em] text-[rgba(175,190,210,0.5)] uppercase font-light no-underline">
          <span className="text-[rgba(210,220,235,0.85)]">{locale.toUpperCase()}</span>
          {" / "}
          {otherLocale.toUpperCase()}
        </Link>

        <Link href={`/${locale}/booking`} className="text-[9.5px] tracking-[0.22em] uppercase text-[rgba(200,212,228,0.8)] border border-[rgba(175,195,220,0.28)] py-2 px-5 bg-transparent font-jost font-light no-underline whitespace-nowrap">
          {t("book")}
        </Link>
      </div>
    </header>
  );
}
