import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const Sidebar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <aside>
      {session ? <AuthenticatedSidebar /> : <NotAuthenticatedSidebar />}
    </aside>
  );
};

const AuthenticatedSidebar = () => {
  return <Card></Card>;
};

const NotAuthenticatedSidebar = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to access your profile and connect with others.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button variant="outline" asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
