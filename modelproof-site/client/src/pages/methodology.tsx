import { motion } from "framer-motion";
import { QualityScore } from "@/components/framework/quality-score";
import { ArrowRight, Target, Shield, Settings, Activity, LineChart, TrendingUp, BarChart3, GitMerge } from "lucide-react";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const PhaseCard = ({ phase, title, description, icon: Icon, isLast = false }: {
  phase: number;
  title: string;
  description: string;
  icon: any;
  isLast?: boolean;
}) => (
  <div className="relative">
    <Card className="relative z-10 hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-muted-foreground">Phase {phase}</div>
            <CardTitle className="text-sm font-semibold whitespace-nowrap">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
    {!isLast && (
      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-0 hidden md:block">
        <ArrowRight className="h-6 w-6 text-primary/30" />
      </div>
    )}
  </div>
);

const ScoreLevel = ({ level, range, description, score }: {
  level: string;
  range: string;
  description: string;
  score: number;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors">
    <Progress value={score} className="w-24 h-2" />
    <div>
      <div className="font-medium">{level}</div>
      <div className="text-sm text-muted-foreground">{range}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  </div>
);

const ScoreUsageCard = ({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex items-start space-x-3 p-4">
    <div className="mt-1">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function Methodology() {
  const phases = [
    {
      phase: 1,
      title: "Assessment",
      description: "Deep dive into your AI system's architecture, analyzing requirements, evaluating risks, and establishing quality baselines.",
      icon: Target,
    },
    {
      phase: 2,
      title: "Validation",
      description: "Rigorous testing of your AI system, including model performance, output quality verification, and bias detection.",
      icon: Shield,
    },
    {
      phase: 3,
      title: "Optimization",
      description: "Focus on enhancing performance, optimizing resources, and refining processes for maximum efficiency.",
      icon: Settings,
    },
    {
      phase: 4,
      title: "Monitoring",
      description: "Continuous quality tracking and performance monitoring to ensure long-term success.",
      icon: Activity,
    },
  ];

  const scoreLevels = [
    {
      level: "Exceptional",
      range: "95-100",
      description: "Outstanding performance across all dimensions",
      score: 100,
    },
    {
      level: "Excellent",
      range: "85-94",
      description: "Strong performance and high reliability",
      score: 90,
    },
    {
      level: "Good",
      range: "70-84",
      description: "Satisfactory performance with room for optimization",
      score: 80,
    },
    {
      level: "Needs Improvement",
      range: "50-69",
      description: "Notable areas requiring attention",
      score: 60,
    },
    {
      level: "Unsatisfactory",
      range: "0-49",
      description: "Significant deficiencies requiring immediate action",
      score: 40,
    },
  ];

  const scoreUsages = [
    {
      icon: LineChart,
      title: "Performance Measurement",
      description: "Assess overall system performance",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor improvements over time",
    },
    {
      icon: BarChart3,
      title: "Benchmarking",
      description: "Compare against industry standards",
    },
    {
      icon: GitMerge,
      title: "Decision Making",
      description: "Guide optimization efforts",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The ModelProof Framework™
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Our proprietary, structured approach to AI quality assurance ensures a rigorous
              and comprehensive validation process that delivers reliable and trustworthy AI systems.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Framework Phases Section */}
      <div className="container py-24">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our framework consists of four key phases, each designed to ensure comprehensive AI validation and quality assurance.
          </p>
        </div>
        <h2 className="text-3xl font-bold text-center mb-16">Our Framework Phases</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto px-6">
          {phases.map((phase, index) => (
            <PhaseCard
              key={phase.phase}
              {...phase}
              isLast={index === phases.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Quality Score Section */}
      <div className="container py-24 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">ModelProof Quality Score™</h2>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto mb-16">
            The ModelProof Quality Score™ is a comprehensive metric used throughout all phases of our validation
            to provide an overall rating of the quality of your AI system across four key dimensions
            (Technical Quality, Business Impact, Risk & Safety, and Operational Excellence).
            This score is reported throughout our engagement to provide a clear and transparent way
            to measure AI system quality:
          </p>
          <QualityScore />
        </div>
      </div>

      {/* Score Interpretation Scale */}
      <div className="container py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Our scoring system provides clear benchmarks for AI system quality
            </p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-16">Score Interpretation Scale</h2>
          <div className="space-y-4">
            {scoreLevels.map((level) => (
              <ScoreLevel key={level.level} {...level} />
            ))}
          </div>
        </div>
      </div>

      {/* How the Score is Used */}
      <div className="container py-24 bg-accent/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How the Score is Used</h2>
          <div className="grid gap-6">
            {scoreUsages.map((usage) => (
              <ScoreUsageCard key={usage.title} {...usage} />
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="container py-12 text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          By using the ModelProof Framework™ and the ModelProof Quality Score™, we provide a complete end to end AI validation service that you can rely on.
        </p>
      </div>

      {/* CTA Section */}
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to ensure the quality of your AI system?</h2>
        <Link href="/contact">
          <Button
            size="lg"
            onClick={() => window.scrollTo(0, 0)}
            className="transform hover:-translate-y-1 transition-all duration-200"
          >
            Contact us to learn more about our methodology
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}