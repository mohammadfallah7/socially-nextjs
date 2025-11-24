"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/schemas/comment.schema";
import { CreateCommentState } from "@/types/comment.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

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
  const { content } = validatedFields.data;

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "Unauthorized",
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

    if (post.authorId === session.user.id) {
      await prisma.comment.create({
        data: { authorId: session.user.id, content, postId: post.id },
      });
    } else {
      prisma.$transaction(async (tx) => {
        const comment = await tx.comment.create({
          data: { authorId: session.user.id, content, postId: post.id },
        });
        await tx.notification.create({
          data: {
            type: "COMMENT",
            creatorId: session.user.id,
            userId: post.authorId,
            commentId: comment.id,
          },
        });
      });
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      payload: validatedFields.data,
      success: false,
    };
  }

  revalidatePath("/");
  return { message: "Post create successfully", success: true };
}
