import { EyeOff, FileWarning, BellOff } from "lucide-react";

const points = [
  {
    icon: EyeOff,
    title: "You might be invisible",
    text: "The AI recommends your competitors and never mentions you.",
  },
  {
    icon: FileWarning,
    title: "You might be misrepresented",
    text: "The AI describes you with outdated hours, wrong services, or reviews from three years ago.",
  },
  {
    icon: BellOff,
    title: "You'd never know",
    text: "There's no search console for AI answers. No notification when the recommendation changes. You just quietly lose business you never knew you were in the running for.",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4">The recommendation changed hands</h2>
        <p className="text-lg text-muted-foreground text-center mb-6">
          For twenty years, the question was "does Google show you?" Now the question is "does AI recommend you?"
        </p>
        <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Customers ask an assistant — "Who's the best dentist near me?" "Who should I call for HVAC in town?" "Which law firm handles this?" — and book from one confident paragraph.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="rounded-lg border bg-card p-6">
              <point.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-muted-foreground max-w-3xl mx-auto">
          We call this <span className="font-medium text-foreground">AI visibility</span> — whether the models your customers use know you, describe you accurately, and recommend you. Most local businesses have never checked theirs. That's what we do.
        </p>
      </div>
    </section>
  );
}
