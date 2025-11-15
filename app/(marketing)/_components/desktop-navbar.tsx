"use client";

import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { navbarItems } from "@/lib/utils";
import Link from "next/link";

const DesktopNavbar = () => {
  const { data } = useSession();

  return (
    <nav className="hidden md:flex items-center gap-5">
      {navbarItems(!!data?.session.token).map((item) => {
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
      {data?.session.token ? (
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
