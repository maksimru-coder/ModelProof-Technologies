import { EyeOff, FileWarning, BellOff } from "lucide-react";

const points = [
  {
    icon: EyeOff,
    title: "You are not in the answer",
    text: "Someone asks who to call. The model names two competitors and skips you.",
  },
  {
    icon: FileWarning,
    title: "The answer is wrong",
    text: "It lists old hours, the wrong services, or a review from three years ago.",
  },
  {
    icon: BellOff,
    title: "Nobody tells you",
    text: "There is no alert when the recommendation changes. The appointment just goes somewhere else.",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4">Customers still need a name. They now ask an AI.</h2>
        <p className="text-lg text-muted-foreground text-center mb-6">
          Dentists, HVAC companies, law firms, med spas, clinics — in any U.S. market. Same pattern: a short question, one confident paragraph, a booking.
        </p>
        <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          "Best dentist near me." "Who should I call for AC?" "Which firm handles this?" If you are not in that paragraph — or you are described badly — you never hear about the lead.
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
          That is <span className="font-medium text-foreground">AI visibility</span>: whether ChatGPT, Claude, and Gemini know you, describe you accurately, and recommend you. Most businesses have never checked. That check is the first thing we do.
        </p>
      </div>
    </section>
  );
}
