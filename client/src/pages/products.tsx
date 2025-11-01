import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
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
          Explore our growing suite of AI validation and bias detection tools. Each product is designed to help enterprises, developers, and government organizations deploy AI responsibly and transparently.
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
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <Radar 
                  className="h-12 w-12 stroke-[1.5] text-primary" 
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                  }}
                />
              </div>
              <CardTitle className="text-2xl mb-2">BiasRadar™ — AI Bias Detection Engine</CardTitle>
              <CardDescription className="text-lg font-medium text-primary/80 mb-4">
                Detect and remove bias in text, documents, and datasets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Detects and removes bias in text, documents, and datasets across multiple categories — including gender, race, age, disability, and more.
              </p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="transition-all duration-300 hover:shadow-lg opacity-75">
            <CardHeader>
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <ShieldCheck 
                  className="h-12 w-12 stroke-[1.5] text-muted-foreground" 
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(150, 150, 150, 0.2))"
                  }}
                />
              </div>
              <CardTitle className="text-2xl mb-2">ModelProof Validator</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground mb-4">
                Comprehensive AI model testing and compliance scoring suite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Comprehensive AI model testing and compliance scoring suite for enterprise and government.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button 
                  disabled
                  className="px-8 py-2"
                  data-testid="button-modelproof-validator-disabled"
                >
                  Coming Soon
                </Button>
                <span className="text-sm text-muted-foreground">(Learn More)</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
