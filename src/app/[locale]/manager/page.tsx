"use client";

const bookings = [
  { id: "BK-001", customer: "John Smith", service: "Airport Transfer", date: "2026-06-10", status: "Confirmed" },
  { id: "BK-002", customer: "Sarah Johnson", service: "Corporate Travel", date: "2026-06-12", status: "Pending" },
  { id: "BK-003", customer: "Michael Brown", service: "Private Journey", date: "2026-06-15", status: "Completed" }
];

export default function ManagerPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0f18", padding: "120px 48px", fontFamily: "var(--font-jost), sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "56px", color: "rgba(225,232,245,0.9)", marginBottom: 48 }}>
          Booking Manager
        </h1>

        <table style={{ width: "100%", borderCollapse: "collapse", color: "rgba(210,220,235,0.85)" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "16px 0" }}>ID</th>
              <th style={{ textAlign: "left" }}>Customer</th>
              <th style={{ textAlign: "left" }}>Service</th>
              <th style={{ textAlign: "left" }}>Date</th>
              <th style={{ textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ padding: "20px 0" }}>{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
