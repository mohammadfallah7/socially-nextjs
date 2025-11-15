"use server";

import { auth } from "@/lib/auth";
import { signUpSchema } from "@/schemas/auth.schema";
import { redirect } from "next/navigation";
import { z } from "zod";

export type SignUpState = {
  message?: string;
  error?: {
    name?: { errors: string[] };
    email?: { errors: string[] };
    password?: { errors: string[] };
  };
  payload?: { name?: string; email?: string; password?: string };
  success?: boolean;
};

export async function signUpWithEmail(
  _: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      error: z.treeifyError(validatedFields.error).properties,
      payload: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      success: false,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: { ...validatedFields.data, callbackURL: "/" },
    });
  } catch (error) {
    return { message: (error as Error).message, success: false };
  }

  redirect("/");
}
