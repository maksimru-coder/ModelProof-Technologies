import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 hero-background opacity-50" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Elevating AI Through{" "}
            <span className="text-primary">Expert Validation</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your strategic partner in ensuring AI system quality, reliability, and
            ethical compliance
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:translate-y-[-2px] transition-transform">
                View Our Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="outline" size="lg" className="hover:translate-y-[-2px] transition-transform">
                Learn Our Methodology
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}