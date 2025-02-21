import { z } from "zod";

export const emailSchema = z.object({
  link: z.string().min(1, "link is required"),
  features: z.string().min(6, "features is required"),
});

export type emailData = z.infer<typeof emailSchema>;