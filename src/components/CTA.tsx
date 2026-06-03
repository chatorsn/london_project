"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CTA() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("cta");

  return (
    <section style={{
      background: "#07070c",
      padding: "120px 48px",
      fontFamily: "var(--font-jost), sans-serif",
      borderTop: "0.5px solid rgba(200,215,235,0.08)",
    }}>
      <div style={{
        maxWidth: 1320,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 48,
      }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(36px, 4.5vw, 62px)",
          color: "rgba(225,232,245,0.9)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          maxWidth: 560,
        }}>
          {t("title")}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20, flexShrink: 0 }}>
          <Link href={`/${locale}/booking`} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(210,222,238,0.9)",
            border: "0.5px solid rgba(175,200,228,0.35)",
            padding: "16px 36px 16px 32px",
            background: "rgba(255,255,255,0.03)",
            textDecoration: "none",
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}>
            {t("button")}
            <span style={{ opacity: 0.45, fontSize: 18, fontWeight: 200 }}>→</span>
          </Link>

          <p style={{
            fontSize: "10px",
            fontWeight: 200,
            color: "rgba(170,185,215,0.55)",
            letterSpacing: "0.08em",
            textAlign: "right",
          }}>
            {t("reply")}
          </p>
        </div>
      </div>
    </section>
  );
}
