import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Lightbulb, Target, Building2, Compass, Landmark, Stethoscope, Monitor, CircuitBoard } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Deep Expertise",
    description:
      "Over 20 years of QA experience with deep understanding of AI/ML/DL and Fortune 500 background.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "We partner closely with you to achieve your goals for trustworthy AI systems.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Our proprietary ModelProof Framework™ provides a structured and effective approach to AI validation.",
  },
  {
    icon: Target,
    title: "Comprehensive",
    description:
      "End-to-end validation that examines system results, model integrity, and data quality.",
  },
];

const industries = [
  {
    icon: Landmark,
    title: "FinTech & Financial Services",
    description: "Ensuring reliable and compliant AI solutions in finance",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Medical Applications",
    description: "Validating critical healthcare AI systems",
  },
  {
    icon: Monitor,
    title: "Enterprise Software",
    description: "Quality assurance for enterprise-grade AI solutions",
  },
  {
    icon: CircuitBoard,
    title: "AI Product Companies",
    description: "Comprehensive validation for AI-first products",
  },
];

export default function About() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">About ModelProof</h1>
        <p className="text-lg text-muted-foreground">
          Your expert partner in ensuring AI quality and reliability
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Who We Are</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ModelProof Technologies LLC is a specialized Artificial Intelligence
              (AI) quality assurance and validation firm dedicated to ensuring the
              reliability, accuracy, ethical soundness, and regulatory compliance
              of AI systems. We are the "quality control" for AI.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to build trust in AI systems through rigorous
              validation and quality assurance. We help organizations develop and
              deploy AI solutions that are reliable, ethical, and compliant with
              industry standards.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle>Industries We Serve</CardTitle>
            <CardDescription>
              We provide specialized AI validation services across various sectors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {industries.map((industry) => (
                <Card 
                  key={industry.title}
                  className="hover:shadow-lg transition-all duration-200 border-0 shadow-none hover:bg-accent/50"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <industry.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{industry.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}