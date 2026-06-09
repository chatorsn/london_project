"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type Booking = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  status: string;
  meetAndGreet: boolean;
  notes: string;
  createdAt: string;
};

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(255,180,50,0.15)", text: "#ffb432" },
  confirmed: { bg: "rgba(50,200,100,0.15)", text: "#32c864" },
  completed: { bg: "rgba(100,150,255,0.15)", text: "#6496ff" },
  cancelled: { bg: "rgba(255,80,80,0.15)", text: "#ff5050" },
};

const serviceTypeLabels: Record<string, string> = {
  airport: "Airport Transfer",
  corporate: "Corporate Transport",
  group: "Group Transport",
  private: "Private Journey",
};

export default function ManagerPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("manager");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/bookings");
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
      setError("Backend not running. Please start backend on port 4000");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.fullName.toLowerCase().includes(search.toLowerCase()) || booking.id.toString().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["all", "pending", "confirmed", "completed", "cancelled"];

  if (isLoading) {
    return (
      <div className="bg-[#0a0a12] min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-10 h-10 border-2 border-white/10 border-t-white/80 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0a0a12] min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="text-white/70 text-xs underline">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-[#0a0a12] min-h-screen font-jost">
      <header className="bg-[#05050a] border-b border-white/10 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center">
        <div>
          <h1 className="font-cormorant text-xl md:text-2xl font-light text-white/90">{t("title")}</h1>
          <p className="text-[9px] md:text-[10px] text-white/40 mt-1">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}`} className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-white/70 border border-white/30 py-2 px-4 md:px-5 no-underline">
          {t("back")}
        </Link>
      </header>

      <main className="p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 md:px-5 py-2 text-[9px] md:text-[10px] tracking-[0.1em] uppercase cursor-pointer transition-all ${
                    statusFilter === status ? "bg-white/20 text-white" : "bg-white/5 text-white/50"
                  } border border-white/20`}
                >
                  {t(`status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/20 px-4 py-2 text-white/80 text-sm outline-none min-w-[200px] md:min-w-[250px]"
            />
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 md:py-20 bg-white/5 border border-white/10">
              <p className="text-3xl mb-4">📋</p>
              <p className="text-sm text-white/50">{t("noBookings")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/15 text-left">
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light">{t("tableId")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light">{t("tableCustomer")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light hidden md:table-cell">{t("tableService")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light hidden lg:table-cell">{t("tableRoute")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light">{t("tableDateTime")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light hidden sm:table-cell">{t("tablePassengers")}</th>
                    <th className="p-3 text-[9px] md:text-[10px] text-white/40 font-light">{t("tableStatus")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, idx) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="p-3 text-xs text-white/60">{booking.id}</td>
                      <td className="p-3">
                        <div className="text-sm text-white/80">{booking.fullName}</div>
                        <div className="text-[9px] md:text-[10px] text-white/40">{booking.email}</div>
                      </td>
                      <td className="p-3 text-xs text-white/60 hidden md:table-cell">{serviceTypeLabels[booking.serviceType]}</td>
                      <td className="p-3 text-xs text-white/60 hidden lg:table-cell">{booking.pickup.split(",")[0]} → {booking.destination.split(",")[0]}</td>
                      <td className="p-3 text-xs text-white/60">
                        {booking.date}<br />
                        <span className="text-[9px] text-white/40">{booking.time}</span>
                      </td>
                      <td className="p-3 text-xs text-white/60 hidden sm:table-cell">{booking.passengers}</td>
                      <td className="p-3">
                        <span
                          className="inline-block px-3 py-1 text-[9px] uppercase rounded"
                          style={{
                            background: statusColors[booking.status]?.bg || "rgba(255,255,255,0.1)",
                            color: statusColors[booking.status]?.text || "white",
                          }}
                        >
                          {t(`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}`)}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
            <p className="text-[9px] md:text-[10px] text-white/30">
              {t("total")}: {filteredBookings.length} {t("tableStatus").toLowerCase()}
            </p>
            <p className="text-[8px] md:text-[9px] text-white/20">{t("demoNote")}</p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
