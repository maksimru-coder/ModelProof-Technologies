import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Calendar, 
  Database,
  BarChart3,
  Palette,
  Clock,
  Wrench,
  Target
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIChatAssistant() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">AI Chat Assistant Services</h1>
        <p className="text-xl text-muted-foreground mb-6">
          24/7 Lead Generation & Support — Powered by Custom AI Agents
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Transform your website into a smart, always-on sales and support engine.
            Our custom-trained AI chat assistants and intelligent agents engage visitors, answer questions, qualify leads, and book appointments — all while reflecting your brand voice and expertise.
          </p>
          
          <p className="text-muted-foreground text-lg mb-12">
            We handle the full process — from training and setup to integration, launch, and monitoring — so you can focus on growing your business.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Core Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Website & Document Training</span>
                      <p className="text-sm text-muted-foreground">We train your assistant using your website, PDFs, FAQs, and other business content.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Lead Capture & Appointment Booking</span>
                      <p className="text-sm text-muted-foreground">Your assistant collects contact info, qualifies leads, and schedules meetings via Calendly or other tools.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">CRM & Calendar Integration</span>
                      <p className="text-sm text-muted-foreground">Seamlessly route leads to your CRM, calendar, or email workflows.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Analytics & Usage Monitoring</span>
                      <p className="text-sm text-muted-foreground">Access clear performance dashboards and receive monthly reports with insights.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Fully Branded Deployment</span>
                      <p className="text-sm text-muted-foreground">No third-party logos or tool branding — your chatbot looks and feels like part of your company.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Ideal For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Medical & Dental Clinics</span>
                      <p className="text-sm text-muted-foreground">Patient scheduling, pre-visit intake, and common question handling.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Law Firms</span>
                      <p className="text-sm text-muted-foreground">Lead qualification, intake triage, and appointment booking.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Startups & SaaS Companies</span>
                      <p className="text-sm text-muted-foreground">Onboarding support, product demos, and trial conversions.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Professional Services</span>
                      <p className="text-sm text-muted-foreground">Consultation booking, document intake, and FAQ automation.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Any Business with a Website</span>
                      <p className="text-sm text-muted-foreground">Looking to automate support and capture more leads without extra staff.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold mb-6">How It Works: Our 3-Step Process</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">1. Data Collection & Setup</h4>
                <p className="text-sm text-muted-foreground">
                  We gather your content (website, PDFs, FAQs) and create a private knowledge base.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">2. AI Training & Customization</h4>
                <p className="text-sm text-muted-foreground">
                  We build and fine-tune a chatbot trained specifically on your business info, tone, and goals.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">3. Branded Integration</h4>
                <p className="text-sm text-muted-foreground">
                  We deploy the chatbot to your website, fully white-labeled and integrated with your tools (Calendly, CRMs, etc.).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h4 className="font-semibold mb-3">
              <Clock className="inline h-5 w-5 mr-2" />
              Timeline & Delivery
            </h4>
            <p className="text-muted-foreground">
              Most AI Chat Assistant implementations are completed in 2–3 weeks, including content setup, training, integration, and testing. We offer ongoing support and optimization to maximize ROI and ensure long-term performance.
            </p>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">Ready to Boost Conversions & Automate Support?</h3>
            <p className="text-muted-foreground mb-6">
              Let's build your intelligent AI assistant — fully managed, branded, and results-driven.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => window.scrollTo(0, 0)}
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}