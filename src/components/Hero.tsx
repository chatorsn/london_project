"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#0d0f14",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('/london-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        filter: "saturate(0.3) brightness(0.5) contrast(1.2)",
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(6,7,12,0.92) 0%, rgba(6,7,12,0.3) 60%, rgba(6,7,12,0.5) 100%)",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(6,7,12,0.75) 0%, transparent 50%)",
      }} />

      <div style={{
        position: "absolute",
        bottom: 64,
        left: 48,
        zIndex: 10,
        maxWidth: 680,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
          fontSize: "9.5px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(150,170,200,0.55)",
          fontWeight: 300,
        }}>
          <span style={{ display: "inline-block", width: 28, height: 0.5, background: "rgba(150,170,200,0.4)" }} />
          Passenger transport · London
        </div>

        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(72px, 11vw, 118px)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          color: "rgba(240,244,252,1)",
          margin: 0,
        }}>
          LONDON<br />
          ROUTE<br />
          <span style={{ color: "rgba(200,212,232,0.7)" }}>TRANSFERS</span>
        </h1>

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 48,
          marginTop: 32,
        }}>
          <p style={{
            fontSize: "11.5px",
            fontWeight: 200,
            color: "rgba(175,190,215,0.85)",
            letterSpacing: "0.06em",
            lineHeight: 1.9,
            maxWidth: 240,
            margin: 0,
          }}>
            Airports, corporate<br />and private travel
          </p>

          <Link href="/booking" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "9.5px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(210,222,238,0.9)",
            border: "0.5px solid rgba(175,200,228,0.3)",
            padding: "14px 32px 14px 28px",
            background: "rgba(255,255,255,0.03)",
            textDecoration: "none",
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}>
            Book a transfer
            <span style={{ opacity: 0.45, fontSize: 16, fontWeight: 200 }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
