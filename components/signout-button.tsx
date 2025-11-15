import React from "react";
import { Button } from "./ui/button";
import { LucideLogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignoutButton = () => {
  const router = useRouter();

  const handleSignout = async () => {
    const { data, error } = await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });

    if (data?.success) {
      toast.success("Signout successfully!");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleSignout}
      className="cursor-pointer"
      size="icon"
      variant="ghost"
    >
      <LucideLogOut />
    </Button>
  );
};

export default SignoutButton;
