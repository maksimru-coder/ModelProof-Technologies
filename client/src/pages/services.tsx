import { motion } from "framer-motion";
import { useEffect } from "react";
import { ComparisonMatrix } from "@/components/services/comparison-matrix";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Services() {
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
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive AI validation services tailored to your needs
        </p>
      </motion.div>

      <div className="grid gap-8 mb-16">
        <Card id="essential">
          <CardHeader>
            <CardTitle>Essential Assessment</CardTitle>
            <CardDescription>
              Starting at $10,000 - Perfect for initial AI quality evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Get a foundational overview of your AI system's quality and
              readiness with our Essential Assessment package.
            </p>
            <Link href="/contact">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card id="professional">
          <CardHeader>
            <CardTitle>Professional Validation</CardTitle>
            <CardDescription>
              Starting at $20,000 - Comprehensive testing and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              In-depth testing and analysis of your AI system's performance,
              reliability, and compliance.
            </p>
            <Link href="/contact">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card id="enterprise">
          <CardHeader>
            <CardTitle>Enterprise Solution</CardTitle>
            <CardDescription>
              Starting at $50,000 - Custom end-to-end validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Tailored solution for large-scale, complex AI projects requiring
              continuous quality assurance.
            </p>
            <Link href="/contact">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Service Comparison</h2>
        <ComparisonMatrix />
      </div>
    </div>
  );
}