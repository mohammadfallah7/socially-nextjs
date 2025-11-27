"use client";

import { createPost } from "@/actions/post.action";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { generateUserImage } from "@/lib/utils";
import { CreatePostState } from "@/types/post.model";
import { LucideSend } from "lucide-react";
import Image from "next/image";
import { FC, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ICreatePostFormProps {
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

const CreatePostForm: FC<ICreatePostFormProps> = ({ user }) => {
  const initialState: CreatePostState = {};
  const [state, formAction, pending] = useActionState(createPost, initialState);

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
    <Card>
      <CardContent>
        <form action={formAction} className="space-y-3">
          <div className="flex gap-3 items-start">
            <Image
              src={generateUserImage(user.image)}
              alt={user.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <Textarea
              defaultValue={state.payload?.content}
              name="content"
              placeholder="Whats on your mind?"
              className="resize-none p-0 focus-visible:ring-0 bg-transparent dark:bg-transparent shadow-none border-0"
            />
          </div>
          {state.error?.content && (
            <InputError errors={state.error.content.errors} />
          )}
          <Separator />
          <div className="flex justify-end">
            <Button
              disabled={pending}
              type="submit"
              size="sm"
              className="cursor-pointer"
            >
              {pending ? <Spinner /> : <LucideSend className="size-4" />}
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
