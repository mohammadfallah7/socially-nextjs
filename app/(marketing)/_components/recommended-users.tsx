import ToggleFollowButton from "@/components/toggle-follow-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecommendedUsers } from "@/data/user.data";
import { generateUserImage, generateUsername } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const RecommendedUsers = async ({
  user,
}: {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}) => {
  const recommendedUsers = await getRecommendedUsers(user.id);
  if (recommendedUsers.length === 0) return null;

  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedUsers.map((recommendedUser) => (
            <div
              key={recommendedUser.id}
              className="flex items-center justify-between gap-3"
            >
              <Link
                href={`/profile/${generateUsername(recommendedUser.email)}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={generateUserImage(recommendedUser.image)}
                  alt={recommendedUser.name}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <div>
                  <h3>{recommendedUser.name}</h3>
                  <CardDescription>
                    {recommendedUser._count.followers} followers
                  </CardDescription>
                </div>
              </Link>
              <ToggleFollowButton userId={recommendedUser.id}>
                Follow
              </ToggleFollowButton>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendedUsers;
