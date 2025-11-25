"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MarkNotificationsAsReadState } from "@/types/notification.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function markNotificationsAsRead(
  notificationIds: string[]
): Promise<MarkNotificationsAsReadState> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        message: "Unauthorized",
        success: false,
      };
    }

    await prisma.notification.updateMany({
      where: { id: { in: notificationIds } },
      data: { read: true },
    });
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
    };
  }

  revalidatePath("/notifications");
  return {
    message: "Notifications marked as read successfully!",
    success: true,
  };
}
