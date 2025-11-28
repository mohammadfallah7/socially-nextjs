"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ToggleFollowState } from "@/types/user.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
