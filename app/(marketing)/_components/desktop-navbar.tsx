import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { navbarItems } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";

const DesktopNavbar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <nav className="hidden md:flex items-center gap-5">
      {navbarItems(!!session, session?.user.email).map((item) => {
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
  );
};

export default DesktopNavbar;
