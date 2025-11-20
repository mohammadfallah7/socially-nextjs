import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/lib/auth";
import { navbarItems } from "@/lib/utils";
import { LucideMenu } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const MobileNavbar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="icon">
          <LucideMenu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="grid gap-5 px-5">
          {navbarItems(!!session).map((item) => {
            const Icon = item.icon;

            return (
              <Button key={item.id} variant="ghost" asChild>
                <Link href={item.href}>
                  <Icon />
                  {item.label}
                </Link>
              </Button>
            );
          })}
          {session ? (
            <SignoutButton />
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
