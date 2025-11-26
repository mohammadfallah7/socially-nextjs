import { getUserByEmail } from "@/data/user.data";

export type ToggleFollowState = {
  message?: string;
  success?: boolean;
};

export type UserProfileModel = Awaited<ReturnType<typeof getUserByEmail>>;

export type EditProfileState = {
  message?: string;
  error?: {
    name?: { errors: string[] };
    location?: { errors: string[] };
    bio?: { errors: string[] };
    website?: { errors: string[] };
  };
  payload?: {
    name?: string;
    location?: string;
    bio?: string;
    website?: string;
  };
  success?: boolean;
};
