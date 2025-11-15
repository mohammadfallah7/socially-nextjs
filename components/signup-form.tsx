"use client";

import { SignUpState, signUpWithEmail } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import InputError from "./input-error";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialState: SignUpState = {};
  const [state, formAction] = useActionState(signUpWithEmail, initialState);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  defaultValue={state.payload?.name}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
                {state.error?.name && (
                  <InputError errors={state.error.name.errors} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  defaultValue={state.payload?.email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {state.error?.email && (
                  <InputError errors={state.error.email.errors} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  defaultValue={state.payload?.password}
                  id="password"
                  name="password"
                  type="password"
                />
                {state.error?.password && (
                  <InputError errors={state.error.password.errors} />
                )}
              </Field>

              <Field>
                <Button className="cursor-pointer" type="submit">
                  Create Account
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">{/* Image */}</div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a>Terms of Service</a> and{" "}
        <a>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
