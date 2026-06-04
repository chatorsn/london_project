import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, { message: "validation.required" }),
  company: z.string().optional(),
  phone: z.string().min(5, { message: "validation.required" }),
  email: z.string().email({ message: "validation.email" }),
  serviceType: z.string().min(1, { message: "validation.required" }),
  pickup: z.string().min(1, { message: "validation.required" }),
  destination: z.string().min(1, { message: "validation.required" }),
  date: z.string().min(1, { message: "validation.required" }).refine(
    (date) => date >= new Date().toISOString().split("T")[0],
    { message: "validation.pastDate" }
  ),
  time: z.string().min(1, { message: "validation.required" }),
  passengers: z.number().min(1, { message: "validation.passengers" }),
  meetAndGreet: z.boolean().optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine(val => val === true, { message: "validation.consent" }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
