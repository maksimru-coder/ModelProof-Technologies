import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Lightbulb, Target, Building2, Compass, Landmark, Stethoscope, Monitor, CircuitBoard, Scale, Building, Calculator, TrendingUp, Home, Briefcase, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Deep Expertise",
    description:
      "Over 20 years of Development & QA experience with deep understanding of AI/ML/DL, enterprise solutions, and Fortune 500 implementations.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "We partner closely with you to achieve your goals, whether ensuring AI quality or implementing conversion-focused automation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Our proprietary ModelProof Framework™ and custom AI solutions provide structured, effective approaches to AI validation and implementation.",
  },
  {
    icon: Target,
    title: "Comprehensive",
    description:
      "End-to-end AI solutions - from validation and compliance to intelligent automation and customer engagement.",
  },
];

const professionalServices = [
  {
    icon: Scale,
    title: "Legal & Law Firms",
    description: "AI solutions for client intake, case qualification, and automated legal consultations",
  },
  {
    icon: Stethoscope,
    title: "Medical & Dental Practices",
    description: "AI automation for patient scheduling, appointment booking, and 24/7 patient support",
  },
  {
    icon: Home,
    title: "Real Estate Agencies",
    description: "AI assistants for lead qualification, property inquiries, and showing coordination",
  },
  {
    icon: Calculator,
    title: "Financial & Accounting Services",
    description: "AI validation for compliance and automated client consultation systems",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "AI solutions for lead generation, client qualification, and service automation",
  },
  {
    icon: Heart,
    title: "Healthcare Specialists",
    description: "AI automation for appointment management and patient pre-screening",
  },
];

const enterpriseTech = [
  {
    icon: TrendingUp,
    title: "FinTech & financial services",
    description: "Ensuring reliable and compliant AI solutions in finance",
  },
  {
    icon: Building,
    title: "Healthcare & medical applications",
    description: "Validating critical healthcare AI systems",
  },
  {
    icon: Monitor,
    title: "Enterprise software companies",
    description: "Quality assurance for enterprise-grade AI solutions",
  },
  {
    icon: CircuitBoard,
    title: "AI product companies",
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
          Your expert partner in AI excellence and automation
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
              ModelProof Technologies is a Silicon Valley-based AI solutions company dedicated to ensuring the reliability, performance, and ethical deployment of artificial intelligence systems. From rigorous validation and quality assurance to intelligent conversational AI, we help businesses deploy AI they can trust and rely on.
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
              Our mission is to empower businesses with trusted AI solutions. We help organizations validate existing AI systems for quality and compliance, while also implementing custom AI automation that drives real business results.
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
        <h2 className="text-2xl font-bold mb-8 text-center">Industries We Serve</h2>
        <p className="text-muted-foreground text-center mb-12">
          We provide specialized AI solutions across various sectors
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle>Professional Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professionalServices.map((service) => (
                  <div key={service.title} className="flex items-start space-x-3">
                    <service.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Your Industry</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're in an industry that would benefit from AI validation or intelligent automation to improve customer engagement, streamline operations, or ensure compliance, we'd love to discuss how our solutions can help your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle>Enterprise & Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enterpriseTech.map((industry) => (
                  <div key={industry.title} className="flex items-start space-x-3">
                    <industry.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{industry.title}</h4>
                      <p className="text-sm text-muted-foreground">{industry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}