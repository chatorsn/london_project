import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: { locale: string };
}

export default function TermsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("legal");

  return (
    <main style={{
      minHeight: "100vh",
      background: "#07070c",
      padding: "140px 48px 100px",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Link href={`/${locale}`} style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "rgba(175,190,210,0.55)",
          textDecoration: "none",
          textTransform: "uppercase",
          display: "inline-block",
          marginBottom: 48,
        }}>
          {t("back")}
        </Link>
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "48px",
          fontWeight: 300,
          color: "rgba(225,232,245,0.9)",
          marginBottom: 32,
        }}>{t("terms.title")}</h1>
        <div style={{ color: "rgba(170,185,210,0.7)", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 20 }}>{t("terms.text1")}</p>
          <p style={{ marginBottom: 20 }}>{t("terms.text2")}</p>
          <p style={{ marginBottom: 20 }}>{t("terms.text3")}</p>
        </div>
      </div>
    </main>
  );
}
