import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { FiMenu } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center w-[95%] max-w-4xl md:w-auto p-2 px-3 py-2 shadow-md rounded-2xl border bg-accent/20 md:bg-accent/70 backdrop-blur-lg">
      {/* Mobile: hamburger left + auth button right */}
      <div className="flex w-full items-center justify-between md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <FiMenu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/ms.png"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
                <SheetTitle>Mind Sink</SheetTitle>
              </div>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              <SheetClose asChild>
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/manifesto"
                  className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Manifesto
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href="#contact"
                  className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Contact
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        <Link to={isLoggedIn ? "/dashboard" : "/login"}>
          <Button className="rounded-lg px-3" variant="default">
            {isLoggedIn ? "Open Dashboard" : "Login"}
          </Button>
        </Link>
      </div>

      {/* Desktop: logo + inline nav */}
      <div className="hidden md:flex items-center w-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center mr-2">
          <img src="/ms.png" alt="Logo" className="h-8 w-8 rounded-full" />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="flex justify-between items-center w-full">
          <NavigationMenuList className="flex items-center space-x-2">
            <NavigationMenuItem asChild>
              <Link
                to="/"
                className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg px-2 py-1"
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <Link
                to="/manifesto"
                className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg px-2 py-1"
              >
                Manifesto
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <a
                href="#contact"
                className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg px-2 py-1"
              >
                Contact
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              >
                <Button className="rounded-lg px-2" variant="default">
                  {isLoggedIn ? "Open Dashboard" : "Login"}
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </div>
  );
}
