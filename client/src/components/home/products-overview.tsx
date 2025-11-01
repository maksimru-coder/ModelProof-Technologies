import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export function ProductsOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Products</h2>
          <p className="mt-4 text-muted-foreground">
            Innovative AI tools that enhance fairness, reliability, and trust.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="space-y-6">
                <IconWrapper>
                  <Radar 
                    className="h-12 w-12 stroke-[1.5] text-primary" 
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                    }}
                  />
                </IconWrapper>
                <div>
                  <CardTitle className="text-xl mb-2">BiasRadar™ — Bias Detection for Responsible AI</CardTitle>
                  <p className="text-lg font-medium text-primary/80">AI Bias Detection Engine</p>
                </div>
                <CardDescription className="text-sm">
                  <p className="text-muted-foreground">
                    Scan text or documents for potential bias across gender, race, age, and more. Ensure your AI systems and communications remain fair, inclusive, and compliant.
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-6">
                <Link href="/biasradar">
                  <Button
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                    data-testid="button-launch-biasradar-home"
                  >
                    Launch BiasRadar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
