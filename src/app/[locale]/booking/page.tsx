"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  company: z.string().optional(),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  serviceType: z.enum(["airport", "corporate", "group", "private"], { required_error: "Required" }),
  pickup: z.string().min(1, "Required"),
  destination: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  time: z.string().min(1, "Required"),
  passengers: z.string().min(1, "Required"),
  meetGreet: z.enum(["yes", "no"]),
  notes: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
});

type FormData = z.infer<typeof schema>;

const inputStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "0.5px solid rgba(200,215,235,0.2)",
  padding: "12px 0",
  fontSize: "12px",
  fontWeight: 200,
  color: "rgba(220,230,245,0.9)",
  letterSpacing: "0.04em",
  outline: "none",
  fontFamily: "var(--font-jost), sans-serif",
};

const labelStyle = {
  fontSize: "9px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "rgba(150,170,200,0.5)",
  fontWeight: 300,
  display: "block",
  marginBottom: 6,
};

const errorStyle = {
  fontSize: "10px",
  color: "rgba(200,100,100,0.8)",
  marginTop: 4,
  letterSpacing: "0.04em",
};

export default function BookingPage() {
  const params = useParams();
  const locale = params?.locale as string ?? "en";
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d0f18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-jost), sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(150,170,200,0.5)", marginBottom: 24 }}>Thank you</p>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 58px)",
            color: "rgba(225,232,245,0.9)",
            marginBottom: 24,
          }}>
            Request received
          </h1>
          <p style={{ fontSize: "12px", fontWeight: 200, color: "rgba(170,185,210,0.65)", lineHeight: 1.9, marginBottom: 40 }}>
            We will contact you during business hours<br />to confirm the details of your trip.
          </p>
          <Link href={`/${locale}`} style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(175,195,220,0.6)",
            textDecoration: "none",
            fontWeight: 300,
          }}>
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f18", fontFamily: "var(--font-jost), sans-serif" }}>

      {/* Header */}
      <div style={{
        padding: "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "0.5px solid rgba(200,215,235,0.08)",
      }}>
        <Link href={`/${locale}`} style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(200,215,235,0.6)",
          textDecoration: "none",
          fontWeight: 200,
          lineHeight: 1.6,
        }}>
          London Route<br />Transfers
        </Link>
        <Link href={`/${locale}`} style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(150,170,200,0.4)",
          textDecoration: "none",
          fontWeight: 300,
        }}>
          ← Back
        </Link>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 48px 120px" }}>

        <p style={{
          fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase",
          color: "rgba(150,170,200,0.45)", fontWeight: 300, marginBottom: 24,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ display: "inline-block", width: 28, height: "0.5px", background: "rgba(150,170,200,0.35)" }} />
          Book a transfer
        </p>

        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(36px, 5vw, 58px)",
          color: "rgba(225,232,245,0.9)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          marginBottom: 64,
        }}>
          Leave a request — we will<br />
          <span style={{ color: "rgba(180,195,218,0.4)" }}>confirm the details</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 48 }}>

          {/* Contact */}
          <div>
            <p style={{ ...labelStyle, color: "rgba(180,195,220,0.6)", marginBottom: 32 }}>Contact information</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <label style={labelStyle}>First name *</label>
                <input {...register("firstName")} style={inputStyle} />
                {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Last name *</label>
                <input {...register("lastName")} style={inputStyle} />
                {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input {...register("company")} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input {...register("phone")} style={inputStyle} />
                {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Email *</label>
                <input {...register("email")} style={inputStyle} />
                {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <div style={{ height: "0.5px", background: "rgba(200,215,235,0.08)" }} />

          {/* Trip details */}
          <div>
            <p style={{ ...labelStyle, color: "rgba(180,195,220,0.6)", marginBottom: 32 }}>Trip details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Service type *</label>
                <select {...register("serviceType")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="" style={{ background: "#0d0f18" }}>Select service</option>
                  <option value="airport" style={{ background: "#0d0f18" }}>Airport Transfer</option>
                  <option value="corporate" style={{ background: "#0d0f18" }}>Corporate Travel</option>
                  <option value="group" style={{ background: "#0d0f18" }}>Group Transport</option>
                  <option value="private" style={{ background: "#0d0f18" }}>Private Journey</option>
                </select>
                {errors.serviceType && <p style={errorStyle}>{errors.serviceType.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Pickup address *</label>
                <input {...register("pickup")} style={inputStyle} />
                {errors.pickup && <p style={errorStyle}>{errors.pickup.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Destination *</label>
                <input {...register("destination")} style={inputStyle} />
                {errors.destination && <p style={errorStyle}>{errors.destination.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Date *</label>
                <input {...register("date")} type="date" style={{ ...inputStyle, colorScheme: "dark" }} />
                {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Time *</label>
                <input {...register("time")} type="time" style={{ ...inputStyle, colorScheme: "dark" }} />
                {errors.time && <p style={errorStyle}>{errors.time.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Passengers *</label>
                <input {...register("passengers")} type="number" min="1" style={inputStyle} />
                {errors.passengers && <p style={errorStyle}>{errors.passengers.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Meet & greet</label>
                <select {...register("meetGreet")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="no" style={{ background: "#0d0f18" }}>No</option>
                  <option value="yes" style={{ background: "#0d0f18" }}>Yes</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Additional notes</label>
                <textarea {...register("notes")} rows={3} style={{ ...inputStyle, resize: "none", display: "block" }} />
              </div>
            </div>
          </div>

          <div style={{ height: "0.5px", background: "rgba(200,215,235,0.08)" }} />

          {/* Consent */}
          <div>
            <label style={{ display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer" }}>
              <input {...register("consent")} type="checkbox" style={{ marginTop: 2, accentColor: "rgba(175,200,228,0.8)", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 200, color: "rgba(150,170,200,0.6)", lineHeight: 1.8, letterSpacing: "0.03em" }}>
                I confirm that I have read the Privacy Policy and Cookie Policy of London Route Transfers and consent to the processing of my personal data for the purpose of handling this request.
              </span>
            </label>
            {errors.consent && <p style={{ ...errorStyle, marginTop: 8 }}>{errors.consent.message}</p>}
          </div>

          <button type="submit" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(210,222,238,0.9)",
            border: "0.5px solid rgba(175,200,228,0.35)",
            padding: "16px 36px",
            background: "rgba(255,255,255,0.03)",
            cursor: "pointer",
            fontWeight: 300,
            alignSelf: "flex-start",
          }}>
            Submit request
            <span style={{ opacity: 0.45, fontSize: 18 }}>→</span>
          </button>

          <p style={{ fontSize: "10px", fontWeight: 200, color: "rgba(120,140,170,0.4)", lineHeight: 1.8, letterSpacing: "0.03em" }}>
            London Route Transfers processes personal data provided in this form solely for the purpose of handling the request and organising transport. Data is not used for marketing without separate consent and is not shared with third parties except where necessary to provide the service.
          </p>

        </form>
      </div>
    </div>
  );
}
