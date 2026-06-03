"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  
  const t = useTranslations("footer");

  return (
    <footer style={{
      background: "#05050a",
      padding: "80px 48px 40px",
      fontFamily: "var(--font-jost), sans-serif",
      borderTop: "0.5px solid rgba(200,215,235,0.08)",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 48,
          paddingBottom: 64,
          borderBottom: "0.5px solid rgba(200,215,235,0.08)",
        }}>
          <div>
            <p style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(220,230,245,0.85)",
              fontWeight: 200,
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              London Route<br />Transfers
            </p>
            <p style={{
              fontSize: "11px",
              fontWeight: 200,
              color: "rgba(160,178,208,0.75)",
              lineHeight: 1.9,
              letterSpacing: "0.03em",
            }}>
              Private Limited Company<br />
              registered in England and Wales<br />
              Company No: 00000000
            </p>
          </div>

          <div>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(170,185,215,0.5)",
              fontWeight: 300,
              marginBottom: 20,
            }}>
              Contacts
            </p>
            <p style={{
              fontSize: "11px",
              fontWeight: 200,
              color: "rgba(185,200,225,0.8)",
              lineHeight: 2,
              letterSpacing: "0.03em",
            }}>
              booking@example.test<br />
              +44 0000 000000<br />
              10 Example House, London
            </p>
          </div>

          <div>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(170,185,215,0.5)",
              fontWeight: 300,
              marginBottom: 20,
            }}>
              Legal
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: t("privacy"), href: `/${locale}/privacy` },
                { label: t("cookies"), href: `/${locale}/cookies` },
                { label: t("terms"), href: `/${locale}/terms` },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{
                  fontSize: "11px",
                  fontWeight: 200,
                  color: "rgba(170,188,215,0.7)",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                }}>
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
        }}>
          <p style={{
            fontSize: "10px",
            fontWeight: 200,
            color: "rgba(150,168,200,0.5)",
            letterSpacing: "0.06em",
          }}>
            © London Route Transfers, 2009–2026. All rights reserved.
          </p>
          <p style={{
            fontSize: "10px",
            fontWeight: 200,
            color: "rgba(150,168,200,0.5)",
            letterSpacing: "0.06em",
          }}>
            VAT: GB 000000000
          </p>
        </div>

      </div>
    </footer>
  );
}
