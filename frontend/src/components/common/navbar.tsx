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

export default function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 shadow-md rounded-2xl z-50 flex items-center border bg-background/50 backdrop-blur-3xl">
      {/* Logo Section */}
      <div className="flex justify-items-center mr-2">
        <img src="/ms.png" alt="Logo" className="h-8 w-8 rounded-full" />
      </div>

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
            <Link
              to="/contact"
              className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg px-2 py-1"
            >
              Contact
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
            >
              <Button className="rounded-lg px-2" variant="default">
                {isLoggedIn ? "Open Dashboard" : "Login"}{" "}
      
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
}
