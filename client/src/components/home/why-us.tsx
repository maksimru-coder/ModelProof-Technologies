export function WhyUs() {
  const points = [
    {
      title: "We measure, not guess",
      text: "Every claim we make about your AI visibility comes with a screenshot or a transcript. If we can't show it, we don't say it.",
    },
    {
      title: "We show our work",
      text: "You see the raw AI answers, not just our summary. The evidence is yours to keep.",
    },
    {
      title: "We don't sell guarantees",
      text: "Anyone who promises we'll make ChatGPT recommend you is selling something they can't deliver. We sell correct information, stronger signals than your competitors, and honest monthly measurement.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4">Why ModelProof</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          We're testers by trade. ModelProof started in software quality assurance — twenty years of breaking software for a living and proving what's actually true versus what someone claims. We brought that discipline to AI.
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
        <p className="mt-12 text-center font-medium">
          ModelProof Technologies — we make your business visible and chosen in the AI era.
        </p>
      </div>
    </section>
  );
}
