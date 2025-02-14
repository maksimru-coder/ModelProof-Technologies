import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  BarChart, 
  FileStack,
  Target,
  Shield
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ProfessionalValidation() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Professional Validation</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Duration: 4-6 weeks
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            The Professional Validation service provides in-depth testing and analysis of your AI system, utilizing Phase 1: Assessment, Phase 2: Validation, and Phase 3: Optimization of the ModelProof Framework™.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comprehensive Package</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Testing & Analysis</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Detailed Testing Results</li>
                    <li>Performance Analysis Report</li>
                    <li>Quality Metrics Dashboard</li>
                    <li>Implementation Roadmap</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FileStack className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Technical Documentation</li>
                    <li>Training Materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quality Framework</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Test Cases Library</li>
                    <li>Validation Protocols</li>
                    <li>Quality Standards</li>
                    <li>Performance Benchmarks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Success Metrics</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Quality Improvement %</li>
                <li>Error Reduction Rate</li>
                <li>Performance Enhancement</li>
                <li>Resource Optimization</li>
                <li>Customer Satisfaction</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ideal For</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Organizations preparing to deploy AI solutions into production</li>
                <li>Teams requiring a thorough performance assessment</li>
                <li>Projects needing detailed documentation for compliance</li>
              </ul>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}