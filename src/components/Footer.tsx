"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("footer");

  return (
    <footer style={{
      background: "#05050a",
      padding: "60px 20px 40px",
      fontFamily: "var(--font-jost), sans-serif",
      borderTop: "0.5px solid rgba(255,255,255,0.1)",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Мобильная версия - колонки вертикально */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          paddingBottom: "40px",
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
        }} className="mobile-footer">
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "13px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "white",
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 16,
            }}>
              London Route<br />Transfers
            </p>
            <p style={{
              fontSize: "11px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              letterSpacing: "0.03em",
            }}>
              Private Limited Company
              <br />
              registered in England and Wales
              <br />
              Company No: 00000000
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
              marginBottom: 16,
            }}>
              Contacts
            </p>
            <p style={{
              fontSize: "11px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              letterSpacing: "0.03em",
            }}>
              booking@example.test
              <br />
              +44 0000 000000
              <br />
              10 Example House, London
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
              marginBottom: 16,
            }}>
              Legal
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
            }}>
              {[
                { label: t("privacy"), href: `/${locale}/privacy` },
                { label: t("cookies"), href: `/${locale}/cookies` },
                { label: t("terms"), href: `/${locale}/terms` },
                { label: t("managerLink"), href: `/${locale}/manager` },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Десктоп версия - три колонки */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 48,
          paddingBottom: 64,
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
        }} className="desktop-footer">
          <div>
            <p style={{
              fontSize: "13px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "white",
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              London Route
              <br />
              Transfers
            </p>
            <p style={{
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              letterSpacing: "0.03em",
            }}>
              Private Limited Company
              <br />
              registered in England and Wales
              <br />
              Company No: 00000000
            </p>
          </div>

          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
              marginBottom: 20,
            }}>
              Contacts
            </p>
            <p style={{
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 2,
              letterSpacing: "0.03em",
            }}>
              booking@example.test
              <br />
              +44 0000 000000
              <br />
              10 Example House, London
            </p>
          </div>

          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
              marginBottom: 20,
            }}>
              Legal
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {[
                { label: t("privacy"), href: `/${locale}/privacy` },
                { label: t("cookies"), href: `/${locale}/cookies` },
                { label: t("terms"), href: `/${locale}/terms` },
                { label: t("managerLink"), href: `/${locale}/manager` },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 32,
          flexDirection: "column",
          gap: "12px",
        }} className="footer-bottom">
          <p style={{
            fontSize: "10px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.06em",
            textAlign: "center",
          }}>
            © London Route Transfers, 2009–2026. All rights reserved.
          </p>
          <p style={{
            fontSize: "10px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.06em",
            textAlign: "center",
          }}>
            VAT: GB 000000000
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-footer {
            display: none !important;
          }
          .mobile-footer {
            display: flex !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-footer {
            display: grid !important;
          }
          .mobile-footer {
            display: none !important;
          }
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
