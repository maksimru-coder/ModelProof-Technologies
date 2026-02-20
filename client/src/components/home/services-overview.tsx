import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Settings, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "AI Chat Assistant Services",
    headline: "24/7 Lead Generation & Support — Powered by Smart AI Agents",
    description: "Custom-trained AI assistants and intelligent agents that engage visitors, qualify leads, and book appointments — fully integrated with tools like Calendly, CRMs, and analytics platforms.",
    icon: Bot,
    path: "/services/ai-chat-assistant"
  },
  {
    title: "AI Workflow Automation",
    headline: "Fast, practical automation for real business processes",
    description: "We design and implement AI-powered workflows that remove repetitive work — such as lead qualification, intake summarization, ticket routing, compliance checks, and more — securely integrated with your existing tools.",
    icon: Workflow,
    path: "/services/ai-workflow-automation"
  },
  {
    title: "Custom AI Solutions",
    headline: "Tailored AI Built for Your Business",
    description: "From workflow automation to industry-specific AI agents, we design intelligent solutions customized to your unique needs. Scalable, secure, and fully integrated with your tools.",
    icon: Settings,
    path: "/services/custom-ai-solutions"
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
            Expert AI solutions that deliver quality, reliability, and measurable results.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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