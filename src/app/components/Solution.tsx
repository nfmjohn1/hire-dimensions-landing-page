export default function Solution() {
  const differentiators = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Culture Fit, Not Just Job Fit",
      description:
        "Our assessments predict who will thrive in your shop. Not just who can do the job, but who will love doing it with your team.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "30+ Years in HVAC",
      description:
        "We speak your language. Service calls, install crews, dispatcher challenges. Not generic HR fluff that doesn't apply to your business.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Premium Support",
      description:
        "1-hour response time. A dedicated specialist who knows your company. Real humans, not chatbots or ticket queues.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] text-center mb-4">
          Why HVAC Companies Choose Us
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We are not another generic recruiting platform. We built Hire
          Dimensions specifically for the HVAC industry.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-gray-200 hover:border-[var(--color-orange)] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[var(--color-orange)] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
