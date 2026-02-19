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
    { href: "/services/ai-chat-assistant", label: "AI Chat Assistant Services" },
    { href: "/services/ai-workflow-automation", label: "AI Workflow Automation" },
    { href: "/services/custom-ai-solutions", label: "Custom AI Solutions" },
    { href: "/services/essential-assessment", label: "Essential Assessment" },
    { href: "/services/professional-validation", label: "Professional Validation" },
    { href: "/services/enterprise-solution", label: "Enterprise Solution" },
    { href: "/services/retainer-services", label: "Retainer Services" },
  ];

  const productLinks = [
    { href: "/biasradar", label: "BiasRadar™", description: "AI Bias Detection Tool" },
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
            onClick={() => window.scrollTo(0, 0)}
          >
            <Logo />
          </motion.div>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Products Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/products">
                  <span onClick={() => window.scrollTo(0, 0)}>Products</span>
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
                  {productLinks.map((product) => (
                    <li key={product.href}>
                      <NavigationMenuLink
                        asChild
                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                          location === product.href
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }`}
                      >
                        <Link href={product.href}>
                          <div onClick={() => window.scrollTo(0, 0)}>
                            <div className="text-sm font-medium leading-none mb-1">
                              {product.label}
                            </div>
                            {product.description && (
                              <p className="text-xs text-muted-foreground leading-snug">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/services">
                  <span onClick={() => window.scrollTo(0, 0)}>Services</span>
                </Link>
              </NavigationMenuTrigger>
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
                          <div 
                            className="text-sm font-medium leading-none"
                            onClick={() => window.scrollTo(0, 0)}
                          >
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
                  asChild
                  className={`px-4 py-2 cursor-pointer ${
                    location === link.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  <Link href={link.href}>
                    <span onClick={() => window.scrollTo(0, 0)}>
                      {link.label}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/contact">
            <Button 
              className="cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}