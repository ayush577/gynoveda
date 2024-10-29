import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2)
    .max(50),
  email: z.string().email(),
  countryCode: z.string({
    required_error: "Country code is required",
  }),
  phone: z.string().min(10).max(10).optional(),
  docterName: z
    .string({
      required_error: "Doctor name is required",
    })
    .min(2)
    .max(50),
  date: z.date(),
  timeSlot: z
    .string({
      required_error: "Please select an appointment time",
    })
    .min(1, "Please select an appointment time"),
});
