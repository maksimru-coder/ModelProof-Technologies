import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, FileSearch, RefreshCw, Star, Globe, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-16 h-16 mb-6 flex items-center justify-center">{children}</div>
);

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
        <p className="text-lg text-muted-foreground">Start with a free scan. Add the audit, the retainer, or the work that feeds the models.</p>
      </motion.div>
      <div className="grid gap-8 mb-16">
        <Card id="mini-scan">
          <CardHeader>
            <ServiceIcon><Search className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Free mini-scan</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">Five prompts. Three models. The raw answers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">We run five real customer-style prompts about your business through ChatGPT, Claude, and Gemini and send you what they said — plus a short, honest read.</p>
            <div className="flex justify-center">
              <Link href="/contact"><Button className="px-8 py-2" onClick={() => window.scrollTo(0, 0)}>Request a mini-scan<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </CardContent>
        </Card>
        <Card id="audit">
          <CardHeader>
            <ServiceIcon><FileSearch className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Visibility Audit — $750</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">One-time diagnosis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dozens of prompts across three models, covering reviews, website, Google Business Profile, and competitors. Written report with evidence and a ranked fix list.</p>
          </CardContent>
        </Card>
        <Card id="retainer">
          <CardHeader>
            <ServiceIcon><RefreshCw className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Visibility retainer — $600/month</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">Re-test, track, keep fixing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Monthly re-testing and a plain-English report showing whether you are gaining or losing ground.</p>
          </CardContent>
        </Card>
        <Card id="reviews">
          <CardHeader>
            <ServiceIcon><Star className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Review management — $300/month</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">A strong signal the models read</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Monitor reviews, flag replies, and help build a steady stream of fresh ones.</p>
          </CardContent>
        </Card>
        <Card id="websites">
          <CardHeader>
            <ServiceIcon><Globe className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Websites</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">The models look here first</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Essential website — $2,500</li>
              <li>Premium website — $5,000</li>
              <li>Website-as-a-Service — $199/month, 12-month term</li>
              <li>Website Rescue — $1,000–$2,500</li>
            </ul>
          </CardContent>
        </Card>
        <Card id="front-desk">
          <CardHeader>
            <ServiceIcon><Phone className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Front Desk</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">Answers calls and messages like your business</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Founding rate — $1,500 setup + $250/month, locked 12 months</li>
              <li>Standard rate — $2,500 setup + $400/month</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
