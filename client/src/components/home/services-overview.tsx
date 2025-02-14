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
    headline: "Foundation for AI Excellence",
    description: "Comprehensive analysis of your AI system's architecture, quality, and compliance readiness to establish a clear path forward.",
    icon: Search,
    path: "/services/essential-assessment"
  },
  {
    title: "Professional Validation",
    headline: "Ensure AI Reliability",
    description: "In-depth validation of your AI system's performance, accuracy, and compliance through our proven testing framework.",
    icon: Shield,
    path: "/services/professional-validation"
  },
  {
    title: "Enterprise Solution",
    headline: "End-to-End AI Quality",
    description: "Complete AI validation suite for complex implementations, featuring custom frameworks and continuous monitoring.",
    icon: Network,
    path: "/services/enterprise-solution"
  },
  {
    title: "Retainer Services",
    headline: "Ongoing Excellence",
    description: "Continuous quality assurance and optimization to ensure your AI systems maintain peak performance and compliance.",
    icon: Clock,
    path: "/services/retainer-services"
  }
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
    className="relative"
  >
    <div className="w-16 h-16 flex items-center justify-center">
      {children}
    </div>
  </motion.div>
);

export function ServicesOverview() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Elevating AI systems through expert validation, ensuring quality, reliability, and ethical excellence.
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
                    <service.icon 
                      className="h-12 w-12 stroke-[1.5] text-primary" 
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                      }}
                    />
                  </IconWrapper>
                  <div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-lg font-medium text-primary/80">{service.headline}</p>
                  </div>
                  <CardDescription className="text-sm">
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-6">
                  <Link href={service.path}>
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