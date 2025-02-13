import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ensuring AI You Can Trust Through{" "}
            <span className="text-primary">Expert Validation</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            ModelProof Technologies is your expert partner in ensuring the quality,
            reliability, and ethical integrity of your AI systems.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/services">
              <Button size="lg">
                View Our Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="outline" size="lg">
                Learn Our Methodology
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
