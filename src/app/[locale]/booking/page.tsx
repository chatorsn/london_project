"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { bookingSchema, BookingFormData } from "@/lib/bookingSchema";

export default function BookingPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("booking");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: 1,
      meetAndGreet: false,
      consent: false,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      
      console.log("Booking saved:", result);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#07070c] font-jost flex items-center justify-center p-6">
        <div className="text-center max-w-[560px] mx-auto">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white mb-4">{t("success.title")}</h2>
          <p className="text-sm text-white/60 leading-relaxed">{t("success.text")}</p>
          <Link href={`/${locale}`} className="inline-block mt-8 text-[10px] tracking-[0.25em] uppercase text-white border border-white/35 py-3 px-8 bg-transparent no-underline">
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-[#07070c] min-h-screen font-jost">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 md:py-6 bg-black/60 backdrop-blur-md">
        <Link href={`/${locale}`} className="text-white text-[11px] md:text-[13px] tracking-[0.25em] uppercase font-medium no-underline">
          London Route<br />Transfers
        </Link>
        <Link href={`/${locale}`} className="text-white/80 text-[10px] md:text-[11px] tracking-[0.22em] uppercase border border-white/30 py-2 px-5 no-underline">
          {t("back")}
        </Link>
      </header>

      <main className="pt-24 md:pt-36 pb-16 md:pb-24 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-white/50 mb-4 flex items-center justify-center gap-4">
              <span className="inline-block w-6 md:w-8 h-px bg-white/30" />
              Booking
              <span className="inline-block w-6 md:w-8 h-px bg-white/30" />
            </p>
            <h1 className="font-cormorant font-light text-4xl md:text-6xl lg:text-7xl text-white/90 mb-4">{t("title")}</h1>
            <p className="text-xs md:text-sm text-white/50 max-w-md mx-auto">{t("subtitle")}</p>
          </div>

          {submitError && (
            <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-6 text-red-300 text-sm text-center">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 backdrop-blur border border-white/10 rounded p-6 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.fullName")} *</label>
                <input {...register("fullName")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{t(errors.fullName.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.company")}</label>
                <input {...register("company")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.phone")} *</label>
                <input {...register("phone")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.phone && <p className="text-red-400 text-[10px] mt-1">{t(errors.phone.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.email")} *</label>
                <input type="email" {...register("email")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.email && <p className="text-red-400 text-[10px] mt-1">{t(errors.email.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.serviceType")} *</label>
                <select {...register("serviceType")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none">
                  <option value="" className="bg-[#1a1a2e]">{t("form.selectService")}</option>
                  <option value="airport" className="bg-[#1a1a2e]">{t("form.airport")}</option>
                  <option value="corporate" className="bg-[#1a1a2e]">{t("form.corporate")}</option>
                  <option value="group" className="bg-[#1a1a2e]">{t("form.group")}</option>
                  <option value="private" className="bg-[#1a1a2e]">{t("form.private")}</option>
                </select>
                {errors.serviceType && <p className="text-red-400 text-[10px] mt-1">{t(errors.serviceType.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.passengers")} *</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => { const input = document.querySelector('input[name="passengers"]') as HTMLInputElement; if (input) { input.value = String(Math.max(1, (parseInt(input.value) || 1) - 1)); input.dispatchEvent(new Event('change')); } }} className="bg-white/10 border border-white/20 px-4 py-2 text-white cursor-pointer">−</button>
                  <input type="number" {...register("passengers", { valueAsNumber: true })} className="w-20 text-center bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                  <button type="button" onClick={() => { const input = document.querySelector('input[name="passengers"]') as HTMLInputElement; if (input) { input.value = String(Math.min(20, (parseInt(input.value) || 1) + 1)); input.dispatchEvent(new Event('change')); } }} className="bg-white/10 border border-white/20 px-4 py-2 text-white cursor-pointer">+</button>
                </div>
                {errors.passengers && <p className="text-red-400 text-[10px] mt-1">{t(errors.passengers.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.pickup")} *</label>
                <input {...register("pickup")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.pickup && <p className="text-red-400 text-[10px] mt-1">{t(errors.pickup.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.destination")} *</label>
                <input {...register("destination")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.destination && <p className="text-red-400 text-[10px] mt-1">{t(errors.destination.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.date")} *</label>
                <input type="date" {...register("date")} min={today} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.date && <p className="text-red-400 text-[10px] mt-1">{t(errors.date.message as any)}</p>}
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.time")} *</label>
                <input type="time" {...register("time")} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none" />
                {errors.time && <p className="text-red-400 text-[10px] mt-1">{t(errors.time.message as any)}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" {...register("meetAndGreet")} className="w-4 h-4" />
                <span className="text-xs text-white/60">{t("form.meetAndGreet")}</span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{t("form.notes")}</label>
              <textarea {...register("notes")} rows={4} className="w-full bg-white/5 border border-white/20 p-3 text-white/80 text-sm outline-none resize-vertical" />
            </div>

            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" {...register("consent")} className="w-4 h-4 mt-0.5" />
                <span className="text-[10px] text-white/50 leading-relaxed">{t("form.consent")}</span>
              </label>
              {errors.consent && <p className="text-red-400 text-[10px] mt-2">{t(errors.consent.message as any)}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-white/10 border border-white/30 py-4 text-white/90 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium cursor-pointer transition-all hover:bg-white/20 disabled:opacity-50">
              {isSubmitting ? t("form.sending") : t("form.submit")}
            </button>

            <p className="text-[9px] text-white/30 text-center mt-6">{t("form.footerNote")}</p>
          </form>
        </div>
      </main>
    </div>
  );
}
