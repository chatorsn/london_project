"use client";

const stats = [
  { value: "15+", label: "Years on the market" },
  { value: "5", label: "London airports" },
  { value: "24/7", label: "Available" },
];

export default function About() {
  return (
    <section id="about" style={{
      background: "#07070c",
      padding: "140px 48px",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>

        <div>
          <p style={{
            fontSize: "9px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(180,195,220,0.5)",
            fontWeight: 300,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <span style={{ display: "inline-block", width: 32, height: "0.5px", background: "rgba(180,195,220,0.4)" }} />
            About
          </p>

          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(38px, 4.5vw, 58px)",
            color: "rgba(225,232,245,0.92)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 40,
          }}>
            Reliable operator<br />
            of passenger transport<br />
            <span style={{ color: "rgba(180,195,218,0.4)" }}>in London</span>
          </h2>

          <p style={{
            fontSize: "12px",
            fontWeight: 200,
            color: "rgba(170,185,210,0.65)",
            lineHeight: 2,
            letterSpacing: "0.04em",
            marginBottom: 16,
          }}>
            London Route Transfers organises passenger transport in London and beyond. We work with private clients, companies and groups.
          </p>
          <p style={{
            fontSize: "12px",
            fontWeight: 200,
            color: "rgba(170,185,210,0.65)",
            lineHeight: 2,
            letterSpacing: "0.04em",
          }}>
            Every journey is managed as a controlled process — from receiving the request to completing the route.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {stats.map((s, i) => (
            <div key={s.value} style={{
              padding: "40px 0",
              borderTop: "0.5px solid rgba(200,215,235,0.12)",
              borderBottom: i === stats.length - 1 ? "0.5px solid rgba(200,215,235,0.12)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(42px, 5vw, 64px)",
                color: "rgba(225,232,245,0.88)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}>
                {s.value}
              </span>
              <span style={{
                fontSize: "10px",
                fontWeight: 300,
                color: "rgba(170,185,210,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textAlign: "right",
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
