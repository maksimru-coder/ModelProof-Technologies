import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "1",
    title: "Free mini-scan",
    text: "Five customer-style questions about your business, run through ChatGPT, Claude, and Gemini. You get the raw answers and a short read: named, missing, or described wrong.",
    note: "Free. Results in 24-48 hours. No call required.",
  },
  {
    step: "2",
    title: "AI Visibility Audit — $750",
    text: "The full diagnosis. Dozens of prompts, your reviews, website, Google Business Profile, and competitors. A written report with evidence and a ranked list of what to fix first.",
    note: "One-time. You keep the report.",
  },
  {
    step: "3",
    title: "Visibility retainer — $600/month",
    text: "Models update. Competitors get mentioned. Reviews shift. We re-test the same questions every month, send a plain-English report, and keep the public record accurate.",
    note: "Month to month. Stop when it stops being useful.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-muted-foreground text-center mb-16">Three steps. You can stop after any of them.</p>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-lg border bg-background p-6">
              <div className="text-sm font-medium text-primary mb-2">Step {item.step}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.text}</p>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted-foreground text-center max-w-3xl mx-auto">
          We will not promise that ChatGPT will name you. Nobody can. We sell a measured picture of what the models say today, and the work that gives you better odds tomorrow.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/contact">
            <Button onClick={() => window.scrollTo(0, 0)}>Request a free mini-scan</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
