"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { mockBookings, serviceTypeLabels, statusColors } from "@/lib/mockBookings";

export default function ManagerPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("manager");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.customer.toLowerCase().includes(search.toLowerCase()) || booking.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["all", "pending", "confirmed", "completed"];

  if (isLoading) {
    return (
      <div style={{ background: "#0a0a12", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid rgba(255,255,255,0.8)", borderRadius: "50%" }} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ background: "#0a0a12", minHeight: "100vh", fontFamily: "var(--font-jost), sans-serif" }}>
      <header style={{ background: "#05050a", borderBottom: "0.5px solid rgba(200,215,235,0.08)", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", fontWeight: 300, color: "rgba(225,232,245,0.9)", margin: 0 }}>{t("title")}</h1>
          <p style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)", marginTop: 4 }}>{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}`} style={{ fontSize: "9.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,212,228,0.8)", border: "0.5px solid rgba(175,195,220,0.28)", padding: "8px 20px", background: "transparent", textDecoration: "none" }}>{t("back")}</Link>
      </header>

      <main style={{ padding: "32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {statuses.map((status, idx) => (
                <motion.button
                  key={status}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
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
                  {t(`status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                </motion.button>
              ))}
            </div>
            <motion.input
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              type="text"
              placeholder={t("search")}
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

          {!isMobile ? (
            <AnimatePresence mode="wait">
              {filteredBookings.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ textAlign: "center", padding: "80px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(200,215,235,0.08)" }}>
                  <p style={{ fontSize: "32px", marginBottom: 16 }}>📋</p>
                  <p style={{ fontSize: "14px", color: "rgba(170,185,210,0.6)" }}>{t("noBookings")}</p>
                </motion.div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "0.5px solid rgba(200,215,235,0.15)", textAlign: "left" }}>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableId")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableCustomer")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableService")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableRoute")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableDateTime")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tablePassengers")}</th>
                        <th style={{ padding: "16px 12px", fontSize: "10px", color: "rgba(170,185,210,0.5)", fontWeight: 300 }}>{t("tableStatus")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking, idx) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{ borderBottom: "0.5px solid rgba(200,215,235,0.08)" }}
                          whileHover={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <td style={{ padding: "14px 12px", fontSize: "12px", color: "rgba(200,212,228,0.7)" }}>{booking.id}</td>
                          <td style={{ padding: "14px 12px" }}>
                            <div style={{ fontWeight: 500, color: "rgba(225,232,245,0.9)" }}>{booking.customer}</div>
                            <div style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)" }}>{booking.email}</div>
                          </td>
                          <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>{serviceTypeLabels[booking.serviceType]}</td>
                          <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>{booking.pickup.split(",")[0]} → {booking.destination.split(",")[0]}</td>
                          <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>{booking.date}<br /><span style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)" }}>{booking.time}</span></td>
                          <td style={{ padding: "14px 12px", fontSize: "11px", color: "rgba(200,212,228,0.7)" }}>{booking.passengers}</td>
                          <td style={{ padding: "14px 12px" }}>
                            <span style={{
                              display: "inline-block",
                              padding: "4px 12px",
                              fontSize: "9px",
                              textTransform: "uppercase",
                              background: statusColors[booking.status].bg,
                              color: statusColors[booking.status].text,
                              borderRadius: "2px",
                            }}>
                              {t(`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}`)}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              {filteredBookings.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ textAlign: "center", padding: "60px 20px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(200,215,235,0.08)" }}>
                  <p style={{ fontSize: "40px", marginBottom: 16 }}>📋</p>
                  <p style={{ fontSize: "13px", color: "rgba(170,185,210,0.6)" }}>{t("noBookings")}</p>
                </motion.div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredBookings.map((booking, idx) => (
                    <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(200,215,235,0.1)", padding: "14px", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(225,232,245,0.9)" }}>{booking.customer}</span>
                          <span style={{ fontSize: "9px", color: "rgba(170,185,210,0.4)", marginLeft: "8px" }}>{booking.id}</span>
                        </div>
                        <span style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          fontSize: "8px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          background: statusColors[booking.status].bg,
                          color: statusColors[booking.status].text,
                          borderRadius: "2px",
                          whiteSpace: "nowrap",
                        }}>
                          {t(`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}`)}
                        </span>
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(170,185,210,0.6)", marginBottom: "6px" }}>
                        {serviceTypeLabels[booking.serviceType]} • {booking.passengers} {t("tablePassengers").toLowerCase()}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(170,185,210,0.5)", marginBottom: "4px" }}>
                        📍 {booking.pickup.split(",")[0]} → {booking.destination.split(",")[0]}
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(170,185,210,0.4)" }}>
                        📅 {booking.date} • ⏰ {booking.time}
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(170,185,210,0.35)", marginTop: "8px", wordBreak: "break-all" }}>
                        📧 {booking.email}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}

          <div style={{ marginTop: 24, padding: "16px 0", borderTop: "0.5px solid rgba(200,215,235,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            <p style={{ fontSize: "10px", color: "rgba(170,185,210,0.4)" }}>{t("total")}: {filteredBookings.length} {t("tableStatus").toLowerCase()}</p>
            <p style={{ fontSize: "9px", color: "rgba(170,185,210,0.3)" }}>{t("demoNote")}</p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
