import { motion } from "framer-motion";
import { Search, Layers, ListChecks, RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Real customer prompts",
    description: "We write prompts the way a buyer would. Mini-scans use five prompts. Audits use dozens.",
  },
  {
    icon: Layers,
    title: "Three models, same question",
    description: "Each prompt is run through ChatGPT, Claude, and Gemini. We keep the raw answers. If the models disagree, that disagreement is part of the finding.",
  },
  {
    icon: ListChecks,
    title: "Evidence, then a fix list",
    description: "We mark whether you were named, how you were described, and what sources the answer appears to lean on. Fixes are ranked by what is most likely to change the next answer.",
  },
  {
    icon: RefreshCw,
    title: "Re-test after the work",
    description: "On retainer, we run the same prompt set again each month so you can see movement instead of hoping the models noticed.",
  },
];

export default function Methodology() {
  return (
    <div className="min-h-screen">
      <div className="relative bg-primary text-white py-24">
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How a scan actually works</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We do not optimize for AI in the abstract. We run the questions your customers are already asking, save what the models say, and tell you what is true.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container py-24">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {steps.map((step) => (
            <Card key={step.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="container pb-12 max-w-3xl text-center">
        <p className="text-muted-foreground mb-8">
          We do not fabricate mentions, buy fake reviews, or promise a specific ranking inside ChatGPT. The deliverable is evidence plus a prioritized list of things you can actually change.
        </p>
        <Link href="/contact">
          <Button size="lg" onClick={() => window.scrollTo(0, 0)}>
            Get your free mini-scan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
