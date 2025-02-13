import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, LineChart, Network, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Essential Assessment",
    description:
      "Comprehensive evaluation of your AI system's foundation, establishing quality baselines and identifying key optimization opportunities.",
    icon: Shield,
    benefits: [
      "Thorough system architecture analysis",
      "Quality baseline establishment",
      "Risk evaluation framework",
      "Initial compliance assessment"
    ]
  },
  {
    title: "Professional Validation",
    description:
      "Advanced validation suite delivering in-depth analysis of your AI system's performance, reliability, and compliance measures.",
    icon: LineChart,
    benefits: [
      "Comprehensive performance testing",
      "Detailed quality metrics",
      "Custom validation frameworks",
      "Compliance documentation"
    ]
  },
  {
    title: "Enterprise Solution",
    description: "End-to-end strategic partnership for complex AI implementations requiring continuous quality assurance and optimization.",
    icon: Network,
    benefits: [
      "Custom testing frameworks",
      "Continuous monitoring",
      "Strategic optimization",
      "Full compliance management"
    ]
  },
  {
    title: "Retainer Services",
    description: "Ongoing strategic partnership ensuring continuous quality improvement and validation of your AI systems.",
    icon: Clock,
    benefits: [
      "Regular quality assessments",
      "Proactive optimization",
      "Continuous compliance monitoring",
      "Priority support access"
    ]
  },
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
    className="text-primary"
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
            Comprehensive AI validation services tailored to your needs
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
                <CardHeader className="space-y-4">
                  <IconWrapper>
                    <service.icon className="h-12 w-12" />
                  </IconWrapper>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm min-h-[60px]">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="mt-4 space-y-3 flex-grow mb-6">
                    {service.benefits.map((benefit) => (
                      <motion.li
                        key={benefit}
                        className="flex items-start text-sm text-muted-foreground"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/services" className="mt-auto">
                    <Button
                      onClick={() => window.scrollTo(0, 0)}
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all duration-300"
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