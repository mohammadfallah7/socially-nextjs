import { getUserNotifications } from "@/data/notification.data";

export type NotificationModel = Awaited<
  ReturnType<typeof getUserNotifications>
>[number];
