import { Button } from "@/components/ui/button";
import { navbarItems } from "@/lib/utils";
import Link from "next/link";

const DesktopNavbar = () => {
  return (
    <nav className="hidden md:flex items-center gap-5">
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
  );
};

export default DesktopNavbar;
