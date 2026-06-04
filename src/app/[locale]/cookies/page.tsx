import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string };
}

export default function CookiesPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("legal.cookies");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d0f18",
        padding: "120px 48px",
        color: "rgba(220,230,245,0.85)",
        fontFamily: "var(--font-jost), sans-serif",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", marginBottom: "32px" }}>
        {t("title")}
      </h1>
      <p style={{ marginBottom: "16px", lineHeight: 1.8 }}>{t("text1")}</p>
      <p style={{ marginBottom: "16px", lineHeight: 1.8 }}>{t("text2")}</p>
    </main>
  );
}