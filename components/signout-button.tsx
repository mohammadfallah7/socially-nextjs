"use client";

import { LucideLogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signout, SignoutState } from "@/actions/auth.action";
import { useActionState, useEffect } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

const SignoutButton = () => {
  const initialState: SignoutState = {};
  const [state, formAction, pending] = useActionState(signout, initialState);

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
    <form action={formAction} className="flex justify-center">
      <Button
        disabled={pending}
        className="cursor-pointer"
        size="icon"
        variant="ghost"
      >
        {pending ? <Spinner /> : <LucideLogOut />}
      </Button>
    </form>
  );
};

export default SignoutButton;
