import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Calendar, 
  Database,
  BarChart3,
  Palette,
  Clock
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
        <p className="text-xl text-muted-foreground mb-12">
          24/7 Lead Generation & Support Engine
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Custom-trained AI assistants that turn your website into a 24/7 lead generation and support engine. 
            We design, deploy, and manage branded chatbots trained on your data — fully integrated with tools like 
            Calendly, CRMs, and analytics platforms.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Core Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Website & Document Training:</span> Custom chatbot trained on your specific content
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Lead Capture & Booking:</span> Automated appointment scheduling and contact collection
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">CRM & Calendar Integration:</span> Seamless data flow to your existing tools
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Usage Monitoring:</span> Comprehensive analytics and monthly reporting
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Fully Branded:</span> Complete white-label solution with no third-party logos
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Ideal For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Medical & Dental Clinics:</span> Patient scheduling and FAQ automation
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Law Firms:</span> Initial client consultation and case qualification
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Startups & SaaS:</span> Product demos and trial signup automation
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Professional Services:</span> Lead qualification and consultation booking
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">Any Business:</span> Looking to automate support and boost conversions
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4">Implementation Process</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">1. Data Collection</h4>
                <p className="text-sm text-muted-foreground">
                  We analyze your website, documents, and FAQs to create a comprehensive knowledge base
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">2. AI Training</h4>
                <p className="text-sm text-muted-foreground">
                  Custom AI model trained on your specific content and business processes
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">3. Brand Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Fully branded deployment with seamless integration into your existing workflow
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Customer Experience?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how AI Chat Assistant Services can boost your conversions and automate your support.
            </p>
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Get Started Today
              </Button>
            </Link>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">
              <Clock className="inline h-5 w-5 mr-2" />
              Timeline & Delivery
            </h4>
            <p className="text-muted-foreground">
              Most AI Chat Assistant implementations are completed within 2-3 weeks, including training, 
              integration, and testing phases. We provide ongoing support and optimization to ensure 
              maximum performance and ROI.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}