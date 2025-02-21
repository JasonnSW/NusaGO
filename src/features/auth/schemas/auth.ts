import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  institution: z.string().min(1, "Institution is required"),
  email: z.string().email(),
  username: z.string().min(6),
  password: z
    .string()
    .min(8, { message: "Password harus minimal 8 karakter" })
    .max(32, { message: "Password tidak boleh lebih dari 32 karakter" })
    .regex(/[A-Z]/, {
      message: "Password harus mengandung setidaknya satu huruf besar",
    })
    .regex(/[a-z]/, {
      message: "Password harus mengandung setidaknya satu huruf kecil",
    })
    .regex(/[0-9]/, {
      message: "Password harus mengandung setidaknya satu angka",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password harus mengandung setidaknya satu simbol (@$!%*?&)",
    }),
});

export type RegisterData = z.infer<typeof RegisterSchema>;
