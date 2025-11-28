"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createCommentSchema, createPostSchema } from "@/schemas/post.schema";
import {
  CreateCommentState,
  CreatePostState,
  DeletePostState,
  TogglePostLikeState,
} from "@/types/post.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export async function createPost(
  _: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const validatedFields = createPostSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      error: z.treeifyError(validatedFields.error).properties,
      payload: { content: formData.get("content") as string },
      success: false,
    };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "You must be logged in to create a post",
        payload: validatedFields.data,
        success: false,
      };
    }

    await prisma.post.create({
      data: { authorId: session.user.id, ...validatedFields.data },
    });
  } catch (error) {
    return {
      message: (error as Error).message,
      payload: validatedFields.data,
      success: false,
    };
  }

  revalidatePath("/");
  return {
    message: "Post created successfully",
    success: true,
  };
}

export async function deletePost(postId: string): Promise<DeletePostState> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "You must be logged in to delete a post",
        success: false,
      };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });
    if (!post) {
      return {
        message: "Post not found",
        success: false,
      };
    }

    if (post.authorId !== session.user.id) {
      return {
        message: "You must be the author of the post to delete it",
        success: false,
      };
    }

    await prisma.post.delete({ where: { id: postId } });
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
    };
  }

  revalidatePath("/");
  return {
    message: "Post deleted successfully",
    success: true,
  };
}

export async function toggleLike(postId: string): Promise<TogglePostLikeState> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "You must be logged in to like or dislike a post",
        success: false,
      };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });
    if (!post) {
      return {
        message: "Post not found",
        success: false,
      };
    }

    if (session.user.id === post.authorId) {
      return {
        message: "You can't like or dislike your post",
        success: false,
      };
    }

    const like = await prisma.like.findUnique({
      where: { userId_postId: { postId: post.id, userId: session.user.id } },
    });

    if (like) {
      await prisma.like.delete({
        where: { userId_postId: { postId: post.id, userId: session.user.id } },
      });
    } else {
      await prisma.$transaction([
        prisma.like.create({
          data: { postId: post.id, userId: session.user.id },
        }),
        prisma.notification.create({
          data: {
            type: "LIKE",
            creatorId: session.user.id,
            userId: post.authorId,
            postId: post.id,
          },
        }),
      ]);
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
    };
  }

  revalidatePath("/");
  return {
    message: "Post like toggled successfully",
    success: true,
  };
}

export async function createComment(
  postId: string,
  _: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> {
  const validatedFields = createCommentSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      error: z.treeifyError(validatedFields.error).properties,
      payload: { content: formData.get("content") as string },
      success: false,
    };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "You must be logged in to create a comment",
        payload: validatedFields.data,
        success: false,
      };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });
    if (!post) {
      return {
        message: "Post not found",
        payload: validatedFields.data,
        success: false,
      };
    }

    if (session.user.id === post.authorId) {
      await prisma.comment.create({
        data: {
          authorId: session.user.id,
          postId: post.id,
          ...validatedFields.data,
        },
      });
    } else {
      prisma.$transaction(async (tx) => {
        const comment = await tx.comment.create({
          data: {
            authorId: session.user.id,
            postId: post.id,
            ...validatedFields.data,
          },
        });
        await tx.notification.create({
          data: {
            type: "COMMENT",
            commentId: comment.id,
            creatorId: session.user.id,
            userId: post.authorId,
            postId: post.id,
          },
        });
      });
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      payload: validatedFields.data,
    };
  }

  revalidatePath("/");
  return {
    message: "Comment created successfully",
    success: true,
  };
}
