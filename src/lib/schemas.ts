import { z } from "zod";

/**
 * Visa Application Schema (existing)
 */
export const visaApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  nationality: z.string().min(2, "Nationality is required."),
  passportNumber: z
    .string()
    .regex(/^[A-Z0-9]{6,15}$/, "Invalid passport number format."),
  duration: z.string().min(1, "Please select a duration."),
  document: z.any(),
});

/**
 * Contact Form Schema (new)
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  message: z.string().min(5, "Message must be at least 5 characters."),
});
