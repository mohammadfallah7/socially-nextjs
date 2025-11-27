"use client";

import { toggleLike } from "@/actions/post.action";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TogglePostLikeState } from "@/types/post.model";
import { LucideHeart } from "lucide-react";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ILikePostButtonProps {
  isLiked: boolean;
  likesCount: number;
  postId: string;
}

const LikePostButton: FC<ILikePostButtonProps> = ({
  isLiked,
  likesCount,
  postId,
}) => {
  const toggleLikeById = toggleLike.bind(null, postId);
  const initialState: TogglePostLikeState = {};
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
              "fill-red-500 text-red-500": isLiked,
            })}
          />
        )}
        <CardDescription className={cn({ "text-red-500": isLiked })}>
          {likesCount}
        </CardDescription>
      </Button>
    </form>
  );
};

export default LikePostButton;
