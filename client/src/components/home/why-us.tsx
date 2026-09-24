import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function WhyUs() {
  const points = [
    {
      title: "Evidence first",
      text: "If we cannot show the answer — screenshot or transcript — we do not claim it.",
    },
    {
      title: "Built for local service businesses",
      text: "Dentists, HVAC, legal, medical, med spa, and similar firms where one recommendation is a booked job.",
    },
    {
      title: "Testers, not a media agency",
      text: "Twenty years in software quality assurance. We run the same question twice and keep both answers.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4">Why ModelProof</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          East Bay based. Remote work anywhere in the U.S. The first deliverable is always the same: what the models actually say about you.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {points.map((point, index) => (
            <div key={point.title}>
              <div className="text-sm font-medium text-primary mb-2">{index + 1}</div>
              <h3 className="font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <p className="font-medium mb-6">See what ChatGPT, Claude, and Gemini say about your business.</p>
          <Link href="/contact">
            <Button size="lg" onClick={() => window.scrollTo(0, 0)}>Get the free mini-scan</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
