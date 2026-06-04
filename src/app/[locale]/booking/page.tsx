"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

type BookingFormData = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  serviceType: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  meetAndGreet: boolean;
  notes: string;
  consent: boolean;
};

export default function BookingPage() {
  const t = useTranslations("booking");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      passengers: 1,
      meetAndGreet: false,
      consent: false,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Booking data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">{t("success.title")}</h2>
            <p className="text-gray-600">{t("success.text")}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl text-center mb-4">
          {t("title")}
        </h1>
        <p className="text-center text-gray-600 mb-12">{t("subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t("form.fullName")} *</label>
              <input {...register("fullName", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.company")}</label>
              <input {...register("company")} className="w-full border rounded-lg p-3" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.phone")} *</label>
              <input {...register("phone", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.email")} *</label>
              <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/ })} className="w-full border rounded-lg p-3" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{t("validation.email")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.serviceType")} *</label>
              <select {...register("serviceType", { required: true })} className="w-full border rounded-lg p-3">
                <option value="">{t("form.selectService")}</option>
                <option value="airport">{t("form.airport")}</option>
                <option value="corporate">{t("form.corporate")}</option>
                <option value="group">{t("form.group")}</option>
                <option value="private">{t("form.private")}</option>
              </select>
              {errors.serviceType && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.passengers")} *</label>
              <input type="number" {...register("passengers", { required: true, min: 1 })} className="w-full border rounded-lg p-3" />
              {errors.passengers && <p className="text-red-500 text-sm mt-1">{t("validation.passengers")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.pickup")} *</label>
              <input {...register("pickup", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.pickup && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.destination")} *</label>
              <input {...register("destination", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.destination && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.date")} *</label>
              <input type="date" {...register("date", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.date && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("form.time")} *</label>
              <input type="time" {...register("time", { required: true })} className="w-full border rounded-lg p-3" />
              {errors.time && <p className="text-red-500 text-sm mt-1">{t("validation.required")}</p>}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("meetAndGreet")} className="w-4 h-4" />
              <span className="text-sm">{t("form.meetAndGreet")}</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("form.notes")}</label>
            <textarea {...register("notes")} rows={3} className="w-full border rounded-lg p-3" />
          </div>

          <div>
            <label className="flex items-start gap-2">
              <input type="checkbox" {...register("consent", { required: true })} className="w-4 h-4 mt-1" />
              <span className="text-sm text-gray-600">{t("form.consent")}</span>
            </label>
            {errors.consent && <p className="text-red-500 text-sm mt-1">{t("validation.consent")}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">{t("form.footerNote")}</p>
        </form>
      </div>
    </main>
  );
}
