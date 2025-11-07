import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 border-b py-5 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-mono font-bold">
            Socially
          </Link>
          <div className="">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
