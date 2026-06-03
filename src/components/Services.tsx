"use client";

const services = [
  {
    number: "01",
    title: "Airport Transfers",
    sub: "Heathrow · Gatwick · Stansted · Luton · City",
    desc: "Meet & greet, flight tracking, luggage assistance.",
  },
  {
    number: "02",
    title: "Corporate Travel",
    sub: "Business trips & regular routes",
    desc: "Transport for employees, clients and corporate events.",
  },
  {
    number: "03",
    title: "Group Transport",
    sub: "Minibuses & coaches",
    desc: "Schools, tourists, corporate groups of any size.",
  },
  {
    number: "04",
    title: "Private Journeys",
    sub: "Weddings · Events · City travel",
    desc: "Premium and business class vehicles on demand.",
  },
];

export default function Services() {
  return (
    <section id="services" style={{
      background: "#09090e",
      padding: "140px 48px 120px",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>

        <p style={{
          fontSize: "9px",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "rgba(180,195,220,0.5)",
          fontWeight: 300,
          marginBottom: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <span style={{ display: "inline-block", width: 32, height: "0.5px", background: "rgba(180,195,220,0.4)" }} />
          Services
        </p>

        <div>
          {services.map((s, i) => (
            <div
              key={s.number}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr 1fr",
                alignItems: "center",
                gap: 48,
                padding: "40px 0",
                borderTop: "0.5px solid rgba(200,215,235,0.15)",
                borderBottom: i === services.length - 1 ? "0.5px solid rgba(200,215,235,0.15)" : "none",
                cursor: "default",
                transition: "padding-left 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.paddingLeft = "16px";
                (e.currentTarget.querySelector(".title") as HTMLElement).style.color = "rgba(240,244,252,1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.paddingLeft = "0px";
                (e.currentTarget.querySelector(".title") as HTMLElement).style.color = "rgba(225,232,245,0.9)";
              }}
            >
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "rgba(180,195,220,0.35)",
                fontWeight: 300,
              }}>
                {s.number}
              </span>

              <div>
                <h3
                  className="title"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    color: "rgba(225,232,245,0.9)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    transition: "color 0.3s",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(170,185,210,0.55)",
                  fontWeight: 300,
                  textTransform: "uppercase",
                }}>
                  {s.sub}
                </p>
              </div>

              <p style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(170,185,210,0.65)",
                lineHeight: 1.8,
                letterSpacing: "0.04em",
                textAlign: "right",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
