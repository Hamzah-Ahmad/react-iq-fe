import { z } from "zod";

const RegisterSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be atleast 6 characters ").max(20),
    confirmPassword: z
      .string()
      .min(6, "Password must be atleast 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default RegisterSchema;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;


