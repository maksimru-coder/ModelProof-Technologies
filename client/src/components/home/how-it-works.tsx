import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "1",
    title: "Free mini-scan",
    text: "We run five real customer-style prompts about your business through ChatGPT, Claude, and Gemini, and record exactly what each model says. You get the raw answers plus our honest read: where you're mentioned, where you're missing, and what's wrong.",
    note: "Free. The scan is the pitch.",
  },
  {
    step: "2",
    title: "AI Visibility Audit \u2014 $750",
    text: "The full diagnosis. Dozens of prompts across the three models, covering your reviews, website, Google Business Profile, and competitors. A written report with every finding backed by evidence, ranked by what will move the needle, and a concrete fix list.",
    note: "One-time.",
  },
  {
    step: "3",
    title: "Visibility retainer \u2014 $600/month",
    text: "AI answers change constantly \u2014 models update, competitors get mentioned, your reviews shift. We re-test monthly, track whether you're gaining or losing ground, and keep fixing. You get a plain-English report every month.",
    note: "Cancel when it stops being useful.",
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
          An honest note: nobody can guarantee an AI will recommend you \u2014 not us, not anyone. What we sell is better odds: accurate information everywhere the models look, stronger review signals, and measurement so you know it's working instead of hoping.
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
