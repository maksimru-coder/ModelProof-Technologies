import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Workflow, CheckCircle, Users, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIWorkflowAutomation() {
  const workflows = [
    {
      title: "Lead qualification & routing",
      description: "Website, forms, or emails → AI qualification → CRM updates → follow-up actions"
    },
    {
      title: "Client intake & summarization",
      description: "Forms, documents, or emails → structured summaries → next-step recommendations"
    },
    {
      title: "Support & service ticket triage",
      description: "Categorization, prioritization, response drafting, and escalation logic"
    },
    {
      title: "Compliance & policy checks",
      description: "Policy-aware review, risk flagging, bias detection, and audit-ready outputs"
    },
    {
      title: "Internal knowledge assistants",
      description: "Secure AI trained on private documents for accurate, role-aware answers"
    },
    {
      title: "Operational reporting & insights",
      description: "Activity data → AI-generated insights → dashboards and decision support"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Discovery",
      description: "Identify a high-value, repetitive workflow and success metrics."
    },
    {
      step: "2",
      title: "Design",
      description: "Define workflow steps, data sources, guardrails, and integrations."
    },
    {
      step: "3",
      title: "Build & Integrate",
      description: "Implement automations connected to your tools (CRM, email, forms, calendar, ticketing)."
    },
    {
      step: "4",
      title: "Validate & Support",
      description: "QA testing, monitoring, improvements, and ongoing optimization."
    }
  ];

  const whyModelProof = [
    "Quality-first automation: built with testing, monitoring, and reliability checks",
    "Compliance-ready guardrails: bias checks, safety controls, and audit-friendly outputs",
    "Vendor-neutral: we fit into your stack, not the other way around",
    "Fast delivery: focused scope and rapid iteration",
    "Built by experts: 25+ years in software development, testing, automation, and validation"
  ];

  const whoThisIsFor = [
    {
      icon: Briefcase,
      text: "Small businesses that need time savings now"
    },
    {
      icon: Users,
      text: "Teams with repeatable processes and fragmented tools"
    },
    {
      icon: Building,
      text: "Organizations that need trust, compliance, and predictable output"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI Workflow Automation
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Turn repetitive work into reliable, measurable automation—without sacrificing compliance or brand safety.
              </p>
              <p className="text-lg text-muted-foreground">
                ModelProof builds practical AI workflows that save time and reduce errors across customer operations, support, compliance, and internal teams. We focus on workflows that are easy to adopt, integrated with your existing tools, and backed by enterprise-grade QA and responsible AI guardrails.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-4">What We Automate</h2>
              <p className="text-center text-muted-foreground mb-12">Common workflows we automate include:</p>
              <div className="grid gap-6 md:grid-cols-2">
                {workflows.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-card rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-8 italic">
                …and other custom AI workflows tailored to your business processes, risk profile, and compliance requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {howItWorks.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-card rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Why ModelProof</h2>
              <div className="grid gap-4">
                {whyModelProof.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Who This Is For</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {whoThisIsFor.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex flex-col items-center text-center p-6 bg-card rounded-lg border"
                  >
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <p className="text-muted-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to automate a workflow?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tell us the process you want to automate and the tools you use. We'll propose a safe, measurable workflow plan and next steps.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
