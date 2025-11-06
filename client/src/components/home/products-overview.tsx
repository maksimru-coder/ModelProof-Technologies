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
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative inline-block"
  >
    {children}
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
                <div className="flex justify-center">
                  <IconWrapper>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-green-500 rounded-full shadow-xl relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 rounded-full opacity-40 animate-pulse"></div>
                      <Radar className="h-14 w-14 text-white relative z-10" strokeWidth={2.5} />
                    </div>
                  </IconWrapper>
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">BiasRadar™ — AI Bias Detection Engine</CardTitle>
                  <p className="text-lg font-medium text-primary/80">Now available via API and Web Dashboard</p>
                </div>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">
                    Detect, analyze, and fix bias across gender, race, age, disability, culture, and more. BiasRadar™ empowers organizations to ensure their AI systems, content, and communications remain fair, neutral, and compliant with emerging regulations.
                  </p>
                  <p className="mb-3">
                    Use the web dashboard to scan text or documents manually, or integrate the BiasRadar API directly into your workflows for automated, real-time bias analysis and remediation.
                  </p>
                  <p className="mb-3">
                    Generate professional BiasRadar™ Audit Reports with risk scores, bias categories, and side-by-side original and remediated text — ready for compliance review and documentation.
                  </p>
                  <p className="font-medium">
                    Ideal for companies, researchers, government agencies, and anyone committed to responsible AI and ethical transparency.
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
