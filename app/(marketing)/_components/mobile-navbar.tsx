import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarItems } from "@/lib/utils";
import { LucideMenu } from "lucide-react";
import Link from "next/link";

const MobileNavbar = () => {
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
          {navbarItems().map((item) => {
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
          <Button asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
