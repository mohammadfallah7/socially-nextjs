"use client";

import { toggleFollow } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { ToggleFollowState } from "@/types/user.model";
import { FC, HTMLAttributes, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface IToggleFollowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  userId: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?:
    | "default"
    | "sm"
    | "lg"
    | "icon"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
}

const ToggleFollowButton: FC<IToggleFollowButtonProps> = ({
  userId,
  variant = "outline",
  size = "sm",
  children,
  className,
  ...props
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
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        disabled={pending}
        type="submit"
        variant={variant}
        size={size}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {pending ? <Spinner /> : children}
      </Button>
    </form>
  );
};

export default ToggleFollowButton;
