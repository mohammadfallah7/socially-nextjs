import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn, generateUserImage, generateUsername } from "@/lib/utils";
import { PostModel } from "@/types/post.model";
import { formatDistanceToNow } from "date-fns";
import { LucideHeart, LucideMessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import DeletePostButton from "./delete-post-button";

interface IPostCardProps {
  post: PostModel;
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

const PostCard: FC<IPostCardProps> = ({ post, user }) => {
  const isLiked = post.likes.some((like) => like.userId === user?.id);
  const isUserPost = post.author.id === user?.id;

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${generateUsername(post.author.email)}`}
            className="flex gap-3 items-start lg:items-center"
          >
            <Image
              src={generateUserImage(post.author.image)}
              alt={post.author.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="flex lg:flex-row flex-col gap-0.5 lg:gap-3">
              <CardTitle>{post.author.name}</CardTitle>
              <CardDescription>
                @{generateUsername(post.author.email)}
              </CardDescription>
            </div>
            <CardDescription>
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </CardDescription>
          </Link>
          {isUserPost && <DeletePostButton postId={post.id} />}
        </div>

        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-6">
        <Button variant="ghost">
          <LucideHeart
            className={cn("size-4 text-muted-foreground", {
              "text-red-500 fill-red-500": isLiked,
            })}
          />
          <CardDescription
            className={cn({
              "text-red-500 ": isLiked,
            })}
          >
            {post._count.likes}
          </CardDescription>
        </Button>
        <Button variant="ghost">
          <LucideMessageCircle className="size-4 text-muted-foreground" />
          <CardDescription>{post._count.comments}</CardDescription>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
