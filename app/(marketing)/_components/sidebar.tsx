import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/data/user.data";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateUserImage, generateUsername } from "@/lib/utils";
import { LucideLink, LucideMapPin } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Sidebar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <aside>
      {session ? (
        <AuthenticatedSidebar userId={session.user.id} />
      ) : (
        <NotAuthenticatedSidebar />
      )}
    </aside>
  );
};

const AuthenticatedSidebar = async ({ userId }: { userId: string }) => {
  const user = await getUserById(userId);

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <Image
            src={generateUserImage(user.image)}
            alt={user.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col items-center gap-0.5 text-center">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <CardDescription>{generateUsername(user.email)}</CardDescription>
          </div>
          {user.bio && (
            <CardDescription className="text-center">
              {user.bio}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Separator />
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-semibold">{user._count.followings}</h3>
            <CardDescription>Followings</CardDescription>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-semibold">{user._count.followers}</h3>
            <CardDescription>Followers</CardDescription>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <LucideMapPin className="size-4 text-muted-foreground" />
          <CardDescription>
            {user.location ? user.location : "No location"}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <LucideLink className="size-4 text-muted-foreground" />
          <CardDescription>
            {user.website ? user.website : "No website"}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
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
