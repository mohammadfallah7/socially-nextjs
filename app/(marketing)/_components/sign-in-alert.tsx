import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInAlert = () => {
  return (
    <div className="bg-primary text-primary-foreground px-3 flex justify-between items-center gap-3 py-2 rounded-md">
      <div>
        <h2 className="text-lg font-medium tracking-tighter">
          You are signed out
        </h2>
        <p className="text-sm tracking-tight">Sign in to leave a comment</p>
      </div>
      <Button variant="secondary" asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
};

export default SignInAlert;
