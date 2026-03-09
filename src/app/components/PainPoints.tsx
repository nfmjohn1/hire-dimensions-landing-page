export default function PainPoints() {
  const painPoints = [
    {
      stat: "$30K+",
      description: "Cost every time a tech quits",
      subtext: "Recruiting, training, lost revenue",
    },
    {
      stat: "6 Months",
      description: "To full productivity",
      subtext: "New hires take time to ramp up",
    },
    {
      stat: "Your Best People",
      description: "Are being recruited right now",
      subtext: "Competitors are always looking",
    },
  ];

  return (
    <section className="section-padding bg-[var(--color-navy)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          The Real Cost of Bad Hires
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Every wrong hire costs you more than money. It costs you time,
          customers, and your best employees.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-orange)] mb-3">
                {point.stat}
              </div>
              <div className="text-xl text-white font-semibold mb-2">
                {point.description}
              </div>
              <div className="text-gray-400 text-sm">{point.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
