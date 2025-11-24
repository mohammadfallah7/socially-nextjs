import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecommendedUsers } from "@/data/user.data";
import { generateUserImage } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import ToggleFollowButton from "./toggle-follow-button";

interface IRecommendedUsersProps {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

const RecommendedUsers: FC<IRecommendedUsersProps> = async ({ user }) => {
  const recommendedUsers = await getRecommendedUsers(user.id);

  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedUsers.map((recommendedUser) => {
            return (
              <div
                key={recommendedUser.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={generateUserImage(recommendedUser.image)}
                    alt={recommendedUser.name}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-sm line-clamp-1">
                      {recommendedUser.name}
                    </h2>
                    <CardDescription className="text-xs">
                      {recommendedUser._count.followers} followers
                    </CardDescription>
                  </div>
                </div>
                <ToggleFollowButton userId={recommendedUser.id} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendedUsers;
