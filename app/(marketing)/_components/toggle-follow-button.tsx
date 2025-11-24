"use client";

import { toggleFollow } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToggleFollowState } from "@/types/user.model";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ToggleFollowButton = ({ userId }: { userId: string }) => {
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
        size="sm"
        variant="outline"
        className="cursor-pointer"
      >
        {pending ? <Spinner /> : "Follow"}
      </Button>
    </form>
  );
};

export default ToggleFollowButton;
