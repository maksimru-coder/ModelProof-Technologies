import { motion } from "framer-motion";
import { useEffect } from "react";
import { ComparisonMatrix } from "@/components/services/comparison-matrix";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, Shield, Network, Clock, Bot, Settings, Workflow } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ServiceIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-16 h-16 mb-6 flex items-center justify-center">
    {children}
  </div>
);

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
          Comprehensive AI solutions — from system validation to intelligent assistants
        </p>
      </motion.div>

      <div className="grid gap-8 mb-16">
        <Card id="ai-chat-assistant">
          <CardHeader>
            <ServiceIcon>
              <Bot className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Chat Assistant Services</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              24/7 Lead Generation & Support — Powered by Intelligent AI Agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Custom-trained AI assistants and smart agents that turn your website into a 24/7 lead generation and support engine. We design, deploy, and manage fully branded AI chat solutions trained on your unique content — seamlessly integrated with tools like Calendly, CRMs, and analytics platforms.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Website & Document Training</span><br />
                  <span className="text-sm">Your AI assistant is trained using your website, FAQs, PDFs, and internal documentation</span>
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Lead Capture & Appointment Booking</span><br />
                  <span className="text-sm">Automates contact collection, lead qualification, and meeting scheduling through tools like Calendly</span>
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">CRM & Calendar Integrations</span><br />
                  <span className="text-sm">Routes leads directly into your CRM or calendar for immediate follow-up and automation</span>
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Usage Monitoring & Monthly Reporting</span><br />
                  <span className="text-sm">Real-time analytics with performance insights delivered monthly</span>
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Fully Branded Solution</span><br />
                  <span className="text-sm">100% white-labeled — no third-party logos or tool branding</span>
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/ai-chat-assistant">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="ai-workflow-automation">
          <CardHeader>
            <ServiceIcon>
              <Workflow className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Workflow Automation</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Turn repetitive work into reliable, measurable automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              ModelProof builds practical AI-powered workflows that eliminate repetitive tasks across customer operations, support, compliance, and internal teams—without sacrificing reliability, compliance, or brand safety.
            </p>
            <p className="mb-6 text-muted-foreground">
              We focus on high-impact workflows that are easy to adopt, securely integrated with your existing tools, and backed by enterprise-grade QA and responsible AI guardrails.
            </p>
            <div className="flex justify-center">
              <Link href="/services/ai-workflow-automation">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="custom-ai-solutions">
          <CardHeader>
            <ServiceIcon>
              <Settings className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">Custom AI Solutions</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Tailored AI Built for Your Business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              From workflow automation to industry-specific AI agents, we design intelligent solutions customized to your unique needs. Scalable, secure, and fully integrated with your tools.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Knowledge Automation:</span> Train AI on your private data for instant, accurate answers
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Workflow Automation:</span> Automate processes like ticket routing, lead scoring, or compliance checks
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Industry-Specific Agents:</span> Healthcare, finance, e-commerce, or enterprise operations
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">API & System Integrations:</span> Connect AI to your CRM, ERP, or internal tools
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Custom Analytics Dashboards:</span> Track usage, performance, and ROI
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/custom-ai-solutions">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="essential">
          <CardHeader>
            <ServiceIcon>
              <Search className="h-12 w-12 stroke-[1.5] text-primary" 
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">Essential Assessment</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Uncover the hidden potential of your AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Our Essential Assessment provides a rapid, comprehensive evaluation of your AI system's foundation. We establish clear quality baselines, pinpoint critical risks, and identify immediate opportunities for optimization – setting your AI initiatives up for success.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">AI Architecture Deep Dive:</span> Thorough analysis of your AI system's architecture, data flows, and dependencies
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Data Quality & Bias Evaluation:</span> Rigorous assessment of your training data
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Performance Baseline Definition:</span> Establishing key performance indicators (KPIs)
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/essential-assessment">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="professional">
          <CardHeader>
            <ServiceIcon>
              <Shield className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">Professional Validation</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Deploy AI with confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Our Professional Validation service provides in-depth testing and analysis, ensuring your AI systems meet the highest standards of performance, reliability, and compliance. We minimize risks and maximize your AI's potential.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Performance & Reliability Testing:</span> Comprehensive testing under diverse conditions
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Bias Detection & Mitigation:</span> Advanced techniques to identify and quantify bias
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Custom Test Suite Design:</span> Tailored test cases for your unique AI system
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/professional-validation">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="enterprise">
          <CardHeader>
            <ServiceIcon>
              <Network className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">Enterprise Solution</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Scale your AI initiatives with confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Our Enterprise Solutions provide end-to-end strategic partnership for complex AI implementations. We deliver continuous quality assurance, strategic optimization, and full compliance management, empowering you to scale your AI deployments securely and effectively.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Custom AI Testing Frameworks:</span> Bespoke solutions aligned with your needs
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Automated Test Suite Development:</span> Continuous monitoring and validation
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Real-time Performance Monitoring & Alerts:</span> Proactive system tracking
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/enterprise-solution">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="retainer">
          <CardHeader>
            <ServiceIcon>
              <Clock className="h-12 w-12 stroke-[1.5] text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))"
                }}
              />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">Retainer Services</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              Focus on innovation, not quality concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Our Retainer Services provide proactive AI monitoring, continuous improvement, and rapid issue resolution. We ensure your AI systems consistently deliver exceptional results, allowing you to concentrate on what matters most: driving your business forward.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Proactive AI Health Monitoring:</span> Continuous surveillance of your AI systems in production
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Regular Performance Reporting & Insights:</span> In-depth reports on key metrics and trends
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Rapid Response & Issue Resolution:</span> Prioritized support and swift incident resolution
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Continuous Improvement & Optimization:</span> Proactive recommendations based on ongoing analysis
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Dedicated AI Quality Partner:</span> Access to an expert who understands your business needs
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/retainer-services">
                <Button 
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
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
