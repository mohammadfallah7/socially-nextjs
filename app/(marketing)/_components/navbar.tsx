import Container from "@/components/container";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  return (
    <header className="sticky top-0 border-b py-5 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-mono font-bold">
            Socially
          </Link>
          <div className="flex items-center gap-5">
            <ModeToggle />
            <MobileNavbar />
            <DesktopNavbar />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
