import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, LineChart, Network, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Essential Assessment",
    description:
      "Uncover the hidden potential of your AI. Our Essential Assessment provides a rapid, comprehensive evaluation of your AI system's foundation. We establish clear quality baselines, pinpoint critical risks, and identify immediate opportunities for optimization – setting your AI initiatives up for success.",
    icon: Shield,
    benefits: [
      "AI Architecture Deep Dive: Thorough analysis of your AI system's architecture, data flows, and dependencies to reveal potential bottlenecks and vulnerabilities.",
      "Data Quality & Bias Evaluation: Rigorous assessment of your training data for accuracy, completeness, consistency, and bias, identifying areas for data refinement.",
      "Performance Baseline Definition: Establishing key performance indicators (KPIs) and benchmarks for your AI system's accuracy, efficiency, and reliability.",
      "Risk Landscape Mapping: Identifying and prioritizing potential risks to your AI system's performance, safety, and compliance, enabling a targeted mitigation strategy.",
      "Actionable Optimization Roadmap: Delivering a clear, prioritized plan of action to enhance your AI system's quality, performance, and compliance."
    ]
  },
  {
    title: "Professional Validation",
    description:
      "Deploy AI with confidence. Our Professional Validation service provides in-depth testing and analysis, ensuring your AI systems meet the highest standards of performance, reliability, and compliance. We minimize risks and maximize your AI's potential.",
    icon: LineChart,
    benefits: [
      "Performance & Reliability Testing: Comprehensive testing to evaluate your AI system's accuracy, speed, and robustness under diverse conditions and workloads.",
      "Bias Detection & Mitigation: Advanced techniques to identify and quantify bias in your AI models and data, along with practical mitigation strategies.",
      "Compliance & Standards Verification: A detailed assessment of your AI system's adherence to relevant industry regulations, ethical guidelines, and best practices.",
      "Custom Test Suite Design: Development of tailored test cases to address the unique characteristics and potential vulnerabilities of your AI system.",
      "Detailed Reporting & Analysis: Providing comprehensive reports on testing results, performance analysis, and compliance findings, with clear recommendations for improvement."
    ]
  },
  {
    title: "Enterprise Solution",
    description:
      "Scale your AI initiatives with unwavering confidence. Our Enterprise Solutions provide end-to-end strategic partnership for complex AI implementations. We deliver continuous quality assurance, strategic optimization, and full compliance management, empowering you to scale your AI deployments securely and effectively.",
    icon: Network,
    benefits: [
      "Custom AI Testing Frameworks: Design and implementation of bespoke AI testing frameworks aligned with your organization's specific needs, workflows, and risk appetite.",
      "Automated Test Suite Development: Building and deploying automated test suites for continuous monitoring and validation of your AI systems, ensuring ongoing quality.",
      "Seamless System Integration: Integration of AI testing processes into your existing development, deployment, and operational workflows for streamlined efficiency.",
      "Real-time Performance Monitoring & Alerts: Setting up intelligent dashboards and alert systems to track key AI system metrics and proactively identify performance anomalies.",
      "Dedicated Expert Support & Consultation: Ongoing expert guidance and support to ensure the long-term quality, reliability, and compliance of your enterprise AI deployments."
    ]
  },
  {
    title: "Retainer Services",
    description:
      "Focus on innovation, not quality concerns. Our Retainer Services provide proactive AI monitoring, continuous improvement, and rapid issue resolution. We ensure your AI systems consistently deliver exceptional results, allowing you to concentrate on what matters most: driving your business forward.",
    icon: Clock,
    benefits: [
      "Proactive AI Health Monitoring: Continuous surveillance of your AI systems in production to detect and resolve potential issues before they impact your operations.",
      "Regular Performance Reporting & Insights: Providing regular, in-depth reports on key AI system metrics, performance trends, and actionable insights for optimization.",
      "Rapid Response & Issue Resolution: Prioritized support and swift resolution of any AI system issues or incidents, minimizing downtime and maximizing business continuity.",
      "Continuous Improvement & Optimization: Proactive recommendations for enhancing your AI systems' performance, reliability, and compliance based on ongoing analysis and best practices.",
      "Dedicated AI Quality Partner: Access to a dedicated AI quality assurance expert who understands your business and AI systems, providing personalized support and strategic guidance."
    ]
  }
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
    className="text-primary"
  >
    {children}
  </motion.div>
);

export function ServicesOverview() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive AI validation services tailored to your needs
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardHeader className="space-y-4">
                  <IconWrapper>
                    <service.icon className="h-12 w-12" />
                  </IconWrapper>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="mt-4 space-y-3 flex-grow mb-6">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-sm text-muted-foreground"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/services" className="mt-auto">
                    <Button
                      onClick={() => window.scrollTo(0, 0)}
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}