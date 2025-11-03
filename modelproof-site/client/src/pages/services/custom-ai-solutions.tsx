import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomAISolutions() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI Built Around Your Business
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Every business has unique workflows, data, and challenges. We design custom AI solutions that fit your exact needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-12">What We Build</h2>
              <div className="grid gap-6 md:grid-cols-1">
                {[
                  {
                    title: "Knowledge Automation",
                    description: "Train AI on your private data for instant, accurate answers."
                  },
                  {
                    title: "Workflow Automation",
                    description: "Automate processes like ticket routing, lead scoring, or compliance checks."
                  },
                  {
                    title: "Industry-Specific Agents", 
                    description: "Healthcare, finance, e-commerce, or enterprise operations."
                  },
                  {
                    title: "API & System Integrations",
                    description: "Connect AI to your CRM, ERP, or internal tools."
                  },
                  {
                    title: "Custom Analytics Dashboards",
                    description: "Track usage, performance, and ROI."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-card rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    step: "1",
                    title: "Discovery",
                    description: "Understand your needs."
                  },
                  {
                    step: "2", 
                    title: "Design",
                    description: "Build a tailored AI architecture."
                  },
                  {
                    step: "3",
                    title: "Deployment", 
                    description: "Secure setup with full integration."
                  },
                  {
                    step: "4",
                    title: "Support",
                    description: "Ongoing monitoring and optimization."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-card rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to Build Your Custom AI Solution?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can create intelligent automation tailored specifically for your business.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}