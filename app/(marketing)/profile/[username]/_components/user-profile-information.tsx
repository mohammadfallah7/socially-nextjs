import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateUserImage, generateUsername } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";
import EditProfileDialog from "./edit-profile-dialog";
import ToggleFollowButton from "@/app/(marketing)/_components/toggle-follow-button";
import { LucideCalendar, LucideLink, LucideMapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { UserProfileModel } from "@/types/user.model";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IUserProfileInformationProps {
  user: UserProfileModel;
  alreadyFollowing: boolean;
  isYourProfile: boolean;
  isLoggedIn: boolean;
}

const UserProfileInformation: FC<IUserProfileInformationProps> = ({
  alreadyFollowing,
  isYourProfile,
  user,
  isLoggedIn,
}) => {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <Image
            src={generateUserImage(user!.image)}
            alt={user!.name}
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="flex flex-col items-center gap-0.5 text-center">
            <CardTitle className="text-lg">{user!.name}</CardTitle>
            <CardDescription>{generateUsername(user!.email)}</CardDescription>
          </div>
          {user!.bio && (
            <CardDescription className="text-center">
              {user!.bio}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-semibold">{user!._count.followings}</h3>
            <CardDescription>Followings</CardDescription>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-semibold">{user!._count.followers}</h3>
            <CardDescription>Followers</CardDescription>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-semibold">{user!._count.posts}</h3>
            <CardDescription>Posts</CardDescription>
          </div>
        </div>
        {!isLoggedIn ? (
          <Button asChild>
            <Link href="/sign-in" className="w-full">
              Follow
            </Link>
          </Button>
        ) : isYourProfile ? (
          <EditProfileDialog user={user} />
        ) : (
          <ToggleFollowButton
            userId={user!.id}
            alreadyFollowing={alreadyFollowing}
            variant="default"
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <LucideMapPin className="size-4 text-muted-foreground" />
          <CardDescription>
            {user!.location ? user!.location : "No location"}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <LucideLink className="size-4 text-muted-foreground" />
          <CardDescription>
            {user!.website ? user!.website : "No website"}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <LucideCalendar className="size-4 text-muted-foreground" />
          <CardDescription>
            {formatDistanceToNow(user!.createdAt, { addSuffix: true })}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfileInformation;
