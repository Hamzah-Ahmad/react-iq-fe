import { z } from "zod";

const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, "A username of atleast 3 characters is required")
    .max(20),
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 characters ").max(20),
});

export default RegisterSchema;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
