export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Book a Free Consultation",
      description:
        "15 minutes. No commitment. Tell us about your hiring challenges and goals.",
    },
    {
      number: "2",
      title: "We Learn Your Culture",
      description:
        "We dig deep into what makes your company tick. Your values, your team dynamics, your ideal employee.",
    },
    {
      number: "3",
      title: "Get Qualified Candidates",
      description:
        "Start receiving candidates who are not just qualified, but who will actually fit in and stay.",
    },
  ];

  return (
    <section className="section-padding bg-[var(--color-gray-light)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] text-center mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Getting started is simple. Three steps to better hires.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-[var(--color-orange)]/30" />
              )}
              <div className="bg-white p-8 rounded-xl shadow-sm relative z-10">
                <div className="w-16 h-16 rounded-full bg-[var(--color-orange)] text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
