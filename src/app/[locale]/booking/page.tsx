"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
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
      <div style={{
        minHeight: "100vh",
        background: "#07070c",
        fontFamily: "var(--font-jost), sans-serif",
      }}>
        <div style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}>
          <div style={{
            textAlign: "center",
            maxWidth: 560,
            margin: "0 auto",
          }}>
            <div style={{
              fontSize: "64px",
              marginBottom: "24px",
            }}>✅</div>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "42px",
              fontWeight: 300,
              color: "rgba(225,232,245,0.9)",
              marginBottom: "16px",
            }}>
              {t("success.title")}
            </h2>
            <p style={{
              fontSize: "14px",
              color: "rgba(170,185,210,0.65)",
              lineHeight: 1.8,
            }}>
              {t("success.text")}
            </p>
            <Link href={`/${locale}`} style={{
              display: "inline-block",
              marginTop: "32px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(210,222,238,0.9)",
              border: "0.5px solid rgba(175,200,228,0.35)",
              padding: "14px 32px",
              background: "rgba(255,255,255,0.03)",
              textDecoration: "none",
            }}>
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#07070c",
      minHeight: "100vh",
      fontFamily: "var(--font-jost), sans-serif",
    }}>
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 48px",
        background: "rgba(7,7,12,0.95)",
        backdropFilter: "blur(10px)",
      }}>
        <Link href={`/${locale}`} style={{
          fontWeight: 200,
          fontSize: "10px",
          letterSpacing: "0.3em",
          color: "rgba(210,218,230,0.7)",
          textTransform: "uppercase",
          textDecoration: "none",
        }}>
          London Route<br />Transfers
        </Link>
        <Link href={`/${locale}`} style={{
          fontSize: "9.5px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(200,212,228,0.8)",
          border: "0.5px solid rgba(175,195,220,0.28)",
          padding: "9px 20px",
          background: "transparent",
          textDecoration: "none",
        }}>
          {t("back")}
        </Link>
      </header>

      <main style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "140px 48px 100px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: "9px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(180,195,220,0.5)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}>
            <span style={{ display: "inline-block", width: 32, height: "0.5px", background: "rgba(180,195,220,0.4)" }} />
            Booking
            <span style={{ display: "inline-block", width: 32, height: "0.5px", background: "rgba(180,195,220,0.4)" }} />
          </p>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(42px, 6vw, 72px)",
            color: "rgba(225,232,245,0.92)",
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            {t("title")}
          </h1>
          <p style={{
            fontSize: "12px",
            color: "rgba(170,185,210,0.65)",
            maxWidth: 480,
            margin: "0 auto",
          }}>
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{
          background: "rgba(15,15,25,0.6)",
          backdropFilter: "blur(10px)",
          border: "0.5px solid rgba(200,215,235,0.12)",
          borderRadius: "2px",
          padding: "48px 56px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "32px",
          }}>
            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.fullName")} *
              </label>
              <input
                {...register("fullName", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.fullName && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.company")}
              </label>
              <input
                {...register("company")}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.phone")} *
              </label>
              <input
                {...register("phone", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.phone && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.email")} *
              </label>
              <input
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.email && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.email")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.serviceType")} *
              </label>
              <select
                {...register("serviceType", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(30,30,45,0.9)",
                  border: "0.5px solid rgba(200,215,235,0.3)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.9)",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" style={{ background: "#1a1a2e", color: "rgba(225,232,245,0.7)" }}>{t("form.selectService")}</option>
                <option value="airport" style={{ background: "#1a1a2e", color: "rgba(225,232,245,0.9)" }}>{t("form.airport")}</option>
                <option value="corporate" style={{ background: "#1a1a2e", color: "rgba(225,232,245,0.9)" }}>{t("form.corporate")}</option>
                <option value="group" style={{ background: "#1a1a2e", color: "rgba(225,232,245,0.9)" }}>{t("form.group")}</option>
                <option value="private" style={{ background: "#1a1a2e", color: "rgba(225,232,245,0.9)" }}>{t("form.private")}</option>
              </select>
              {errors.serviceType && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.passengers")} *
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[name="passengers"]') as HTMLInputElement;
                    if (input) {
                      const val = parseInt(input.value) || 1;
                      input.value = String(Math.max(1, val - 1));
                      input.dispatchEvent(new Event('change'));
                    }
                  }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(200,215,235,0.3)",
                    padding: "8px 16px",
                    color: "rgba(225,232,245,0.9)",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  {...register("passengers", { required: true, min: 1, valueAsNumber: true })}
                  style={{
                    width: "80px",
                    textAlign: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(200,215,235,0.2)",
                    padding: "12px 8px",
                    color: "rgba(225,232,245,0.85)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[name="passengers"]') as HTMLInputElement;
                    if (input) {
                      const val = parseInt(input.value) || 1;
                      input.value = String(Math.min(20, val + 1));
                      input.dispatchEvent(new Event('change'));
                    }
                  }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(200,215,235,0.3)",
                    padding: "8px 16px",
                    color: "rgba(225,232,245,0.9)",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  +
                </button>
              </div>
              {errors.passengers && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.passengers")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.pickup")} *
              </label>
              <input
                {...register("pickup", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.pickup && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.destination")} *
              </label>
              <input
                {...register("destination", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.destination && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.date")} *
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.date && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(170,185,210,0.5)",
                marginBottom: 8,
              }}>
                {t("form.time")} *
              </label>
              <input
                type="time"
                {...register("time", { required: true })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(200,215,235,0.2)",
                  padding: "12px 16px",
                  color: "rgba(225,232,245,0.85)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {errors.time && <p style={{ color: "#c44", fontSize: "10px", marginTop: 4 }}>{t("validation.required")}</p>}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                {...register("meetAndGreet")}
                style={{ width: 16, height: 16 }}
              />
              <span style={{
                fontSize: "11px",
                color: "rgba(170,185,210,0.7)",
                letterSpacing: "0.05em",
              }}>
                {t("form.meetAndGreet")}
              </span>
            </label>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(170,185,210,0.5)",
              marginBottom: 8,
            }}>
              {t("form.notes")}
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(200,215,235,0.2)",
                padding: "12px 16px",
                color: "rgba(225,232,245,0.85)",
                fontSize: "13px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                {...register("consent", { required: true })}
                style={{ width: 16, height: 16, marginTop: 2 }}
              />
              <span style={{
                fontSize: "10px",
                color: "rgba(170,185,210,0.6)",
                lineHeight: 1.5,
              }}>
                {t("form.consent")}
              </span>
            </label>
            {errors.consent && <p style={{ color: "#c44", fontSize: "10px", marginTop: 8 }}>{t("validation.consent")}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "0.5px solid rgba(175,200,228,0.35)",
              padding: "16px",
              color: "rgba(210,222,238,0.9)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </button>

          <p style={{
            fontSize: "9px",
            color: "rgba(150,168,200,0.4)",
            textAlign: "center",
            marginTop: 24,
            letterSpacing: "0.05em",
          }}>
            {t("form.footerNote")}
          </p>
        </form>
      </main>
    </div>
  );
}
