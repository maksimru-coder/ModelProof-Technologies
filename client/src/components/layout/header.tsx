import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/methodology", label: "Methodology" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mr-6 flex items-center space-x-2 cursor-pointer"
          >
            <Logo />
          </motion.div>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                  }}
                  className={`px-4 py-2 cursor-pointer ${
                    location === link.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/contact">
            <Button className="cursor-pointer">Contact Us</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}