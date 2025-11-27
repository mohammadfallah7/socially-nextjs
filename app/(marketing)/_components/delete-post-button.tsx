"use client";

import { deletePost } from "@/actions/post.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DeletePostState } from "@/types/post.model";
import { LucideTrash2 } from "lucide-react";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface IDeletePostButtonProps {
  postId: string;
}

const DeletePostButton: FC<IDeletePostButtonProps> = ({ postId }) => {
  const deletePostById = deletePost.bind(null, postId);
  const initialState: DeletePostState = {};
  const [state, formAction, pending] = useActionState(
    deletePostById,
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
        size="icon"
        variant="ghost"
        className="cursor-pointer"
      >
        {pending ? <Spinner /> : <LucideTrash2 className="size-4" />}
      </Button>
    </form>
  );
};

export default DeletePostButton;
