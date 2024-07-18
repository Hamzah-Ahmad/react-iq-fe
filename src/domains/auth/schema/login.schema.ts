import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 characters ").max(20),
});

export default LoginSchema;

export type LoginSchemaType = z.infer<typeof LoginSchema>;
