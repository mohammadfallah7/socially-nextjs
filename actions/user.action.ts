"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { EditProfileState, ToggleFollowState } from "@/types/user.model";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { headers } from "next/headers";
import { editProfileSchema } from "@/schemas/user.schema";

export async function toggleFollow(userId: string): Promise<ToggleFollowState> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "You must be logged in to toggle follow",
        success: false,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }

    if (user.id === session.user.id) {
      return {
        message: "You can't follow or unfollow yourself",
        success: false,
      };
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: user.id,
        },
      },
    });

    if (follow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: user.id,
          },
        },
      });
    } else {
      await prisma.$transaction([
        prisma.follow.create({
          data: { followerId: session.user.id, followingId: user.id },
        }),
        prisma.notification.create({
          data: { type: "FOLLOW", creatorId: session.user.id, userId: user.id },
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
    message: "Follow toggled successfully",
    success: true,
  };
}

export async function editProfile(
  userId: string,
  _: EditProfileState,
  formData: FormData
): Promise<EditProfileState> {
  const validatedFields = editProfileSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      error: z.treeifyError(validatedFields.error).properties,
      payload: {
        name: formData.get("name") as string,
        location: formData.get("location") as string,
        bio: formData.get("bio") as string,
        website: formData.get("website") as string,
      },
      success: false,
    };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "Unauthorized",
        success: false,
      };
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }

    if (user.id !== session.user.id) {
      return {
        message: "Unauthorized",
        success: false,
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { ...validatedFields.data },
    });
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
    };
  }

  revalidatePath("/");
  return {
    message: "Profile updated successfully",
    success: true,
  };
}
