"use client";

import { createComment } from "@/actions/post.action";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { generateUserImage } from "@/lib/utils";
import { CreateCommentState } from "@/types/post.model";
import { LucideSend } from "lucide-react";
import Image from "next/image";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ICreateCommentFormProps {
  postId: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

const CreateCommentForm: FC<ICreateCommentFormProps> = ({ postId, user }) => {
  const createCommentById = createComment.bind(null, postId);
  const initialState: CreateCommentState = {};
  const [state, formAction, pending] = useActionState(
    createCommentById,
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
    <div className="flex items-start gap-3">
      <Image
        src={generateUserImage(user.image)}
        alt={user.name}
        width={30}
        height={30}
        className="rounded-full"
      />
      <form action={formAction} className="flex flex-col gap-3 flex-1">
        <Textarea
          defaultValue={state.payload?.content}
          name="content"
          placeholder="Write a comment..."
          className="resize-none"
        />
        {state.error?.content && (
          <InputError errors={state.error.content.errors} />
        )}
        <Button
          disabled={pending}
          type="submit"
          size="sm"
          className="cursor-pointer self-end"
        >
          {pending ? <Spinner /> : <LucideSend className="size-4" />}
          Comment
        </Button>
      </form>
    </div>
  );
};

export default CreateCommentForm;
