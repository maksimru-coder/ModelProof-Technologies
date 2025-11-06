import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Radar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Cutting-edge tools built by ModelProof Technologies to ensure trustworthy, fair, and reliable AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <p className="text-center text-muted-foreground">
          Explore our growing suite of AI validation and bias detection tools. Each product is designed to help enterprises, developers, government organizations, and any company deploy AI responsibly, transparently, and neutrally—free from bias, while enabling broader business neutrality and fairness.
        </p>
      </motion.div>

      <div className="grid gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <div className="mb-6 flex items-center justify-center">
                <div className="relative inline-block">
                  <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-green-500 rounded-full p-5 shadow-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 rounded-full opacity-40 animate-pulse"></div>
                    <Radar className="h-14 w-14 text-white relative z-10" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">BiasRadar™ — AI Bias Detection Engine</CardTitle>
              <CardDescription className="text-lg font-medium text-primary/80 mb-4">
                Now available via API and Web Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-muted-foreground space-y-3">
                <p>
                  Detect, analyze, and fix bias across gender, race, age, disability, culture, and more. BiasRadar™ empowers organizations to ensure their AI systems, content, and communications remain fair, neutral, and compliant with emerging regulations.
                </p>
                <p>
                  Use the web dashboard to scan text or documents manually, or integrate the BiasRadar API directly into your workflows for automated, real-time bias analysis and remediation.
                </p>
                <p>
                  Generate professional BiasRadar™ Audit Reports with risk scores, bias categories, and side-by-side original and remediated text — ready for compliance review and documentation.
                </p>
                <p>
                  Ideal for companies, researchers, government agencies, and anyone committed to responsible AI and ethical transparency.
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/biasradar">
                  <Button 
                    className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                    onClick={() => window.scrollTo(0, 0)}
                    data-testid="button-launch-biasradar"
                  >
                    Launch BiasRadar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
