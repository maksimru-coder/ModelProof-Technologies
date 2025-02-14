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
          Comprehensive AI validation services tailored to your organization's needs
        </p>
      </motion.div>

      <div className="grid gap-8 mb-16">
        <Card id="essential">
          <CardHeader>
            <CardTitle>Essential Assessment</CardTitle>
            <CardDescription>
              Uncover the hidden potential of your AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Our Essential Assessment provides a rapid, comprehensive evaluation of your AI system's foundation. We establish clear quality baselines, pinpoint critical risks, and identify immediate opportunities for optimization – setting your AI initiatives up for success.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">AI Architecture Deep Dive: Thorough analysis of your AI system's architecture, data flows, and dependencies</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Data Quality & Bias Evaluation: Rigorous assessment of your training data</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Performance Baseline Definition: Establishing key performance indicators (KPIs)</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card id="professional">
          <CardHeader>
            <CardTitle>Professional Validation</CardTitle>
            <CardDescription>
              Deploy AI with confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Our Professional Validation service provides in-depth testing and analysis, ensuring your AI systems meet the highest standards of performance, reliability, and compliance. We minimize risks and maximize your AI's potential.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Performance & Reliability Testing: Comprehensive testing under diverse conditions</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Bias Detection & Mitigation: Advanced techniques to identify and quantify bias</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Custom Test Suite Design: Tailored test cases for your unique AI system</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card id="enterprise">
          <CardHeader>
            <CardTitle>Enterprise Solution</CardTitle>
            <CardDescription>
              Scale your AI initiatives with confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Our Enterprise Solutions provide end-to-end strategic partnership for complex AI implementations. We deliver continuous quality assurance, strategic optimization, and full compliance management, empowering you to scale your AI deployments securely and effectively.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Custom AI Testing Frameworks: Bespoke solutions aligned with your needs</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Automated Test Suite Development: Continuous monitoring and validation</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Real-time Performance Monitoring & Alerts: Proactive system tracking</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button className="w-full">Get Started</Button>
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