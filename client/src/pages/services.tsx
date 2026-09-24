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
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">What we sell</h1>
        <p className="text-lg text-muted-foreground">Start with a free scan. Pay for the audit only if the results are worth acting on. Keep the retainer only if the monthly report is useful.</p>
      </motion.div>
      <div className="grid gap-8 mb-16">
        <Card id="mini-scan">
          <CardHeader>
            <ServiceIcon><Search className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Free mini-scan</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">The first conversation is the evidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">Five real customer questions. ChatGPT, Claude, and Gemini. You receive the raw answers and a short note on whether you were named, skipped, or described incorrectly.</p>
            <div className="flex justify-center">
              <Link href="/contact"><Button className="px-8 py-2" onClick={() => window.scrollTo(0, 0)}>Request a mini-scan<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </CardContent>
        </Card>
        <Card id="audit">
          <CardHeader>
            <ServiceIcon><FileSearch className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Visibility Audit — $750</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">One-time. You keep the report.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">Dozens of prompts across three models. Reviews, website, Google Business Profile, and the competitors who already show up in the answers. Ranked fixes — not a slide deck of advice.</p>
            <div className="flex justify-center">
              <Link href="/contact"><Button variant="outline" className="px-8 py-2" onClick={() => window.scrollTo(0, 0)}>Ask about an audit</Button></Link>
            </div>
          </CardContent>
        </Card>
        <Card id="retainer">
          <CardHeader>
            <ServiceIcon><RefreshCw className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Visibility retainer — $600/month</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">Same questions, every month.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">Re-test, track movement, keep the public record accurate. Cancel when the report stops changing what you do.</p>
          </CardContent>
        </Card>
        <Card id="reviews">
          <CardHeader>
            <ServiceIcon><Star className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Review management — $300/month</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">Offered because models quote reviews.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Monitor, reply, and keep fresh reviews coming. Not a standalone reputation agency — a signal the scan keeps measuring.</p>
          </CardContent>
        </Card>
        <Card id="websites">
          <CardHeader>
            <ServiceIcon><Globe className="h-12 w-12 stroke-[1.5] text-primary" /></ServiceIcon>
            <CardTitle className="text-2xl mb-2">Websites</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">If the page is thin, the model invents the rest.</CardDescription>
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
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">After someone finds you, someone still has to answer.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">Calls and messages, booked on your calendar, trained on your business and tested before a customer hears it.</p>
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
