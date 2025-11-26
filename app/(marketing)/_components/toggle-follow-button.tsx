"use client";

import { toggleFollow } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToggleFollowState } from "@/types/user.model";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface IToggleFollowButtonProps {
  userId: string;
  alreadyFollowing?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const ToggleFollowButton: FC<IToggleFollowButtonProps> = ({
  userId,
  alreadyFollowing,
  variant = "outline",
}) => {
  const toggleFollowById = toggleFollow.bind(null, userId);
  const initialState: ToggleFollowState = {};
  const [state, formAction, pending] = useActionState(
    toggleFollowById,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        if (alreadyFollowing) {
          toast.success("Follow user successfully");
        } else {
          toast.success("Unfollow user successfully");
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, alreadyFollowing]);

  return (
    <form action={formAction}>
      <Button
        disabled={pending}
        size="sm"
        variant={variant}
        className="cursor-pointer w-full"
      >
        {pending ? <Spinner /> : alreadyFollowing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
};

export default ToggleFollowButton;
