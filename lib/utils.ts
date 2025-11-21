import { clsx, type ClassValue } from "clsx";
import { LucideBell, LucideHome, LucideUser } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function navbarItems(isSignedIn: boolean = false) {
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
        href: "/profile",
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

  return image;
}

export function generateUsername(email: string) {
  return email.split("@")[0];
}
