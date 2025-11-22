"use client";

import { toggleLike } from "@/actions/post.action";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ToggleLikeState } from "@/types/post.model";
import { LucideHeart } from "lucide-react";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ILikePostButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: string;
}

const LikePostButton: FC<ILikePostButtonProps> = ({
  isLiked,
  likeCount,
  postId,
}) => {
  const toggleLikeById = toggleLike.bind(null, postId);
  const initialState: ToggleLikeState = {};
  const [state, formAction, pending] = useActionState(
    toggleLikeById,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(
          isLiked ? "Post liked successfully" : "Post disliked successfully"
        );
      } else {
        toast.error(state.message);
      }
    }
  }, [state, isLiked]);

  return (
    <form action={formAction}>
      <Button
        disabled={pending}
        type="submit"
        variant="ghost"
        className="cursor-pointer"
      >
        {pending ? (
          <Spinner />
        ) : (
          <LucideHeart
            className={cn("size-4 text-muted-foreground", {
              "text-red-500 fill-red-500": isLiked,
            })}
          />
        )}
        <CardDescription
          className={cn({
            "text-red-500 ": isLiked,
          })}
        >
          {likeCount}
        </CardDescription>
      </Button>
    </form>
  );
};

export default LikePostButton;
