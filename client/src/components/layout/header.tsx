import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const [location] = useLocation();

  const serviceLinks = [
    { href: "/services/essential-assessment", label: "Essential Assessment" },
    { href: "/services/professional-validation", label: "Professional Validation" },
    { href: "/services/enterprise-solution", label: "Enterprise Solution" },
    { href: "/services/retainer-services", label: "Retainer Services" },
  ];

  const links = [
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
            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {serviceLinks.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink
                        asChild
                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                          location === service.href
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }`}
                      >
                        <Link href={service.href}>
                          <div className="text-sm font-medium leading-none">
                            {service.label}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other Navigation Links */}
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