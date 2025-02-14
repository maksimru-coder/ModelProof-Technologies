import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Shield, Network, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Essential Assessment",
    description: "Quickly understand your AI's strengths and weaknesses.",
    subtext: "We identify risks and opportunities, setting you up for AI success.",
    icon: Search,
  },
  {
    title: "Professional Validation",
    description: "Deploy AI with confidence.",
    subtext: "Our rigorous testing ensures performance, reliability, and compliance.",
    icon: Shield,
  },
  {
    title: "Enterprise Solution",
    description: "Scale your AI initiatives securely.",
    subtext: "We provide continuous quality assurance and expert support.",
    icon: Network,
  },
  {
    title: "Retainer Services",
    description: "Focus on innovation, not quality concerns.",
    subtext: "We proactively monitor and optimize your AI systems.",
    icon: Clock,
  }
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
    className="text-primary/90 bg-primary/5 p-4 rounded-lg shadow-sm"
  >
    {children}
  </motion.div>
);

export function ServicesOverview() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            We offer comprehensive, tailored AI validation solutions to ensure the quality, reliability, and ethical compliance of your AI systems.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardHeader className="space-y-6">
                  <IconWrapper>
                    <service.icon className="h-12 w-12 stroke-[1.5]" />
                  </IconWrapper>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    <p className="font-medium text-foreground/90 mb-3">
                      {service.description}
                    </p>
                    <p className="text-muted-foreground">
                      {service.subtext}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-6">
                  <Link href="/services">
                    <Button
                      onClick={() => window.scrollTo(0, 0)}
                      className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}