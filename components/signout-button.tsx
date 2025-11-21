"use client";

import { LucideLogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signout, SignOutState } from "@/actions/auth.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const SignoutButton = () => {
  const initialState: SignOutState = {};
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
