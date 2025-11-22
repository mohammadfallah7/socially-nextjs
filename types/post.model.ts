export type CreatePostState = {
  message?: string;
  error?: { content?: { errors: string[] } };
  payload?: { content?: string };
  success?: boolean;
};
