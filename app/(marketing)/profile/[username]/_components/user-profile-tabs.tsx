import PostCard from "@/app/(marketing)/_components/post-card";
import Alert from "@/components/alert";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLikesByUserId } from "@/data/like.data";
import { getPostsByUserId } from "@/data/post.data";
import { FC } from "react";

interface IUserProfileTabsProps {
  userId: string;
  sessionUser?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

const UserProfileTabs: FC<IUserProfileTabsProps> = async ({
  userId,
  sessionUser,
}) => {
  const [posts, likes] = await Promise.all([
    getPostsByUserId(userId),
    getLikesByUserId(userId),
  ]);

  return (
    <Tabs defaultValue="posts" className="space-y-3">
      <TabsList className="w-full">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="space-y-4">
        {posts.length === 0 ? (
          <Alert
            title="There is no post"
            description="This user not posted anything"
          />
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} user={sessionUser} />
          ))
        )}
      </TabsContent>
      <TabsContent value="likes" className="space-y-4">
        {likes.length === 0 ? (
          <Alert
            title="There is no like"
            description="This user not likes any post"
          />
        ) : (
          likes.map((like) => (
            <PostCard key={like.id} post={like.post} user={sessionUser} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserProfileTabs;
