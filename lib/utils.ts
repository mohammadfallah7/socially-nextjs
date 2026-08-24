import { NotificationType } from "@/app/generated/prisma/enums";
import { clsx, type ClassValue } from "clsx";
import {
  LucideBell,
  LucideHeart,
  LucideHome,
  LucideMessageCircle,
  LucideUser,
  LucideUserPlus2,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function navbarItems(isSignedIn: boolean = false, email?: string) {
  if (isSignedIn) {
    return [
      {
        id: 1,
        label: "Home",
        href: "/",
        icon: LucideHome,
      },
      {
        id: 2,
        label: "Notifications",
        href: "/notifications",
        icon: LucideBell,
      },
      {
        id: 3,
        label: "Profile",
        href: email ? `/profile/${generateUsername(email)}` : "/profile",
        icon: LucideUser,
      },
    ];
  } else {
    return [
      {
        id: 1,
        label: "Home",
        href: "/",
        icon: LucideHome,
      },
    ];
  }
}

export function generateUserImage(image?: string | null) {
  if (!image) return "/avatar-placeholder.png";

  return `https://79gcelddzk.ucarecd.net/${image}/`;
}

export function generateUsername(email: string) {
  return email.split("@")[0];
}

export function getNotificationInfo(type: NotificationType) {
  switch (type) {
    case "LIKE":
      return {
        Icon: LucideHeart,
        color: "text-red-500",
        description: "liked your post",
      };
    case "COMMENT":
      return {
        Icon: LucideMessageCircle,
        color: "text-blue-500",
        description: "commented on your post",
      };
    case "FOLLOW":
      return {
        Icon: LucideUserPlus2,
        color: "text-green-500",
        description: "started following you",
      };
  }
}
