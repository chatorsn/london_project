"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const otherLocale = locale === "en" ? "ru" : "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* ДЕСКТОП ВЕРСИЯ - показывается только на экранах шире 768px */}
      <header
        style={{
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
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
        }}
        className="desktop-header"
      >
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
        }}>
          <button
            onClick={() => scrollToSection("services")}
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(175,190,210,0.55)",
              textTransform: "uppercase",
              fontWeight: 300,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t("services")}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(175,190,210,0.55)",
              textTransform: "uppercase",
              fontWeight: 300,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t("about")}
          </button>
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
            <span style={{ color: "rgba(210,220,235,0.85)" }}>{locale.toUpperCase()}</span>
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

      {/* МОБИЛЬНАЯ ВЕРСИЯ - показывается только на экранах до 768px */}
      <div style={{ display: "none" }} className="mobile-header">
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            fontFamily: "var(--font-jost), sans-serif",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Link href={`/${locale}`} style={{
            fontWeight: 200,
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "rgba(210,218,230,0.7)",
            textTransform: "uppercase",
            lineHeight: 1.5,
            textDecoration: "none",
          }}>
            London Route<br />Transfers
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              fontSize: "22px",
              color: "rgba(210,218,230,0.8)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              right: 0,
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "24px 20px",
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(10px)",
              fontFamily: "var(--font-jost), sans-serif",
            }}
          >
            <button
              onClick={() => scrollToSection("services")}
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                color: "rgba(210,218,230,0.8)",
                textTransform: "uppercase",
                fontWeight: 300,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {t("services")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                color: "rgba(210,218,230,0.8)",
                textTransform: "uppercase",
                fontWeight: 300,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {t("about")}
            </button>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px 0" }} />
            <Link
              href={`/${otherLocale}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "14px",
                letterSpacing: "0.18em",
                color: "rgba(210,218,230,0.7)",
                textTransform: "uppercase",
                fontWeight: 300,
                textDecoration: "none",
                padding: "8px 0",
              }}
            >
              {locale.toUpperCase()} / {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/booking`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(200,212,228,0.8)",
                border: "0.5px solid rgba(175,195,220,0.28)",
                padding: "10px 20px",
                background: "transparent",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              {t("book")}
            </Link>
          </div>
        )}
      </div>

      {/* Стили для адаптива */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-header {
            display: none !important;
          }
          .mobile-header {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-header {
            display: flex !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
