"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock данные бронирований
const mockBookings = [
  {
    id: "BR-001",
    customer: "John Smith",
    phone: "+44 7700 123456",
    email: "john@example.com",
    serviceType: "airport",
    pickup: "Heathrow Airport, Terminal 5",
    destination: "Kensington, London",
    date: "2026-06-15",
    time: "14:00",
    passengers: 2,
    status: "confirmed",
    createdAt: "2026-06-10T10:30:00",
  },
  {
    id: "BR-002",
    customer: "Sarah Johnson",
    phone: "+44 7700 234567",
    email: "sarah@example.com",
    serviceType: "corporate",
    pickup: "Canary Wharf",
    destination: "Heathrow Airport",
    date: "2026-06-16",
    time: "08:30",
    passengers: 3,
    status: "pending",
    createdAt: "2026-06-11T14:20:00",
  },
  {
    id: "BR-003",
    customer: "Michael Brown",
    phone: "+44 7700 345678",
    email: "michael@example.com",
    serviceType: "group",
    pickup: "Victoria Station",
    destination: "Gatwick Airport",
    date: "2026-06-17",
    time: "09:00",
    passengers: 8,
    status: "confirmed",
    createdAt: "2026-06-12T09:15:00",
  },
  {
    id: "BR-004",
    customer: "Emma Wilson",
    phone: "+44 7700 456789",
    email: "emma@example.com",
    serviceType: "private",
    pickup: "Soho, London",
    destination: "Windsor Castle",
    date: "2026-06-18",
    time: "11:00",
    passengers: 4,
    status: "completed",
    createdAt: "2026-06-13T16:45:00",
  },
];

const statusColors = {
  pending: { bg: "rgba(255,180,50,0.15)", text: "#ffb432" },
  confirmed: { bg: "rgba(50,200,100,0.15)", text: "#32c864" },
  completed: { bg: "rgba(100,150,255,0.15)", text: "#6496ff" },
};

const serviceTypeLabels = {
  airport: "Airport Transfer",
  corporate: "Corporate Transport",
  group: "Group Transport",
  private: "Private Journey",
};

export default function ManagerPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.customer.toLowerCase().includes(search.toLowerCase()) ||
                          booking.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{
      background: "#0a0a12",
      minHeight: "100vh",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <header style={{
        background: "#05050a",
        borderBottom: "0.5px solid rgba(200,215,235,0.08)",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "24px",
            fontWeight: 300,
            color: "rgba(225,232,245,0.9)",
            margin: 0,
          }}>
            Manager Dashboard
          </h1>
          <p style={{
            fontSize: "10px",
            color: "rgba(170,185,210,0.5)",
            marginTop: 4,
          }}>
            Booking Management System
          </p>
        </div>
        <Link href={`/${locale}`} style={{
          fontSize: "9.5px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(200,212,228,0.8)",
          border: "0.5px solid rgba(175,195,220,0.28)",
          padding: "8px 20px",
          background: "transparent",
          textDecoration: "none",
        }}>
          Back to Site
        </Link>
      </header>

      <main style={{ padding: "32px" }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {/* Filters */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div style={{ display: "flex", gap: 12 }}>
              {["all", "pending", "confirmed", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    background: statusFilter === status ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(200,215,235,0.2)",
                    padding: "8px 20px",
                    color: statusFilter === status ? "rgba(225,232,245,0.9)" : "rgba(170,185,210,0.6)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(200,215,235,0.2)",
                padding: "10px 16px",
                color: "rgba(225,232,245,0.85)",
                fontSize: "12px",
                minWidth: 250,
                outline: "none",
              }}
            />
          </div>

          {/* Bookings Table */}
          {filteredBookings.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px",
              background: "rgba(255,255,255,0.02)",
              border: "0.5px solid rgba(200,215,235,0.08)",
            }}>
              <p style={{
                fontSize: "32px",
                marginBottom: 16,
              }}>📋</p>
              <p style={{
                fontSize: "14px",
                color: "rgba(170,185,210,0.6)",
              }}>No bookings found</p>
            </div>
          ) : (
            <div style={{
              overflowX: "auto",
            }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
              }}>
                <thead>
                  <tr style={{
                    borderBottom: "0.5px solid rgba(200,215,235,0.15)",
                    textAlign: "left",
                  }}>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>ID</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Customer</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Service</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Route</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Date/Time</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Pass.</th>
                    <th style={{ padding: "16px 12px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      style={{
                        borderBottom: "0.5px solid rgba(200,215,235,0.08)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "14px 12px", fontSize: "12px", color: "rgba(200,212,228,0.7)" }}>{booking.id}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <div style={{ fontWeight: 500, color: "rgba(225,232,245,0.9)" }}>{booking.customer}</div>
                        <div style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)" }}>{booking.email}</div>
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>
                        {serviceTypeLabels[booking.serviceType as keyof typeof serviceTypeLabels]}
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>
                        <div>{booking.pickup.split(",")[0]}</div>
                        <div style={{ fontSize: "9px", color: "rgba(170,185,210,0.4)" }}>→ {booking.destination.split(",")[0]}</div>
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>
                        {booking.date}<br />
                        <span style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)" }}>{booking.time}</span>
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>{booking.passengers}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          background: statusColors[booking.status as keyof typeof statusColors].bg,
                          color: statusColors[booking.status as keyof typeof statusColors].text,
                          borderRadius: "2px",
                        }}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{
            marginTop: 24,
            padding: "16px 0",
            borderTop: "0.5px solid rgba(200,215,235,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <p style={{
              fontSize: "10px",
              color: "rgba(170,185,210,0.4)",
            }}>
              Total: {filteredBookings.length} bookings
            </p>
            <p style={{
              fontSize: "9px",
              color: "rgba(170,185,210,0.3)",
            }}>
              Demo data • Form submissions are not saved to this list
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
