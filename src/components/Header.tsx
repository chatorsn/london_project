"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");

  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "24px 48px",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <Link href={`/${locale}`} style={{
        fontWeight: 200,
        fontSize: "10px",
        letterSpacing: "0.3em",
        color: "rgba(210,218,230,0.7)",
        textTransform: "uppercase",
        lineHeight: 1.6,
        textDecoration: "none",
      }}>
        London Route<br />Transfers
      </Link>

      <nav style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 36,
        listStyle: "none",
      }}>
        {[
          { label: t("services"), href: `/${locale}/#services` },
          { label: t("fleet"), href: `/${locale}/#fleet` },
          { label: t("about"), href: `/${locale}/#about` },
          { label: t("contacts"), href: `/${locale}/#contacts` },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(175,190,210,0.55)",
              textDecoration: "none",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href={`/${otherLocale}`} style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "rgba(175,190,210,0.5)",
          textTransform: "uppercase",
          fontWeight: 300,
          textDecoration: "none",
        }}>
          <span style={{ color: "rgba(210,220,235,0.85)" }}>
            {locale.toUpperCase()}
          </span>
          {" / "}
          {otherLocale.toUpperCase()}
        </Link>

        <Link href={`/${locale}/booking`} style={{
          fontSize: "9.5px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(200,212,228,0.8)",
          border: "0.5px solid rgba(175,195,220,0.28)",
          padding: "9px 20px",
          background: "transparent",
          fontFamily: "var(--font-jost), sans-serif",
          fontWeight: 300,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}>
          {t("book")}
        </Link>
      </div>
    </header>
  );
}
