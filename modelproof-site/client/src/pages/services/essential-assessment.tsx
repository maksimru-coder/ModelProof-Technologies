import { motion } from "framer-motion";
import { ClipboardCheck, Shield, FileSearch, Scale } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EssentialAssessment() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Essential Assessment</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Duration: 2-3 weeks
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            The Essential Assessment provides a foundational overview of your AI system's quality and readiness.
          </p>
          <div className="mb-8 p-4 bg-primary/5 rounded-lg">
            <h3 className="font-semibold mb-2">Framework Phases Used:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Phase 1: Assessment</li>
              <li>Phase 2: Validation</li>
            </ul>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Key Deliverables</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Documentation Package</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Quality Assessment Report</li>
                    <li>Risk Analysis Document</li>
                    <li>Compliance Checklist</li>
                    <li>Executive Summary</li>
                    <li>Action Plan</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FileSearch className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Metrics Dashboard</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Key Performance Indicators (KPIs)</li>
                    <li>Quality Metrics</li>
                    <li>Risk Indicators</li>
                    <li>Basic Benchmark Data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Success Metrics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Quality Improvement %</li>
                    <li>Identification of High-Risk Issues</li>
                    <li>Time to Market</li>
                    <li>Resource Optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ideal For</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Organizations launching new AI projects</li>
                <li>Teams seeking a basic quality check</li>
                <li>Projects needing a high-level risk assessment before deployment</li>
              </ul>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button
                size="lg"
                onClick={() => window.scrollTo(0, 0)}
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