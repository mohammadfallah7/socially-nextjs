export type CreateCommentState = {
  message?: string;
  error?: { content?: { errors: string[] } };
  payload?: { content?: string };
  success?: boolean;
};
