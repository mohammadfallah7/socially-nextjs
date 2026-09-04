"use client";

import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PostModel } from "@/types/post.model";
import { LucideHeart, LucideMessageCircle } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import Author from "./author";
import CreateCommentForm from "./create-comment-form";
import DeletePostButton from "./delete-post-button";
import LikePostButton from "./like-post-button";
import Image from "next/image";

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
  const isUserPost = post.authorId === user?.id;
  const isLiked = post.likes.some((like) => like.userId === user?.id);

  const [isCommenting, setIsCommenting] = useState(false);

  return (
    <Card>
      <CardContent className="space-y-3">
        <Author createdAt={post.createdAt} author={post.author}>
          {isUserPost && <DeletePostButton postId={post.id} />}
        </Author>
        <p className="text-sm wrap-break-word whitespace-pre-wrap">
          {post.content}
        </p>
        {post.image && (
          <div className="relative aspect-square overflow-hidden rounded-xl h-80">
            <Image
              src={`${process.env.NEXT_PUBLIC_UPLOADCARE_CDN_CNAME}/${post.image}/`}
              alt={post.content}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-6">
          {user ? (
            <LikePostButton
              isLiked={isLiked}
              likesCount={post._count.likes}
              postId={post.id}
            />
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/sign-in">
                <LucideHeart className="size-4 text-muted-foreground" />
                <CardDescription>{post._count.likes}</CardDescription>
              </Link>
            </Button>
          )}
          <Button
            onClick={() => setIsCommenting(!isCommenting)}
            variant="ghost"
            className="cursor-pointer"
          >
            <LucideMessageCircle
              className={cn("size-4 text-muted-foreground", {
                "text-blue-500 fill-blue-500": isCommenting,
              })}
            />
            <CardDescription
              className={cn({
                "text-blue-500 ": isCommenting,
              })}
            >
              {post._count.comments}
            </CardDescription>
          </Button>
        </div>
        {isCommenting && (
          <div className="flex flex-col gap-8 w-full">
            <Separator />
            {post.comments.length > 0 && (
              <ul className="space-y-6">
                {post.comments.map((comment) => (
                  <li key={comment.id} className="space-y-3">
                    <Author
                      createdAt={comment.createdAt}
                      author={comment.author}
                    />
                    <p className="text-sm">{comment.content}</p>
                  </li>
                ))}
              </ul>
            )}
            {user ? (
              <CreateCommentForm postId={post.id} user={user} />
            ) : (
              <Alert
                title="You are signed out"
                description="Sign in to write a comment"
              >
                <Button variant="secondary" asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </Alert>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
