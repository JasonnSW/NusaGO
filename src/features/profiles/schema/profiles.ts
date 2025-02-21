import { z } from "zod";

export const ProfileSchema = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  institution: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bahasa: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
  negara: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export type ProfileData = z.infer<typeof ProfileSchema>;
