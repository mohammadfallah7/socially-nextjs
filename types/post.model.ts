import { getPosts } from "@/data/post.data";

export type CreatePostState = {
  message?: string;
  error?: { content?: { errors: string[] } };
  payload?: { content: string };
  success?: boolean;
};

export type PostModel = Awaited<ReturnType<typeof getPosts>>[number];
