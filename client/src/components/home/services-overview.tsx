import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, LineChart, Network, Clock } from "lucide-react";

const services = [
  {
    title: "Essential Assessment",
    description:
      "Foundational overview of your AI system's quality and readiness.",
    icon: Shield,
    price: "$10,000 - $15,000",
  },
  {
    title: "Professional Validation",
    description:
      "In-depth testing and analysis of your AI system's performance.",
    icon: LineChart,
    price: "$20,000 - $30,000",
  },
  {
    title: "Enterprise Solution",
    description: "Custom, end-to-end AI validation for complex projects.",
    icon: Network,
    price: "$50,000 - $100,000+",
  },
  {
    title: "Retainer Services",
    description: "Ongoing, proactive AI quality assurance and validation.",
    icon: Clock,
    price: "$5,000 - $15,000/month",
  },
];

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
            >
              <Card className="h-full">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">
                    {service.price}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
