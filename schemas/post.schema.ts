import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(5, { message: "Content is too short, minimum 5 characters" })
    .max(300, { message: "Content is too long, maximum 300 characters" }),
});
