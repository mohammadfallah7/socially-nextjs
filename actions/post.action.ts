"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/schemas/post.schema";
import { CreatePostState } from "@/types/post.model";
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

    await prisma.post.create({
      data: { authorId: session.user.id, content },
    });
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
