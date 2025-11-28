import { getPosts } from "@/data/post.data";

export type CreatePostState = {
  message?: string;
  error?: { content?: { errors: string[] } };
  payload?: { content: string };
  success?: boolean;
};

export type CreateCommentState = {
  message?: string;
  error?: { content?: { errors: string[] } };
  payload?: { content: string };
  success?: boolean;
};

export type DeletePostState = {
  message?: string;
  success?: boolean;
};

export type TogglePostLikeState = {
  message?: string;
  success?: boolean;
};

export type PostModel = Awaited<ReturnType<typeof getPosts>>[number];
