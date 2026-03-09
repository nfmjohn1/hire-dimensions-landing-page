export default function FinalCTA() {
  return (
    <section
      id="book-consultation"
      className="section-padding bg-[var(--color-navy)]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Build a Team That Stays?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Stop losing techs to your competitors. Start finding employees who fit
          your culture.
        </p>

        <a
          href="https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block text-lg md:text-xl px-10 py-5 mb-8"
        >
          Book Your Free Consultation
        </a>

        {/* Risk Reversal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            No commitment
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            No pressure
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Just a conversation
          </div>
        </div>
      </div>
    </section>
  );
}
