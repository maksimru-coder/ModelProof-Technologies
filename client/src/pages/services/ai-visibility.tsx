import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FileSearch,
  RefreshCw,
  ShieldCheck,
  MessageSquareQuote,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Free Mini-Scan",
    price: "Free",
    description: "The door opener. We run five real customer-style prompts about your business through ChatGPT, Claude, and Gemini, and record exactly what each model says.",
    points: [
      "5 real prompts across 3 AI models",
      "Raw answers as screenshots",
      "Our honest read: where you're mentioned, where you're missing",
      "No pitch attached — the scan is the pitch"
    ]
  },
  {
    name: "AI Visibility Audit",
    price: "$750 one-time",
    description: "The full diagnosis. Dozens of prompts covering your reviews, website, Google Business Profile, and competitors.",
    points: [
      "Dozens of prompts across ChatGPT, Claude, and Gemini",
      "Every finding backed by screenshot evidence",
      "Competitor comparison: who gets recommended and why",
      "Prioritized fix list ranked by impact"
    ]
  },
  {
    name: "Visibility Retainer",
    price: "$600/month",
    description: "AI answers change constantly. We re-test monthly, track whether you're gaining or losing ground, and keep fixing.",
    points: [
      "Monthly re-testing across all three models",
      "Competitor movement tracking",
      "Ongoing corrective work",
      "Plain-English report every month"
    ]
  }
];

export default function AIVisibility() {
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
        <h1 className="text-4xl font-bold mb-6">AI Visibility Services</h1>
        <p className="text-xl text-muted-foreground mb-6">
          What does AI say about your business? We test it.
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Your customers have changed how they decide. Instead of reading ten review pages, they ask an AI assistant: "Who's the best dentist near me?" The AI answers in one confident paragraph — and they book from it.
          </p>
          <p className="text-muted-foreground text-lg mb-12">
            That creates a problem you can't see: you might be invisible, with the AI recommending competitors and never mentioning you. Or misrepresented, described with outdated hours and old reviews. There's no search console for AI answers — you just quietly lose business you never knew you were in the running for. We measure it, show you the evidence, and fix it.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {tiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    {tier.name}
                  </CardTitle>
                  <p className="text-2xl font-bold text-primary">{tier.price}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start space-x-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquareQuote className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">1. We ask like a customer</h4>
                <p className="text-sm text-muted-foreground">
                  Real discovery prompts — "best dentist in your city", emergency scenarios, service questions — run against all three models.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">2. You see the evidence</h4>
                <p className="text-sm text-muted-foreground">
                  Screenshots and transcripts of every answer. If we can't show it, we don't say it.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">3. We fix and re-measure</h4>
                <p className="text-sm text-muted-foreground">
                  Correct information everywhere the models look, stronger signals than competitors, monthly measurement.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h4 className="font-semibold mb-3">
              <ShieldCheck className="inline h-5 w-5 mr-2" />
              An honest note
            </h4>
            <p className="text-muted-foreground">
              Nobody can guarantee an AI will recommend you — not us, not anyone. What we sell is better odds: accurate information everywhere the models look, stronger review signals, and measurement so you know it's working instead of hoping.
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <h4 className="font-semibold mb-3">
              <RefreshCw className="inline h-5 w-5 mr-2" />
              Why ModelProof
            </h4>
            <p className="text-muted-foreground">
              We're testers by trade — twenty years of software quality assurance, breaking software for a living and proving what's actually true versus what someone claims. We brought that discipline to AI: we measure, not guess.
            </p>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">Start with the free mini-scan</h3>
            <p className="text-muted-foreground mb-6">
              Five minutes of your time — we do the rest. Screenshots within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:maksim@modelproof.ai?subject=Free%20AI%20visibility%20mini-scan">
                <Button size="lg" className="px-8">
                  Get Your Free Mini-Scan
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
