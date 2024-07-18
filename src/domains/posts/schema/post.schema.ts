import { z } from "zod";

const PostSChema = z.object({
  title: z.string().min(1, "Post title is required"),
  body: z.string().min(1, "Post body is required"),
});

export default PostSChema;

export type PostSchemaType = z.infer<typeof PostSChema>;
